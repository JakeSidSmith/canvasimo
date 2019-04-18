// tslint:disable:no-console

import * as glob from 'glob';
import * as path from 'path';
import * as ts from 'typescript';
import { Docs, GroupedMethod, Method, Methods, Parameter, Tags, TypeAlias } from '../docs/src/ts/types';

const CLASS_NAME = 'Canvasimo';

// tslint:disable-next-line:no-bitwise
const isExported = (flags: ts.ModifierFlags) => (flags & ts.ModifierFlags.Export) !== 0;

// tslint:disable-next-line:no-bitwise
const isPublic = (flags: ts.ModifierFlags) => (flags & ts.ModifierFlags.Public) !== 0;

const serializeTags = (tags: ts.JSDocTagInfo[]): Tags => {
  const ret: Tags = {};

  for (const tag of tags) {
    ret[tag.name] = tag.text;
  }

  return ret;
};

const getTypeAlias = (type: ts.Type): string | null => {
  if (type.aliasSymbol) {
    const typeAlias = type.aliasSymbol.getDeclarations();

    if (typeAlias) {
      return (typeAlias[0] as ts.TypeAliasDeclaration).type.getText();
    }
  }

  return null;
};

const serializeParameter = (symbol: ts.Symbol, checker: ts.TypeChecker): Parameter => {
  const name = symbol.getName();
  const declaration = symbol.valueDeclaration as ts.ParameterDeclaration;
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const typeName = checker.typeToString(type);
  const alias = getTypeAlias(type);
  const optional = checker.isOptionalParameter(symbol.valueDeclaration as ts.ParameterDeclaration);

  return {
    name: `${declaration.dotDotDotToken ? '...' : ''}${name}`,
    alias,
    type: typeName,
    optional,
  };
};

const serializeNode = (node: ts.PropertyDeclaration, checker: ts.TypeChecker): Method | null => {
  const symbol = checker.getSymbolAtLocation(node.name);

  if (!symbol) {
    return null;
  }

  const name = symbol.getName();
  const description = ts.displayPartsToString(symbol.getDocumentationComment(checker));
  const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration as ts.Declaration);
  const signatures = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
  const tags = serializeTags(symbol.getJsDocTags());

  return {
    name,
    description,
    tags,
    signatures: signatures.map((signature) => {
      const returnType = checker.getReturnTypeOfSignature(signature);
      const returnTypeName = checker.typeToString(returnType);
      const returnAlias = getTypeAlias(returnType);

      return {
        parameters: signature.parameters.map((parameter) => serializeParameter(parameter, checker)),
        returns: {
          type: returnTypeName,
          alias: returnAlias,
        },
      };
    }),
  };
};

const getMethods = (sourceFiles: ts.SourceFile[], checker: ts.TypeChecker): Methods => {
  const methods: Methods = [];

  const documentProperty = (node: ts.Node) => {
    const flags = ts.getCombinedModifierFlags(node as ts.Declaration);

    if (
      node.kind === ts.SyntaxKind.PropertyDeclaration &&
      isPublic(flags)
    ) {
      const initializer = (node as ts.PropertyDeclaration).initializer;
      const name = (node as ts.PropertyDeclaration).name.getText();

      if (initializer && initializer.kind === ts.SyntaxKind.ArrowFunction) {
        const method = serializeNode(node as ts.PropertyDeclaration, checker);

        if (method) {
          methods.push(method);
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

const getMethodWithTypeAliases = ({name, description, tags: { alias }, signatures}: Method): GroupedMethod => {
  const foundTypeAliases: string[] = [];
  const typeAliases: TypeAlias[] = [];

  signatures.forEach((signature) => {
    signature.parameters.forEach((parameter) => {
      if (parameter.alias && foundTypeAliases.indexOf(parameter.type) < 0) {
        foundTypeAliases.push(parameter.type);
        typeAliases.push({
          name: parameter.type,
          alias: parameter.alias,
        });
      }
    });

    if (signature.returns.alias && foundTypeAliases.indexOf(signature.returns.type) < 0) {
      foundTypeAliases.push(signature.returns.type);
      typeAliases.push({
        name: signature.returns.type,
        alias: signature.returns.alias,
      });
    }
  });

  return {
    name,
    description,
    alias,
    signatures,
    typeAliases,
  };
};

const groupMethods = (methods: Methods): Docs => {
  const foundGroups: string[] = [];
  const foundAliases: string[] = [];
  const docs: Docs = [];

  for (const method of methods) {
    const { description, name, tags } = method;
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
        docs.push({
          name: group,
          description: groupDescription,
          methods: [],
        });
      }
    }

    if (groupIndex >= 0 && groupIndex < foundGroups.length) {
      docs[groupIndex].methods.push(getMethodWithTypeAliases(method));
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
