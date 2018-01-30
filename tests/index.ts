import Canvasimo from '../src/';
import getBoundingClientRectStub from './helpers/get-bounding-client-rect-stub';
import getContextStub from './helpers/get-context-stub';
import ImageData from './helpers/image-data-stub';
import { each } from './helpers/utils';

describe('canvasimo', () => {

  let canvas: Canvasimo;
  const element = document.createElement('canvas');

  const specialFontTypes = [
    'caption',
    'icon',
    'menu',
    'message-box',
    'small-caption',
    'status-bar',
  ];

  const getters = {
    getOpacity: {value: 1, type: 'number'},
    getCompositeOperation: {value: 'source-over', type: 'string'},
    getFill: {value: '#000000', type: 'string'},
    getStroke: {value: '#000000', type: 'string'},
    getStrokeWidth: {value: 1, type: 'number'},
    getStrokeCap: {value: 'butt', type: 'string'},
    getStrokeJoin: {value: 'miter', type: 'string'},
    getStrokeDashOffset: {value: 0, type: 'number'},
    getMiterLimit: {value: 10, type: 'number'},
    getShadowColor: {value: 'rgba(0, 0, 0, 0)', type: 'string'},
    getShadowBlur: {value: 0, type: 'number'},
    getShadowOffsetX: {value: 0, type: 'number'},
    getShadowOffsetY: {value: 0, type: 'number'},
    getTextAlign: {value: 'start', type: 'string'},
    getTextBaseline: {value: 'alphabetic', type: 'string'},
  };

  const argumentMap = {
    setWidth: [0],
    setHeight: [0],
    setSize: [0, 0],
    scale: [1, 1],
    rotate: [0],
    translate: [0, 0],
    setTransform: [1, 0, 0, 1, 0, 0],
    transform: [1, 0, 0, 1, 0, 0],
    drawFocusIfNeeded: [element],
    clearRect: [0, 0, 0, 0],
    moveTo: [0, 0],
    lineTo: [0, 0],
    quadraticCurveTo: [0, 0, 0, 0],
    bezierCurveTo: [0, 0, 0, 0, 0, 0],
    arcTo: [0, 0, 0, 0, 0],
    fillText: ['', 0, 0],
    strokeText: ['', 0, 0],
    drawImage: [new Image(), 0, 0], // eslint-disable-line no-undef
    putImageData: [new ImageData(1, 1), 0, 0],
    plotRect: [0, 0, 0, 0],
    plotArc: [0, 0, 0, 0, 0],
    plotEllipse: [0, 0, 0, 0, 0, 0, 0],
    setStrokeDash: [[]],
    isPointInPath: [0, 0],
    tap: [() => undefined],
    repeat: [0, 0, 0, () => undefined],
    forEach: [[], () => undefined],
  };

  const isGetter = /^(get|create|is|measure|constrain|map)/i;

  it('should return an interface', () => {
    stub(element, 'getContext', getContextStub);
    stub(element, 'getBoundingClientRect', getBoundingClientRectStub);

    canvas = new Canvasimo(element);

    expect(Boolean(canvas)).toBe(true);
  });

  it('should bind its methods to itself', () => {
    Function.prototype._bind = Function.prototype.bind;

    // Override bind
    Function.prototype.bind = function () {
      const fn = this;
      const args = Array.prototype.slice.call(arguments);
      const boundFunction = fn._bind.apply(fn, args);
      boundFunction.boundTo = args[0];
      return boundFunction;
    };

    canvas = new Canvasimo(element);

    for (const key in canvas) {
      expect(canvas[key].boundTo).toBe(canvas);
    }

    // Restore bind
    Function.prototype.bind = Function.prototype._bind;
    delete Function.prototype._bind;

    // Create canvas without bind override
    canvas = new Canvasimo(element);
  });

  describe('property getters', () => {

    it('should return the correct property values from the context', () => {
      each(getters, (expected, key) => {
        const result = (canvas as any)[key]();
        expect(result).toBe(expected.value);
        expect(typeof result).toBe(expected.type);
      });
    });

  });

  describe('element getters', () => {

    it('should return the canvas element', () => {
      expect(canvas.getCanvas()).toEqual(element);
      expect(canvas.getElement()).toEqual(element);
    });

    it('should return the element\'s bounding client rect', () => {
      expect(canvas.getBoundingClientRect()).toEqual({
        top: 0,
        left: 0,
        right: 50,
        bottom: 50,
        width: 100,
        height: 100,
      });
    });

  });

  describe('context getters', () => {

    it('should return the actual canvas context', () => {
      expect(canvas.getContext('2d')).toBe(element.getContext('2d'));
      expect(canvas.getContext('someothercontext')).toEqual({});
      expect(canvas.getContext('')).toEqual({});
    });

    it('should return the current context & context type', () => {
      expect(canvas.getCurrentContext()).toBe(element.getContext('2d'));
      expect(canvas.getCurrentContextType()).toBe('2d');
    });

  });

  describe('get data url', () => {

    it('should return a data url of the canvas', () => {
      stub(element, 'toDataURL', () => {
        return 'url';
      });

      expect(canvas.getDataURL()).toBe('url');
    });

  });

  describe('canvas sizes', () => {

    it('should return the canvas width and height as an integer', () => {
      element.setAttribute('width', '123');
      element.setAttribute('height', '456');

      expect(canvas.getWidth()).toBe(123);
      expect(canvas.getHeight()).toBe(456);

      expect(typeof canvas.getWidth()).toBe('number');
      expect(typeof canvas.getHeight()).toBe('number');

      element.setAttribute('width', '12.3');
      element.setAttribute('height', '45.6');

      expect(canvas.getWidth()).toBe(12);
      expect(canvas.getHeight()).toBe(45);

      expect(typeof canvas.getWidth()).toBe('number');
      expect(typeof canvas.getHeight()).toBe('number');

      expect(canvas.getSize()).toEqual({width: 12, height: 45});
    });

    it('should set the canvas width and height as integers', () => {
      canvas.setWidth(456);
      canvas.setHeight(123);

      expect(element.getAttribute('width')).toBe('456');
      expect(element.getAttribute('height')).toBe('123');

      canvas.setWidth(45.6);
      canvas.setHeight(12.3);

      expect(element.getAttribute('width')).toBe('45');
      expect(element.getAttribute('height')).toBe('12');

      canvas.setSize(32.1, 65.4);

      expect(element.getAttribute('width')).toBe('32');
      expect(element.getAttribute('height')).toBe('65');
    });

  });

  describe('image smoothing', () => {

    it('should return the first image smoothing value', () => {
      expect(canvas.getImageSmoothingEnabled()).toBe(true);
    });

    it('should set the first image smoothing value', () => {
      canvas.setImageSmoothingEnabled(false);

      expect(canvas.getImageSmoothingEnabled()).to.be.false;
    });

    it('should return null if no image smoothing keys present', () => {
      const context = element.getContext('2d');
      delete context.imageSmoothingEnabled;
      delete context.webkitImageSmoothingEnabled;

      expect(canvas.getImageSmoothingEnabled()).to.be.null;
    });

    it('should not set a value if no image smoothing keys present', () => {
      canvas.setImageSmoothingEnabled(true);

      expect(canvas.getImageSmoothingEnabled()).to.be.null;
    });

  });

  describe('font methods', () => {

    it('should return a formatted font value', () => {
      expect(canvas.getFont()).toBe('normal normal normal 10px sans-serif');
    });

    it('should set the font', () => {
      canvas.setFont('20.2px times');
      expect(canvas.getFont()).toBe('normal normal normal 20.2px times');

      canvas.setFont('.2% arial');
      expect(canvas.getFont()).toBe('normal normal normal .2% arial');

      canvas.setFont('300 italic normal 20px times');
      expect(canvas.getFont()).toBe('italic normal 300 20px times');

      canvas.setFont('small-caps normal bold 20px arial');
      expect(canvas.getFont()).toBe('normal small-caps bold 20px arial');
    });

    it('should return individual font properties', () => {
      expect(canvas.getFontStyle()).toBe('normal');
      expect(canvas.getFontVariant()).toBe('small-caps');
      expect(canvas.getFontWeight()).toBe('bold');
      expect(canvas.getFontSize()).toBe(20);
      expect(canvas.getFontFamily()).toBe('arial');
    });

    it('should set individual font properties', () => {
      canvas.setFontStyle('italic');
      expect(canvas.getFont()).toBe('italic small-caps bold 20px arial');

      canvas.setFontVariant('normal');
      expect(canvas.getFont()).toBe('italic normal bold 20px arial');

      canvas.setFontWeight('normal');
      expect(canvas.getFont()).toBe('italic normal normal 20px arial');

      canvas.setFontSize(15);
      expect(canvas.getFont()).toBe('italic normal normal 15px arial');

      canvas.setFontFamily('times');
      expect(canvas.getFont()).toBe('italic normal normal 15px times');
    });

    it('should allow setting special font types', () => {
      each(specialFontTypes, (s =>pecialFontType) {
        canvas.setFont(specialFontType);
        expect(canvas.getFont()).toBe(specialFontType);
      });
    });

    it('should return null for individual properties when a special font is set', () => {
      expect(canvas.getFontStyle()).to.be.null;
      expect(canvas.getFontVariant()).to.be.null;
      expect(canvas.getFontWeight()).to.be.null;
      expect(canvas.getFontSize()).to.be.null;
      expect(canvas.getFontFamily()).to.be.null;
    });

    it('should set the default font if properties are set when a special font is set', () => {
      // Set to special font type
      canvas.setFont(specialFontTypes[0]);
      expect(canvas.getFont()).toBe(specialFontTypes[0]);

      canvas.setFontStyle();
      expect(canvas.getFont()).toBe('normal normal normal 10px sans-serif');

      // Set to special font type
      canvas.setFont(specialFontTypes[0]);
      expect(canvas.getFont()).toBe(specialFontTypes[0]);

      canvas.setFontVariant();
      expect(canvas.getFont()).toBe('normal normal normal 10px sans-serif');

      // Set to special font type
      canvas.setFont(specialFontTypes[0]);
      expect(canvas.getFont()).toBe(specialFontTypes[0]);

      canvas.setFontWeight();
      expect(canvas.getFont()).toBe('normal normal normal 10px sans-serif');

      // Set to special font type
      canvas.setFont(specialFontTypes[0]);
      expect(canvas.getFont()).toBe(specialFontTypes[0]);

      canvas.setFontSize();
      expect(canvas.getFont()).toBe('normal normal normal 10px sans-serif');

      // Set to special font type
      canvas.setFont(specialFontTypes[0]);
      expect(canvas.getFont()).toBe(specialFontTypes[0]);

      canvas.setFontFamily();
      expect(canvas.getFont()).toBe('normal normal normal 10px sans-serif');

    });

    it('should set the default font if a font value is incorrect', () => {
      // Set to something correct
      canvas.setFont('20px times');
      expect(canvas.getFont()).toBe('normal normal normal 20px times');

      canvas.setFont('oops');
      expect(canvas.getFont()).toBe('normal normal normal 10px sans-serif');

      // Set to something correct
      canvas.setFont('20px times');
      expect(canvas.getFont()).toBe('normal normal normal 20px times');

      canvas.setFont('not real values 15px arial');
      expect(canvas.getFont()).toBe('normal normal normal 10px sans-serif');

      // Set to something correct
      canvas.setFont('20px times');
      expect(canvas.getFont()).toBe('normal normal normal 20px times');

      canvas.setFont('italic bold');
      expect(canvas.getFont()).toBe('normal normal normal 10px sans-serif');
    });

  });

  describe('plot path', () => {

    it('should accept but do nothing with empty and near empty point arrays', () => {
      const context = canvas.getCurrentContext();
      const moveToSpy = spy(context, 'moveTo');
      const lineToSpy = spy(context, 'lineTo');

      canvas.plotPath(null);
      canvas.plotPath(undefined);
      canvas.plotPath([]);
      canvas.plotPath([0]);
      canvas.plotPath([[0, 1]]);
      canvas.plotPath([{x: 0, y: 0}]);

      expect(moveToSpy).not.toHaveBeenCalled();
      expect(lineToSpy).not.toHaveBeenCalled();

      moveToSpy.restore();
      lineToSpy.restore();
    });

    it('should throw an error if provided incorrect points arrays', () => {
      const anError = /must be an array of/;

      expect(canvas.plotPath.bind(null, {})).toThrow(anError);
      expect(canvas.plotPath.bind(null, [[0]])).toThrow(anError);
      expect(canvas.plotPath.bind(null, [{x: 0}])).toThrow(anError);
      expect(canvas.plotPath.bind(null, [{y: 0}])).toThrow(anError);
      expect(canvas.plotPath.bind(null, [{}])).toThrow(anError);
      expect(canvas.plotPath.bind(null, [[0, 1, 2]])).toThrow(anError);
      expect(canvas.plotPath.bind(null, ['wat'])).toThrow(anError);
    });

    it('should accept and plot valid point arrays', () => {
      const context = canvas.getCurrentContext();
      const moveToSpy = spy(context, 'moveTo');
      const lineToSpy = spy(context, 'lineTo');

      canvas.plotPath([0, 1, 2, 3]);

      expect(moveToSpy).to.have.been.calledWith(0, 1);
      expect(lineToSpy).to.have.been.calledWith(2, 3);

      canvas.plotPath([[4, 5], [6, 7]]);

      expect(moveToSpy).to.have.been.calledWith(4, 5);
      expect(lineToSpy).to.have.been.calledWith(6, 7);

      canvas.plotPath([{x: 8, y: 9}, {x: 10, y: 11}]);

      expect(moveToSpy).to.have.been.calledWith(8, 9);
      expect(lineToSpy).to.have.been.calledWith(10, 11);

      moveToSpy.restore();
      lineToSpy.restore();
    });

  });

  describe('actions and setters', () => {

    it('should return the canvas', () => {
      each(canvas, (method, key) => {
        if (!isGetter.exec(key)) {
          expect(method.apply(null, argumentMap[key])).toBe(canvas);
        }
      });
    });

  });

  describe('fill and strong', () => {

    it('should set the fill if it is not a special fill', () => {
      const fillSpy = spy(canvas, 'setFill');

      canvas.fill('nonzero');
      expect(fillSpy).not.toHaveBeenCalled();

      canvas.fill('red');
      expect(fillSpy).toHaveBeenCalledTimes(1);

      canvas.setFill.restore();
    });

    it('should set the stroke if it is a string', () => {
      const strokeSpy = spy(canvas, 'setStroke');

      canvas.stroke(0);
      expect(strokeSpy).not.toHaveBeenCalled();

      canvas.stroke('red');
      expect(strokeSpy).toHaveBeenCalledTimes(1);

      canvas.setStroke.restore();
    });

  });

  describe('resetTransform', () => {

    it('should use setTransform if resetTransform is unavailable', () => {
      const ctx = canvas.getCurrentContext();
      const _resetTransform = ctx.resetTransform;
      delete ctx.resetTransform;

      const setTransformSpy = spy(canvas, 'setTransform');

      canvas.resetTransform();

      expect(setTransformSpy).toHaveBeenCalledTimes(1);

      ctx.resetTransform = _resetTransform;

      setTransformSpy.reset();

      canvas.resetTransform();

      expect(setTransformSpy).not.toHaveBeenCalled();

      canvas.setTransform.restore();
    });

  });

  describe('helper methods', () => {

    it('should create color values', () => {
      expect(canvas.createHSL(123, 40, 50)).toBe('hsl(123,40%,50%)');
      expect(canvas.createHSLA(123, 40, 50, 0.5)).toBe('hsla(123,40%,50%,0.5)');
      expect(canvas.createRGB(111, 222, 333)).toBe('rgb(111,222,333)');
      expect(canvas.createRGBA(111, 222, 333, 0.5)).toBe('rgba(111,222,333,0.5)');
    });

    it('should remove alpha values from colors', () => {
      expect(canvas.getHSLFromHSLA(canvas.createHSLA(123, 40, 50, 0.5))).toBe('hsl(123,40%,50%)');
      expect(canvas.getRGBFromRGBA(canvas.createRGBA(111, 222, 333, 0.5))).toBe('rgb(111,222,333)');
    });

    it('should convert angles', () => {
      expect(canvas.getRadiansFromDegrees(0)).toBe(0);
      expect(canvas.getRadiansFromDegrees(180)).toBe(Math.PI);
      expect(canvas.getRadiansFromDegrees(360)).toBe(Math.PI * 2);

      expect(canvas.getDegreesFromRadians(0)).toBe(0);
      expect(canvas.getDegreesFromRadians(Math.PI)).toBe(180);
      expect(canvas.getDegreesFromRadians(Math.PI * 2)).toBe(360);
    });

    it('should convert fractions & percentages', () => {
      expect(canvas.getPercentFromFraction(0.75)).toBe(75);
      expect(canvas.getFractionFromPercent(25)).toBe(0.25);
    });

    it('should get fractions & percentages of the canvas size', () => {
      canvas.setSize(400, 200);

      expect(canvas.getPercentOfWidth(75)).toBe(300);
      expect(canvas.getFractionOfWidth(0.25)).toBe(100);

      expect(canvas.getPercentOfHeight(75)).toBe(150);
      expect(canvas.getFractionOfHeight(0.25)).toBe(50);
    });

    it('should return information about a pixel', () => {
      canvas.setSize(5, 5);

      expect(canvas.getPixelData(2, 2)).toEqual([0, 0, 0, 0]);
      expect(canvas.getPixelColor(2, 2)).toBe('rgba(0,0,0,0)');
    });

    it('should calculate the distance between 2 points', () => {
      expect(canvas.getDistance()).toBe(NaN);
      expect(canvas.getDistance(0, 0, 0, 10)).toBe(10);
      expect(canvas.getDistance(0, 0, 0, -10)).toBe(10);
      expect(canvas.getDistance(0, 0, 10, 0)).toBe(10);
      expect(canvas.getDistance(0, 3, 4, 0)).toBe(5);
      expect(canvas.getDistance(4, 0, 0, 3)).toBe(5);
      expect(canvas.getDistance(-4, 0, 0, -3)).toBe(5);
    });

    it('should error when calculating angles with wrong arguments', () => {
      const anError = /Incorrect number of arguments/;

      expect(canvas.getAngle.bind(null, 0, 0, 0, 0)).not.toThrow(anError);
      expect(canvas.getAngle.bind(null, 0, 0, 0, 0, 0, 0)).not.toThrow(anError);

      expect(canvas.getAngle.bind(null)).toThrow(anError);
      expect(canvas.getAngle.bind(null, 0)).toThrow(anError);
      expect(canvas.getAngle.bind(null, 0, 0, 0)).toThrow(anError);
      expect(canvas.getAngle.bind(null, 0, 0, 0, 0, 0)).toThrow(anError);
      expect(canvas.getAngle.bind(null, 0, 0, 0, 0, 0, 0, 0, 0, 0)).toThrow(anError);
    });

    it('should calculate the angle between 2 points', () => {
      expect(canvas.getAngle(0, 0, 10, 0)).toBe(0);
      expect(canvas.getAngle(0, 0, 0, 10)).toBe(Math.PI * 0.5);
      expect(canvas.getAngle(0, 0, 0, -10)).toBe(-Math.PI * 0.5);
      expect(canvas.getAngle(0, 0, 10, 10)).toBe(Math.PI * 0.25);
      expect(canvas.getAngle(0, 0, 10, -10)).toBe(-Math.PI * 0.25);
      expect(canvas.getAngle(0, 0, -10, 10)).toBe(Math.PI * 0.75);
      expect(canvas.getAngle(0, 0, -10, -10)).toBe(-Math.PI * 0.75);
    });

    it('should calculate the angle between 3 points', () => {
      expect(canvas.getAngle(0, 0, 10, 0, 20, 0)).toBe(Math.PI);
      expect(canvas.getAngle(20, 0, 10, 0, 0, 0)).toBe(Math.PI);
      expect(canvas.getAngle(0, 0, 10, 0, 10, 10)).toBe(Math.PI * 0.5);
      expect(canvas.getAngle(0, 0, 10, 0, 10, -10)).toBe(-Math.PI * 0.5);
      expect(canvas.getAngle(0, 0, 10, 0, 20, 10)).toBe(Math.PI * 0.75);
      expect(canvas.getAngle(0, 0, 10, 0, 20, -10)).toBe(-Math.PI * 0.75);
      expect(canvas.getAngle(0, 0, 10, 0, 0, 0)).toBe(0);
      expect(canvas.getAngle(0, 0, -10, 10, -10, 0)).toBe(Math.PI * 0.25);
      expect(canvas.getAngle(0, 0, -10, 10, 0, 10)).toBe(-Math.PI * 0.25);
    });

  });

  describe('tap', () => {

    it('should allow a function to be run during a chain', () => {
      let result = false;

      expect(
        canvas
          .setFill('black')
          .tap(function () {
            result = true;
            this.setFill('red');
          })
          .getFill()
      ).toBe('red');

      expect(result).toBe(true);
    });

    it('should error if no callback is provided', () => {
      const anError = /function/i;

      expect(canvas.tap).toThrow(anError);
      expect(canvas.tap.bind(null, 1)).toThrow(anError);
      expect(canvas.tap.bind(null, function () {})).not.toThrow(anError);
    });

  });

  describe('repeat', () => {

    it('should loop over the provided range', () => {
      const expected;
      const callback = spy();

      canvas.repeat(null, callback);
      expect(callback).not.toHaveBeenCalled();
      callback.reset();

      canvas.repeat(0, null, callback);
      expect(callback).not.toHaveBeenCalled();
      callback.reset();

      canvas.repeat(0, 1, null, callback);
      expect(callback).not.toHaveBeenCalled();
      callback.reset();

      canvas.repeat(0, 0, 1, callback);
      expect(callback).not.toHaveBeenCalled();
      callback.reset();

      expected = [0, 1, 2];
      canvas.repeat(3, callback);
      expect(callback).toHaveBeenCalledTimes(3);
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).toEqual([value]);
      });
      callback.reset();

      expected = [1, 2, 3];
      canvas.repeat(1, 4, callback);
      expect(callback).toHaveBeenCalledTimes(3);
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).toEqual([value]);
      });
      callback.reset();

      expected = [-2, -3, -4];
      canvas.repeat(-2, -5, callback);
      expect(callback).toHaveBeenCalledTimes(3);
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).toEqual([value]);
      });
      callback.reset();

      expected = [2, 4, 6];
      canvas.repeat(2, 8, 2, callback);
      expect(callback).toHaveBeenCalledTimes(3);
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).toEqual([value]);
      });
      callback.reset();

      expected = [10, 5, 0];
      canvas.repeat(10, -5, 5, callback);
      expect(callback).toHaveBeenCalledTimes(3);
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).toEqual([value]);
      });
      callback.reset();

      expected = [1, 3, 5];
      canvas.repeat(1, 6, 2, callback);
      expect(callback).toHaveBeenCalledTimes(3);
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).toEqual([value]);
      });
      callback.reset();
    });

    it('should stop iteration if false is returned', () => {
      const callback = spy(function (index) {
        if (index === 1) {
          return false;
        }
      });

      canvas.repeat(3, callback);
      expect(callback).toHaveBeenCalledTimes(2);
      callback.reset();
    });

    it('should error if wrong arguments provided', () => {
      const anError = /arguments/i;

      expect(canvas.repeat).toThrow(anError);
      expect(canvas.repeat.bind(null, 0)).toThrow(anError);
      expect(canvas.repeat.bind(null, 0, 0, 0, 0, 0)).toThrow(anError);
    });

    it('should error if no callback is provided', () => {
      const anError = /function/i;

      expect(canvas.repeat.bind(null, 0, 1)).toThrow(anError);
      expect(canvas.repeat.bind(null, 0, 1, 1)).toThrow(anError);
      expect(canvas.repeat.bind(null, 0, 1, 1, 1)).toThrow(anError);
    });

  });

  describe('forEach', () => {

    it('should loop over the array, object, or string provided', () => {
      const expected;
      const callback = spy();

      expected = [0, 1, 2];
      canvas.forEach(expected, callback);
      expect(callback).toHaveBeenCalledTimes(3);
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).toEqual([value, index]);
      });
      callback.reset();

      expected = 'str';
      canvas.forEach(expected, callback);
      expect(callback).toHaveBeenCalledTimes(3);
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).toEqual([value, index]);
      });
      callback.reset();

      const i = 0;

      expected = {foo: 'bar', bar: 'foo', hello: 'world'};
      canvas.forEach(expected, callback);
      expect(callback).toHaveBeenCalledTimes(3);
      each(expected, function (value, key) {
        expect(callback.getCall(i).args).toEqual([value, key]);
        i += 1;
      });
      callback.reset();
    });

    it('should stop iteration if false is returned', () => {
      const expected;
      const i;

      const callback = spy(function () {
        if (i === 1) {
          return false;
        }

        i += 1;
      });

      i = 0;

      expected = [0, 1, 2];
      canvas.forEach(expected, callback);
      expect(callback).toHaveBeenCalledTimes(2);
      callback.reset();

      i = 0;

      expected = {foo: 'bar', bar: 'foo', hello: 'world'};
      canvas.forEach(expected, callback);
      expect(callback).toHaveBeenCalledTimes(2);
      callback.reset();
    });

    it('should error if wrong arguments provided', () => {
      const anError = /argument/i;

      expect(canvas.forEach.bind(null, 0, function () {})).toThrow(anError);
      expect(canvas.forEach.bind(null, function () {}, function () {})).toThrow(anError);
    });

    it('should error if no callback is provided', () => {
      const anError = /function/i;

      expect(canvas.forEach).toThrow(anError);
      expect(canvas.forEach.bind(null, [])).toThrow(anError);
      expect(canvas.forEach.bind(null, [], 1)).toThrow(anError);
    });

  });

  describe('constrain', () => {

    it('should constrain a number between 2 other numbers', () => {
      expect(canvas.constrain(0.5, 0, 1)).toBe(0.5);
      expect(canvas.constrain(2, 0, 1)).toBe(1);
      expect(canvas.constrain(2, 1, 0)).toBe(1);
      expect(canvas.constrain(-2, 0, 1)).toBe(0);
      expect(canvas.constrain(10, 1, 1)).toBe(1);
    });

  });

  describe('map', () => {

    it('should map a number from a given range to another range', () => {
      expect(canvas.map(0.5, 0, 1, 0, 10)).toBe(5);
      expect(canvas.map(0.5, 0, 1, 1, 0)).toBe(0.5);
      expect(canvas.map(0.5, 0, 1, 0, -1)).toBe(-0.5);
      expect(canvas.map(6, 2, 4, 4, 10)).toBe(16);
      expect(canvas.map(3, 2, 4, 4, 10)).toBe(7);
    });

  });

});
