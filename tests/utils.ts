import { any, each } from './helpers/utils';

describe('utils', () => {

  describe('each', () => {

    it('should loop over an array', () => {
      var expectedIndex = 0;
      var arr = ['a', 'b', 'c'];

      each(arr, function (value, index) {
        expect(value).to.equal(arr[index]);
        expect(index).to.equal(expectedIndex);

        expectedIndex += 1;
      });

      expect(expectedIndex).to.equal(3);
    });

    it('should loop over an object', () => {
      var expectedIndex = 0;
      var expectedKeys = ['a', 'b', 'c'];
      var obj = {
        a: 'aa',
        b: 'bb',
        c: 'cc'
      };

      each(obj, function (value, key) {
        expect(value).to.equal(obj[key]);
        expect(key).to.equal(expectedKeys[expectedIndex]);

        expectedIndex += 1;
      });

      expect(expectedIndex).to.equal(3);
    });

  });

  describe('any', () => {

    it('should return true if predicate is truthy', () => {
      var items = ['a', 'b', 'c'];

      var anyAreA = any(items, function (value) {
        return value === 'a';
      });

      expect(anyAreA).to.be.true;

      items = {
        a: 'aa',
        b: 'bb',
        c: 'cc'
      };

      var anyAreBB = any(items, function (value) {
        return value === 'bb';
      });

      expect(anyAreBB).to.be.true;
    });

    it('should return false if predicate is falsey', () => {
      var items = ['a', 'b', 'c'];

      var anyAreOne = any(items, function (value) {
        return value === 'one';
      });

      expect(anyAreOne).to.be.false;

      items = {
        a: 'aa',
        b: 'bb',
        c: 'cc'
      };

      var anyAreTwo = any(items, function (value) {
        return value === 'two';
      });

      expect(anyAreTwo).to.be.false;
    });

  });

});
