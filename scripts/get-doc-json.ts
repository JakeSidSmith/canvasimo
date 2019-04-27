// tslint:disable:no-console

import * as glob from 'glob';
import * as path from 'path';
import * as ts from 'typescript';
import { Docs, Method, Methods, Parameter, ResolvedType, Tags, TypeAlias } from '../docs/src/ts/types';

const CLASS_NAME = 'Canvasimo';

// tslint:disable-next-line:no-bitwise
const isExported = (flags: ts.ModifierFlags) => (flags & ts.ModifierFlags.Export) !== 0;

// tslint:disable-next-line:no-bitwise
const isPublic = (flags: ts.ModifierFlags) => (flags & ts.ModifierFlags.Public) !== 0;

const isUnion = (type: ts.TypeNode): type is ts.UnionTypeNode => type.kind === ts.SyntaxKind.UnionType;

const serializeTags = (tags: ts.JSDocTagInfo[]): Tags => {
  const ret: Tags = {};

  for (const tag of tags) {
    ret[tag.name] = tag.text;
  }

  return ret;
};

const resolveTypeNode = (typeNode: ts.TypeNode, checker: ts.TypeChecker): ResolvedType => {
  if (isUnion(typeNode)) {
    return typeNode.types.reduce<ResolvedType>(
      (memo, unionType) => {
        const resolvedUnionType = resolveTypeNode(unionType, checker);

        return {
          typeAliases: [...memo.typeAliases, ...resolvedUnionType.typeAliases],
          type: `${memo.type}${memo.type ? ' | ' : ''}${resolvedUnionType.type}`,
        };
      },
      {typeAliases: [], type: ''}
    );
  }

  const type = checker.getTypeAtLocation(typeNode);

  if (type.aliasSymbol) {
    const aliasTypeNode = (
      (type.aliasSymbol.valueDeclaration || type.aliasSymbol.declarations[0]) as ts.TypeAliasDeclaration
    ).type;
    const typeName = checker.typeToString(checker.getTypeAtLocation(aliasTypeNode));

    return {
      typeAliases: [
        {
          name: typeName,
          alias: aliasTypeNode.getText(),
        },
      ],
      type: typeName,
    };
  }

  return {
    typeAliases: [],
    type: checker.typeToString(type),
  };
};

const serializeProperty = (node: ts.PropertyDeclaration, checker: ts.TypeChecker): Method | null => {
  const symbol = checker.getSymbolAtLocation(node.name);

  if (!symbol) {
    return null;
  }

  let typeAliases: ReadonlyArray<TypeAlias> = [];

  const name = symbol.getName();
  const description = ts.displayPartsToString(symbol.getDocumentationComment(checker));
  const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration as ts.Declaration);
  const tags = serializeTags(symbol.getJsDocTags());

  const signatures = checker.getSignaturesOfType(type, ts.SignatureKind.Call)
    .map((signature) => {
      const parameters = signature.parameters.map<Parameter>((param) => {
        const parameterName = param.getName();
        const declaration = param.valueDeclaration as ts.ParameterDeclaration;
        const typeNode = declaration.type;
        const optional = checker.isOptionalParameter(declaration);

        const parameterType = resolveTypeNode(typeNode as ts.TypeNode, checker);

        typeAliases = [...typeAliases, ...parameterType.typeAliases];

        return {
          name: parameterName,
          type: parameterType.type,
          optional,
        };
      });

      const returnType = resolveTypeNode(signature.declaration!.type as ts.TypeNode, checker);

      typeAliases = [...typeAliases, ...returnType.typeAliases];

      return {
        parameters,
        returns: returnType.type,
      };
    });

  const typeAliasesNames = typeAliases.map((typeAlias) => typeAlias.name);

  return {
    name,
    description,
    tags,
    signatures,
    typeAliases: typeAliases.filter((typeAlias, index) => {
      return typeAliasesNames.indexOf(typeAlias.name) === index;
    }),
  };
};

const getMethods = (sourceFiles: ts.SourceFile[], checker: ts.TypeChecker): Methods => {
  let methods: Methods = [];

  const documentProperty = (node: ts.Node) => {
    const flags = ts.getCombinedModifierFlags(node as ts.Declaration);

    if (
      node.kind === ts.SyntaxKind.PropertyDeclaration &&
      isPublic(flags)
    ) {
      const initializer = (node as ts.PropertyDeclaration).initializer;
      const name = (node as ts.PropertyDeclaration).name.getText();

      if (initializer && initializer.kind === ts.SyntaxKind.ArrowFunction) {
        const method = serializeProperty(node as ts.PropertyDeclaration, checker);

        if (method) {
          methods = [...methods, method];
        }
      } else {
        console.error(`Property ${name} is public, but not an arrow function`);
      }
    }
  };

  const traverse = (node: ts.Node) => {
    const flags = ts.getCombinedModifierFlags(node as ts.Declaration);

    if (
      node.kind === ts.SyntaxKind.ClassDeclaration &&
      (node as ts.ClassDeclaration).name && (node as ts.ClassDeclaration).name!.text === CLASS_NAME &&
      isExported(flags)
    ) {
      ts.forEachChild(node, documentProperty);
    } else {
      ts.forEachChild(node, (subNode) => {
        traverse(subNode);
      });
    }
  };

  sourceFiles.forEach(traverse);

  return methods;
};

const groupMethods = (methods: Methods): Docs => {
  let docs: Docs = [];
  const foundGroups: string[] = [];
  const foundAliases: string[] = [];

  for (const method of methods) {
    const { description, name, tags, signatures, typeAliases } = method;
    const aliasIndex = foundAliases.indexOf(name);

    if (aliasIndex >= 0) {
      if (aliasIndex !== foundAliases.length - 1) {
        console.error(`Method ${name} should be defined immediately after its alias`);
      }
      continue;
    } else if (!description) {
      console.error(`No description for method ${name}`);
    }

    const { alias, group, description: groupDescription } = tags;

    if (alias) {
      if (foundAliases.indexOf(alias) >= 0) {
        console.error(`Duplicate alias ${alias} on method ${name}`);
      } else {
        foundAliases.push(alias);
      }
    }

    let groupIndex = group ? foundGroups.indexOf(group) : foundGroups.length - 1;

    if (group && groupIndex < 0) {
      if (!groupDescription) {
        console.error(`No description for group ${group}`);
      } else {
        groupIndex = foundGroups.length;
        foundGroups.push(group);
        docs = [
          ...docs,
          {
            name: group,
            description: groupDescription,
            methods: [],
          },
        ];
      }
    }

    if (groupIndex >= 0 && groupIndex < foundGroups.length) {
      docs[groupIndex].methods = [
        ...docs[groupIndex].methods,
        {
          name,
          description,
          alias: alias || null,
          signatures,
          typeAliases,
        },
      ];
    }
  }

  return docs;
};

const getDocJson = (): Docs => {
  const sourceFileNames = glob.sync('src/**/*.{js,jsx,ts,tsx}');
  const json = ts.readConfigFile(path.join(process.cwd(), 'tsconfig.json'), ts.sys.readFile);
  const compilerOptions = ts.parseJsonConfigFileContent(json.config, ts.sys, process.cwd()).options;
  const program = ts.createProgram(sourceFileNames, compilerOptions);
  const sourceFiles = program.getSourceFiles();
  const checker = program.getTypeChecker();
  const methods = getMethods([...sourceFiles], checker);

  if (!methods.length) {
    throw new Error(`Could not find an exported class called ${CLASS_NAME} with any methods`);
  }

  return groupMethods(methods);
};

export default getDocJson;
