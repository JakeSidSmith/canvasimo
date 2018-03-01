import { forPoints, getFontParts } from '../src/utils';
import { each, some } from './helpers/utils';

describe('utils', () => {

  jest.spyOn(console, 'warn').mockImplementation(jest.fn());

  beforeEach(() => {
    (console.warn as jest.Mock<any>).mockClear();
  });

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

  describe('getFontParts', () => {

    it('should warn about using line height when setting fonts', () => {
      expect(console.warn).not.toHaveBeenCalled();

      getFontParts('10px/1 arial', 1, true);

      expect(console.warn).toHaveBeenCalledTimes(1);

      const { calls } = (console.warn as jest.Mock<any>).mock;

      expect(calls[0].length).toBe(1);
      expect(calls[0][0]).toMatch(/10px\/1.+TextMultiline.+lineHeight/);

      getFontParts('10px/1 arial', 1, true);

      expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it('should return a font part array', () => {
      expect(getFontParts('arial 20px', 1, true))
        .toEqual(['normal', 'normal', 'normal', '10px', 'sans-serif']);
      expect(getFontParts('20px arial', 1, true))
        .toEqual(['normal', 'normal', 'normal', '20px', 'arial']);
      expect(getFontParts('20px/2 arial', 1, true))
        .toEqual(['normal', 'normal', 'normal', '20px', 'arial']);
      expect(getFontParts('bold 20px arial', 1, true))
        .toEqual(['normal', 'normal', 'bold', '20px', 'arial']);
      expect(getFontParts('small-caps 20px arial', 1, true))
        .toEqual(['normal', 'small-caps', 'normal', '20px', 'arial']);
      expect(getFontParts('italic 20px arial', 1, true))
        .toEqual(['italic', 'normal', 'normal', '20px', 'arial']);
      expect(getFontParts('300 italic 20px arial', 1, true))
        .toEqual(['italic', 'normal', '300', '20px', 'arial']);
      expect(getFontParts('menu', 1, true))
        .toEqual(['menu']);
    });

    it('should account for density when getting or setting font parts', () => {
      expect(getFontParts('20px arial', 2, true)).toEqual(['normal', 'normal', 'normal', '10px', 'arial']);
      expect(getFontParts('20px arial', 2, false)).toEqual(['normal', 'normal', 'normal', '40px', 'arial']);
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
