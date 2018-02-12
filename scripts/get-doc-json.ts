// tslint:disable:no-console

import * as glob from 'glob';
import * as path from 'path';
import * as ts from 'typescript';
import { Docs, GroupedMethod, Method, Methods, Parameter, Tags, TypeAlias } from '../docs/src/ts/types';

const CWD = process.cwd();
// tslint:disable-next-line:no-var-requires
const COMPILER_OPTIONS = require(path.join(CWD, 'tsconfig.json'));

const serializeTags = (tags: ts.JSDocTagInfo[]): Tags => {
  const ret: Tags = {};

  for (const tag of tags) {
    ret[tag.name] = tag.text;
  }

  return ret;
};

const getTypeAlias = (type: ts.Type, checker: ts.TypeChecker): string | null => {
  if (type.aliasSymbol) {
    return (type.aliasSymbol.getDeclarations()[0] as ts.TypeAliasDeclaration).type.getText();
  }

  return null;
};

const serializeParameter = (symbol: ts.Symbol, checker: ts.TypeChecker): Parameter => {
  const name = symbol.getName();
  const declaration = symbol.valueDeclaration as ts.ParameterDeclaration;
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const typeName = checker.typeToString(type);
  const alias = getTypeAlias(type, checker);

  return {
    name: `${declaration.dotDotDotToken ? '...' : ''}${name}`,
    alias,
    type: typeName,
    optional: checker.isOptionalParameter(symbol.valueDeclaration as ts.ParameterDeclaration),
  };
};

const serializeNode = (node: ts.PropertyDeclaration, checker: ts.TypeChecker): Method => {
  const symbol = checker.getSymbolAtLocation(node.name);
  const name = symbol.getName();
  const description = ts.displayPartsToString(symbol.getDocumentationComment());
  const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration as ts.Declaration);
  const signatures = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
  const tags = serializeTags(symbol.getJsDocTags());

  return {
    name,
    description,
    tags,
    signatures: signatures.map((signature) => {
      const returnType = checker.getReturnTypeOfSignature(signature);
      const returnAlias = getTypeAlias(returnType, checker);

      return {
        parameters: signature.parameters.map((parameter) => serializeParameter(parameter, checker)),
        returns: {
          type: checker.typeToString(returnType),
          alias: returnAlias,
        },
      };
    }),
  };
};

const getMethods = (sourceFiles: ts.SourceFile[], checker: ts.TypeChecker): Methods => {
  const methods: Methods = [];

  const documentProperty = (node: ts.Node) => {
    const flags = ts.getCombinedModifierFlags(node);

    if (
      node.kind === ts.SyntaxKind.PropertyDeclaration &&
      // tslint:disable-next-line:no-bitwise
      (flags & ts.ModifierFlags.Public) !== 0
    ) {
      const initializer = (node as ts.PropertyDeclaration).initializer;
      const name = (node as ts.PropertyDeclaration).name.getText();

      if (initializer && initializer.kind === ts.SyntaxKind.ArrowFunction) {
        const method = serializeNode(node as ts.PropertyDeclaration, checker);

        methods.push(method);
      } else {
        console.error(`Property ${name} is public, but not an arrow function`);
      }
    }
  };

  const traverse = (node: ts.Node) => {
    const flags = ts.getCombinedModifierFlags(node);
    if (
      node.kind === ts.SyntaxKind.ClassDeclaration &&
      // tslint:disable-next-line:no-bitwise
      (flags & ts.ModifierFlags.Export) !== 0 && (flags & ts.ModifierFlags.Default) !== 0
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
  const program = ts.createProgram(sourceFileNames, COMPILER_OPTIONS);
  const sourceFiles = program.getSourceFiles();
  const checker = program.getTypeChecker();

  return groupMethods(getMethods(sourceFiles, checker));
};

export default getDocJson;
