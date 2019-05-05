import Canvasimo from '../src';
import getContextStub from './helpers/get-context-stub';

describe('density', () => {

  const element = document.createElement('canvas');
  jest.spyOn(element, 'getContext').mockImplementation(getContextStub);
  const instance = new Canvasimo(element).setWidth(100);
  const ctx = instance.getCurrentContext();

  it('should explicitly set the font size upon creation', () => {
    expect(ctx.font).toBe('normal normal normal 10px sans-serif');
    expect(instance.getFontSize()).toBe(10);
    expect(element.width).toBe(100);
    expect(instance.getWidth()).toBe(100);
  });

  it('updates font size when changing the density', () => {
    instance.setDensity(2);

    expect(ctx.font).toBe('normal normal normal 20px sans-serif');
    expect(instance.getFontSize()).toBe(10);
    expect(element.width).toBe(200);
    expect(instance.getWidth()).toBe(100);
  });

  it('retains density when the canvas is cleared (without changing the canvas size)', () => {
    instance.clearCanvas();

    expect(ctx.font).toBe('normal normal normal 20px sans-serif');
    expect(instance.getFontSize()).toBe(10);
    expect(element.width).toBe(200);
    expect(instance.getWidth()).toBe(100);
  });
});
