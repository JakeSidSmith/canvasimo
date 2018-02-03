// tslint:disable:no-console

import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { Docs, Method, Parameter } from '../docs/src/ts/types';

const CWD = process.cwd();
const TYPE_MAP: {[i: string]: string | undefined} = {
  [ts.SyntaxKind.NumberKeyword]: 'number',
  [ts.SyntaxKind.StringKeyword]: 'string',
  [ts.SyntaxKind.NullKeyword]: 'null',
  [ts.SyntaxKind.BooleanKeyword]: 'boolean',
  [ts.SyntaxKind.AnyKeyword]: 'any',
  [ts.SyntaxKind.NeverKeyword]: 'never',
  [ts.SyntaxKind.VoidKeyword]: 'void',
  [ts.SyntaxKind.UndefinedKeyword]: 'undefined',
  [ts.SyntaxKind.OpenBracketToken]: '[',
  [ts.SyntaxKind.CloseBracketToken]: ']',
  [ts.SyntaxKind.BarToken]: '|',
  [ts.SyntaxKind.OpenBraceToken]: '{',
  [ts.SyntaxKind.CloseBraceToken]: '}',
  [ts.SyntaxKind.ColonToken]: ': ',
  [ts.SyntaxKind.QuestionToken]: '?',
  [ts.SyntaxKind.DotDotDotToken]: '...',
};

const getName = (node: ts.Node): string => {
  switch (node.kind) {
    case ts.SyntaxKind.Parameter:
    case ts.SyntaxKind.ArrayType:
    case ts.SyntaxKind.TypeLiteral:
    case ts.SyntaxKind.IndexSignature:
      return node.getChildren().map(getName).join('');
    case ts.SyntaxKind.UnionType:
    case ts.SyntaxKind.SyntaxList:
      return node.getChildren().map(getName).join(' ');
    case ts.SyntaxKind.Identifier:
      return (node as ts.Identifier).text;
    case ts.SyntaxKind.TypeReference:
      return getName((node as ts.TypeReferenceNode).typeName);
    case ts.SyntaxKind.TypeQuery:
      return getName((node as ts.TypeQueryNode).exprName);
    case ts.SyntaxKind.FunctionType:
      return 'FUNCTION';
    default:
      if ('name' in node && typeof (node as any).name === 'object') {
        const text = (node as any).name.text;

        if (!text) {
          throw new Error('Could not get text from node name');
        }

        return text;
      }

      const typeName = TYPE_MAP[node.kind];

      if (typeName) {
        return typeName;
      }

      console.log(node);
      throw new Error(`Unhandled node type ${ts.SyntaxKind[node.kind]}`);
  }
};

const isDefaultExport = (node: ts.Node): boolean => {
  const [syntaxList] = node.getChildren();

  if (syntaxList && syntaxList.kind === ts.SyntaxKind.SyntaxList) {
    const [firstChild, secondChild] = syntaxList.getChildren();

    if (
      firstChild && firstChild.kind === ts.SyntaxKind.ExportKeyword &&
      secondChild && secondChild.kind === ts.SyntaxKind.DefaultKeyword
    ) {
      return true;
    }
  }

  return false;
};

const isPublic = (node: ts.Node): boolean => {
  const [syntax] = node.getChildren();

  if (!syntax || syntax.kind !== ts.SyntaxKind.SyntaxList) {
    return false;
  }

  const [firstChild] = syntax.getChildren();

  return Boolean(firstChild && firstChild.kind === ts.SyntaxKind.PublicKeyword);
};

const getReturnType = (name: string, node: ts.ArrowFunction): string => {
  const { type } = node;

  if (!type) {
    throw new Error(`Property ${name} does not have an explicit return type`);
  }

  return getName(type);
};

const getParameters = (name: string, node: ts.ArrowFunction): Parameter[] => {
  return node.parameters.map((parameter) => {
    const { type } = parameter;
    const paramName = getName(parameter).split(':')[0];

    if (!type) {
      throw new Error(`Parameter ${paramName} of ${name} does not have a type`);
    }

    const paramType = getName(type);

    return {
      name: paramName,
      type: paramType,
    };
  });
};

const documentArrowFunction = (name: string, node: ts.ArrowFunction): Method => {
  return {
    name,
    description: '',
    returns: getReturnType(name, node),
    parameters: getParameters(name, node),
  };
};

const getDocJson = (verbose?: boolean): Docs => {
  const sourceFile = fs.readFileSync(path.join(CWD, 'src/index.ts'), 'utf8');
  const source = ts.createSourceFile('index.ts', sourceFile, ts.ScriptTarget.ES2015, true);

  // let defaultExport: ts.Node;
  const docs = [{name: 'Test', description: 'Description', methods: []}] as Docs;
  let indentation = '';

  const documentProperty = (property: ts.Node) => {
    if (property.kind === ts.SyntaxKind.PropertyDeclaration && isPublic(property)) {
      const initializer = (property as ts.PropertyDeclaration).initializer;
      const name = getName(property);

      if (initializer && initializer.kind === ts.SyntaxKind.ArrowFunction) {
        docs[0].methods.push(documentArrowFunction(name, initializer as ts.ArrowFunction));
      } else {
        throw new Error(`Property ${name} is public, but not an arrow function`);
      }
    }
  };

  const traverse = (node: ts.Node) => {
    if (verbose) {
      const name = ': ' + getName(node);
      const parent = node.parent ? ' < ' + getName(node.parent) : '';

      console.log(`${indentation}${ts.SyntaxKind[node.kind]}${name}${parent}`);
    }

    if (node.kind === ts.SyntaxKind.ClassDeclaration && isDefaultExport(node)) {
      ts.forEachChild(node, documentProperty);
    } else {
      ts.forEachChild(node, (subNode) => {
        indentation += '  ';
        traverse(subNode);
        indentation = indentation.substring(2);
      });
    }
  };

  traverse(source);

  return docs;
};

export default getDocJson;
