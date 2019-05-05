import getDocJson from '../scripts/get-doc-json';
import Canvasimo from '../src';
import { NUMBER_OF_DOC_GROUPS, NUMBER_OF_PROPERTIES } from './helpers/constants';
import getBoundingClientRectStub from './helpers/get-bounding-client-rect-stub';
import getContextStub from './helpers/get-context-stub';

const PRIVATE_PROPERTIES = [
  'element',
  'ctx',
  'ctxType',
  'density',
  'storedContextValues',
  'setCanvasProperty',
  'getCanvasProperty',
  'drawTextWithLineBreaks',
  'wrapBreakAll',
  'wrapBreakWord',
  'wrapNormal',
  'textMultiline',
  'resetDensityRelatedValues',
  'setDefaultContextValues',
  'saveContextValues',
  'restoreContextValues',
];

describe('getDocJson', () => {
  it('should return a grouped list of available canvasimo properties', () => {
    const element = document.createElement('canvas');
    jest.spyOn(element, 'getContext').mockImplementation(getContextStub);
    jest.spyOn(element, 'getBoundingClientRect').mockImplementation(getBoundingClientRectStub);

    const instance = new Canvasimo(element);
    const canvasimoProperties = Object.keys(instance).filter((name) => PRIVATE_PROPERTIES.indexOf(name) < 0);
    const groups = getDocJson();

    expect(groups).toMatchSnapshot();

    expect(groups.length).toBe(NUMBER_OF_DOC_GROUPS);

    const methodsAndAliases = groups.reduce(
      (groupMemo, group) => {
        const methods = group.methods.reduce(
          (methodMemo, method) => {
            if (('alias' in method) && method.alias) {
              return methodMemo.concat(method.name).concat(method.alias);
            }

            return methodMemo.concat(method.name);
          },
          [] as string[]
        );

        return groupMemo.concat(methods);
      },
      [] as string[]
    );

    expect(methodsAndAliases).toEqual(canvasimoProperties);
    expect(methodsAndAliases.length).toBe(NUMBER_OF_PROPERTIES - PRIVATE_PROPERTIES.length);
  });
});
