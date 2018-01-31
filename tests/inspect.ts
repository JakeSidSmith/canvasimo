import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

const cwd = process.cwd();

const sourceFile = fs.readFileSync(path.join(cwd, 'src/index.ts'), 'utf8');

const source = ts.createSourceFile('index.ts', sourceFile, ts.ScriptTarget.ES2015);

describe('inspect', () => {

  describe('methods', () => {

    it('should be bound to the class', () => {
      let CanvasimoClass: any;
      const properties: ts.PropertyDeclaration[] = [];
      const methods: ts.MethodDeclaration[] = [];

      const traverse = (node: ts.Node) => {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
          const name = (node as ts.ClassDeclaration).name;

          if (name && name.text === 'Canvasimo') {
            CanvasimoClass = node;

            ts.forEachChild(node, (child) => {
              if (child.kind === ts.SyntaxKind.PropertyDeclaration) {
                properties.push(child as ts.PropertyDeclaration);
              } else if (child.kind === ts.SyntaxKind.MethodDeclaration) {
                methods.push(child as ts.MethodDeclaration);
              }
            });
          }
        }

        ts.forEachChild(node, traverse);
      };

      traverse(source);

      expect(CanvasimoClass).toBeTruthy();

      expect(methods.length).toBe(0);
      expect(properties.length).toBe(182);

      properties.forEach((property, index) => {
        if (property.initializer) {
          const identifier = property.name as ts.Identifier;
          const name = identifier && identifier.text;

          if (property.initializer.kind === ts.SyntaxKind.Identifier) {
            if (name === 'ctxType') {
              expect((property.initializer as any).text).toBe('CONTEXT_TYPE');
            } else {
              throw new Error(`Un-tested property ${name} at index ${index}`);
            }
          } else if (property.initializer.kind === ts.SyntaxKind.NumericLiteral) {
            if (name === 'density') {
              expect((property.initializer as any).text).toBe('1');
            } else {
              throw new Error(`Un-tested property ${name} at index ${index}`);
            }
          } else if (property.initializer.kind !== ts.SyntaxKind.ArrowFunction) {
            throw new Error(
              `Expected property ${name} at index ${index} to be initalized with an arrow function`
            );
          }
        }
      });
    });

  });

});
