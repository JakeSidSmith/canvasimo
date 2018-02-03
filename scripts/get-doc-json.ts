// tslint:disable:no-console

import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { Docs, Method } from '../docs/src/ts/types';

const CWD = process.cwd();
const SOURCE_FILE = fs.readFileSync(path.join(CWD, 'src/index.ts'), 'utf8');
const SOURCE = ts.createSourceFile('index.ts', SOURCE_FILE, ts.ScriptTarget.ES2015, true);

const getName = (node: ts.Node) => node.kind === ts.SyntaxKind.Identifier ?
  (node as ts.Identifier).text :
  ('name' in node && typeof (node as any).name === 'object' ? (node as any).name.text : '');

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

const isTypeReference = (node: ts.Node): node is ts.TypeReferenceNode => 'typeName' in node;

const getTypeName = (node: ts.TypeNode | ts.TypeReferenceNode): string => {
  if (isTypeReference(node)) {
    return getName(node.typeName);
  }

  return ts.SyntaxKind[node.kind];
};

const getReturnType = (name: string, node: ts.ArrowFunction): string => {
  const { type } = node;

  if (!type) {
    throw new Error(`Property ${name} does not have an explicit return type`);
  }

  return getTypeName(type);
};

const documentArrowFunction = (name: string, node: ts.ArrowFunction): Method => {
  return {
    name,
    description: '',
    returns: getReturnType(name, node),
    parameters: [],
  };
};

const getDocJson = (verbose?: boolean): Docs => {
  // let defaultExport: ts.Node;
  const docs = [{name: 'Test', description: 'Description', methods: []}] as Docs;
  let indentation = '';

  const documentProperty = (property: ts.Node) => {
    if (property.kind === ts.SyntaxKind.PropertyDeclaration && isPublic(property)) {
      // console.log(
      //   getName(property),
      //   isPublic(property), property.getChildren().map((child) => ts.SyntaxKind[child.kind])
      // );

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
      console.log('DEFAULT EXPORT: ' + getName(node));

      ts.forEachChild(node, documentProperty);
    } else {
      ts.forEachChild(node, (subNode) => {
        indentation += '  ';
        traverse(subNode);
        indentation = indentation.substring(2);
      });
    }
  };

  traverse(SOURCE);

  console.log(docs[0].methods);

  return docs;
};

getDocJson(false);

export default getDocJson;
