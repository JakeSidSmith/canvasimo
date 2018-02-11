import { forPoints } from '../src/utils';
import { each, some } from './helpers/utils';

describe('utils', () => {

  describe('forPoints', () => {

    it('should accept but do nothing with empty and near empty point arrays', () => {
      const spy = jest.fn();

      forPoints([], spy);
      forPoints([0, 1], spy);
      forPoints([[0, 1]], spy);
      forPoints([{x: 0, y: 0}], spy);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should throw an error if provided incorrect points arrays', () => {
      const anError = /must be an array of/;
      const tupleError = /point with format \[x, y\]/;
      const pointError = /point with format {x, y}/;
      const numberError = /points to be an array of numbers/;
      const spy = jest.fn();

      expect(() => forPoints({} as any, spy)).toThrow(anError);
      expect(() => forPoints([[0, 0], [0]] as any, spy)).toThrow(tupleError);
      expect(() => forPoints([{x: 0, y: 0}, {x: 0}] as any, spy)).toThrow(pointError);
      expect(() => forPoints([{x: 0, y: 0}, {y: 0}] as any, spy)).toThrow(pointError);
      expect(() => forPoints([{x: 0, y: 0}, {}] as any, spy)).toThrow(pointError);
      expect(() => forPoints([0, 1, 2, 3, 4], spy)).toThrow(anError);
      expect(() => forPoints([0, 1, 2, 'wat'] as any, spy)).toThrow(numberError);
      expect(() => forPoints([{}, {}] as any, spy)).toThrow(anError);
    });

  });

  describe('each', () => {

    it('should loop over an array', () => {
      let expectedIndex = 0;
      const arr = ['a', 'b', 'c'];

      each(arr, (value, index: number) => {
        expect(value).toEqual(arr[index]);
        expect(index).toEqual(expectedIndex);

        expectedIndex += 1;
      });

      expect(expectedIndex).toEqual(3);
    });

    it('should loop over an object', () => {
      let expectedIndex = 0;
      const expectedKeys = ['a', 'b', 'c'];
      const obj: {[i: string]: string} = {
        a: 'aa',
        b: 'bb',
        c: 'cc',
      };

      each(obj, (value, key) => {
        expect(value).toEqual(obj[key]);
        expect(key).toEqual(expectedKeys[expectedIndex]);

        expectedIndex += 1;
      });

      expect(expectedIndex).toEqual(3);
    });

  });

  describe('some', () => {

    it('should return true if predicate is truthy', () => {
      const itemsArray = ['a', 'b', 'c'];

      const anyAreA = some(itemsArray, (value) => {
        return value === 'a';
      });

      expect(anyAreA).toBe(true);

      const itemsObject = {
        a: 'aa',
        b: 'bb',
        c: 'cc',
      };

      const anyAreBB = some(itemsObject, (value) => {
        return value === 'bb';
      });

      expect(anyAreBB).toBe(true);
    });

    it('should return false if predicate is falsey', () => {
      const itemsArray = ['a', 'b', 'c'];

      const anyAreOne = some(itemsArray, (value) => {
        return value === 'one';
      });

      expect(anyAreOne).toBe(false);

      const itemsObject = {
        a: 'aa',
        b: 'bb',
        c: 'cc',
      };

      const anyAreTwo = some(itemsObject, (value) => {
        return value === 'two';
      });

      expect(anyAreTwo).toBe(false);
    });

  });

});
