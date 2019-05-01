import Canvasimo from '../src';
import getContextStub from './helpers/get-context-stub';

describe('density', () => {

  const element = document.createElement('canvas');
  jest.spyOn(element, 'getContext').mockImplementation(getContextStub);
  const instance = new Canvasimo(element);
  const ctx = instance.getCurrentContext();

  it('should explicitly set the font size upon creation', () => {
    expect(ctx.font).toBe('normal normal normal 10px sans-serif');
    expect(instance.getFontSize()).toBe(10);
  });

  it('updates font size when changing the density', () => {
    instance.setDensity(2);

    expect(ctx.font).toBe('normal normal normal 20px sans-serif');
    expect(instance.getFontSize()).toBe(10);
  });
});
