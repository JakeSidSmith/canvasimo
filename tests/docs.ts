import * as fs from 'fs';
import * as path from 'path';

describe('docs', () => {
  describe('docs.json', () => {
    it('should match snapshot', () => {
      const generatedDocs = fs.readFileSync(path.resolve(__dirname, '../docs/build/json/docs.json'), 'utf8');

      expect(generatedDocs).toMatchSnapshot();
    });
  });

  describe('index.html', () => {
    it('should match snapshot', () => {
      const generatedDocs = fs.readFileSync(path.resolve(__dirname, '../docs/index.html'), 'utf8');

      expect(generatedDocs).toMatchSnapshot();
    });
  });
});
