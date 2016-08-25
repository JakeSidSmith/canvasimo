'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var spy = sinon.spy;
var stub = sinon.stub;
var utils = require('./helpers/utils');
var each = utils.each;
var Canvas = require('../lib/index.js');
var getContextStub = require('./helpers/get-context-stub');
var getBoundingClientRectStub = require('./helpers/get-bounding-client-rect-stub');
var ImageData = require('./helpers/image-data-stub');

describe('canvasimo', function () {

  var canvas, element;

  var specialFontTypes = [
    'caption',
    'icon',
    'menu',
    'message-box',
    'small-caption',
    'status-bar'
  ];

  var getters = {
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
    getTextBaseline: {value: 'alphabetic', type: 'string'}
  };

  var argumentMap = {
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
    drawImage: [new Image(), 0, 0],
    putImageData: [new ImageData(1, 1), 0, 0],
    plotRect: [0, 0, 0, 0],
    plotArc: [0, 0, 0, 0, 0],
    plotEllipse: [0, 0, 0, 0, 0, 0, 0],
    setStrokeDash: [[]],
    isPointInPath: [0, 0],
    tap: [function () {}],
    repeat: [0, 0, 0, function () {}]
  };

  var isGetter = /^(get|create|is|measure)/i;

  it('should return an interface', function () {
    element = document.createElement('canvas');

    stub(element, 'getContext', getContextStub);
    stub(element, 'getBoundingClientRect', getBoundingClientRectStub);

    canvas = new Canvas(element);

    expect(canvas).to.exist;
  });

  it('should bind its methods to itself', function () {
    Function.prototype._bind = Function.prototype.bind;

    // Override bind
    Function.prototype.bind = function () {
      var fn = this;
      var args = Array.prototype.slice.call(arguments);
      var boundFunction = fn._bind.apply(fn, args);
      boundFunction.boundTo = args[0];
      return boundFunction;
    };

    canvas = new Canvas(element);

    for (var key in canvas) {
      expect(canvas[key].boundTo).to.equal(canvas);
    }

    // Restore bind
    Function.prototype.bind = Function.prototype._bind;
    delete Function.prototype._bind;

    // Create canvas without bind override
    canvas = new Canvas(element);
  });

  describe('property getters', function () {

    it('should return the correct property values from the context', function () {
      each(getters, function (expected, key) {
        var result = canvas[key]();
        expect(result).to.equal(expected.value);
        expect(typeof result).to.equal(expected.type);
      });
    });

  });

  describe('element getters', function () {

    it('should return the canvas element', function () {
      expect(canvas.getCanvas()).to.equal(element);
      expect(canvas.getElement()).to.equal(element);
    });

    it('should return the element\'s bounding client rect', function () {
      expect(canvas.getBoundingClientRect()).to.eql({
        top: 0,
        left: 0,
        right: 50,
        bottom: 50,
        width: 100,
        height: 100
      });
    });

  });

  describe('context getters', function () {

    it('should return the actual canvas context', function () {
      expect(canvas.getContext('2d')).to.equal(element.getContext('2d'));
      expect(canvas.getContext('someothercontext')).to.eql({});
      expect(canvas.getContext(null)).to.eql({});
    });

    it('should return the current context & context type', function () {
      expect(canvas.getCurrentContext()).to.equal(element.getContext('2d'));
      expect(canvas.getCurrentContextType()).to.equal('2d');
    });

  });

  describe('get data url', function () {

    it('should return a data url of the canvas', function () {
      stub(element, 'toDataURL', function () {
        return 'url';
      });

      expect(canvas.getDataURL()).to.equal('url');
    });

  });

  describe('canvas sizes', function () {

    it('should return the canvas width and height as an integer', function () {
      element.setAttribute('width', 123);
      element.setAttribute('height', 456);

      expect(canvas.getWidth()).to.equal(123);
      expect(canvas.getHeight()).to.equal(456);

      expect(typeof canvas.getWidth()).to.equal('number');
      expect(typeof canvas.getHeight()).to.equal('number');

      element.setAttribute('width', 12.3);
      element.setAttribute('height', 45.6);

      expect(canvas.getWidth()).to.equal(12);
      expect(canvas.getHeight()).to.equal(45);

      expect(typeof canvas.getWidth()).to.equal('number');
      expect(typeof canvas.getHeight()).to.equal('number');

      expect(canvas.getSize()).to.eql({width: 12, height: 45});
    });

    it('should set the canvas width and height as integers', function () {
      canvas.setWidth(456);
      canvas.setHeight(123);

      expect(element.getAttribute('width')).to.equal('456');
      expect(element.getAttribute('height')).to.equal('123');

      canvas.setWidth(45.6);
      canvas.setHeight(12.3);

      expect(element.getAttribute('width')).to.equal('45');
      expect(element.getAttribute('height')).to.equal('12');

      canvas.setSize(32.1, 65.4);

      expect(element.getAttribute('width')).to.equal('32');
      expect(element.getAttribute('height')).to.equal('65');
    });

  });

  describe('image smoothing', function () {

    it('should return the first image smoothing value', function () {
      expect(canvas.getImageSmoothingEnabled()).to.be.true;
    });

    it('should set the first image smoothing value', function () {
      canvas.setImageSmoothingEnabled(false);

      expect(canvas.getImageSmoothingEnabled()).to.be.false;
    });

    it('should return null if no image smoothing keys present', function () {
      var context = element.getContext('2d');
      delete context.imageSmoothingEnabled;
      delete context.webkitImageSmoothingEnabled;

      expect(canvas.getImageSmoothingEnabled()).to.be.null;
    });

    it('should not set a value if no image smoothing keys present', function () {
      canvas.setImageSmoothingEnabled(true);

      expect(canvas.getImageSmoothingEnabled()).to.be.null;
    });

  });

  describe('font methods', function () {

    it('should return a formatted font value', function () {
      expect(canvas.getFont()).to.equal('normal normal normal 10px sans-serif');
    });

    it('should set the font', function () {
      canvas.setFont('20.2px times');
      expect(canvas.getFont()).to.equal('normal normal normal 20.2px times');

      canvas.setFont('.2% arial');
      expect(canvas.getFont()).to.equal('normal normal normal .2% arial');

      canvas.setFont('300 italic normal 20px times');
      expect(canvas.getFont()).to.equal('italic normal 300 20px times');

      canvas.setFont('small-caps normal bold 20px arial');
      expect(canvas.getFont()).to.equal('normal small-caps bold 20px arial');
    });

    it('should return individual font properties', function () {
      expect(canvas.getFontStyle()).to.equal('normal');
      expect(canvas.getFontVariant()).to.equal('small-caps');
      expect(canvas.getFontWeight()).to.equal('bold');
      expect(canvas.getFontSize()).to.equal(20);
      expect(canvas.getFontFamily()).to.equal('arial');
    });

    it('should set individual font properties', function () {
      canvas.setFontStyle('italic');
      expect(canvas.getFont()).to.equal('italic small-caps bold 20px arial');

      canvas.setFontVariant('normal');
      expect(canvas.getFont()).to.equal('italic normal bold 20px arial');

      canvas.setFontWeight('normal');
      expect(canvas.getFont()).to.equal('italic normal normal 20px arial');

      canvas.setFontSize(15);
      expect(canvas.getFont()).to.equal('italic normal normal 15px arial');

      canvas.setFontFamily('times');
      expect(canvas.getFont()).to.equal('italic normal normal 15px times');
    });

    it('should allow setting special font types', function () {
      each(specialFontTypes, function (specialFontType) {
        canvas.setFont(specialFontType);
        expect(canvas.getFont()).to.equal(specialFontType);
      });
    });

    it('should return null for individual properties when a special font is set', function () {
      expect(canvas.getFontStyle()).to.be.null;
      expect(canvas.getFontVariant()).to.be.null;
      expect(canvas.getFontWeight()).to.be.null;
      expect(canvas.getFontSize()).to.be.null;
      expect(canvas.getFontFamily()).to.be.null;
    });

    it('should set the default font if properties are set when a special font is set', function () {
      // Set to special font type
      canvas.setFont(specialFontTypes[0]);
      expect(canvas.getFont()).to.equal(specialFontTypes[0]);

      canvas.setFontStyle();
      expect(canvas.getFont()).to.equal('normal normal normal 10px sans-serif');

      // Set to special font type
      canvas.setFont(specialFontTypes[0]);
      expect(canvas.getFont()).to.equal(specialFontTypes[0]);

      canvas.setFontVariant();
      expect(canvas.getFont()).to.equal('normal normal normal 10px sans-serif');

      // Set to special font type
      canvas.setFont(specialFontTypes[0]);
      expect(canvas.getFont()).to.equal(specialFontTypes[0]);

      canvas.setFontWeight();
      expect(canvas.getFont()).to.equal('normal normal normal 10px sans-serif');

      // Set to special font type
      canvas.setFont(specialFontTypes[0]);
      expect(canvas.getFont()).to.equal(specialFontTypes[0]);

      canvas.setFontSize();
      expect(canvas.getFont()).to.equal('normal normal normal 10px sans-serif');

      // Set to special font type
      canvas.setFont(specialFontTypes[0]);
      expect(canvas.getFont()).to.equal(specialFontTypes[0]);

      canvas.setFontFamily();
      expect(canvas.getFont()).to.equal('normal normal normal 10px sans-serif');

    });

    it('should set the default font if a font value is incorrect', function () {
      // Set to something correct
      canvas.setFont('20px times');
      expect(canvas.getFont()).to.equal('normal normal normal 20px times');

      canvas.setFont('oops');
      expect(canvas.getFont()).to.equal('normal normal normal 10px sans-serif');

      // Set to something correct
      canvas.setFont('20px times');
      expect(canvas.getFont()).to.equal('normal normal normal 20px times');

      canvas.setFont('not real values 15px arial');
      expect(canvas.getFont()).to.equal('normal normal normal 10px sans-serif');

      // Set to something correct
      canvas.setFont('20px times');
      expect(canvas.getFont()).to.equal('normal normal normal 20px times');

      canvas.setFont('italic bold');
      expect(canvas.getFont()).to.equal('normal normal normal 10px sans-serif');
    });

  });

  describe('plot path', function () {

    it('should accept but do nothing with empty and near empty point arrays', function () {
      var context = canvas.getCurrentContext();
      var moveToSpy = spy(context, 'moveTo');
      var lineToSpy = spy(context, 'lineTo');

      canvas.plotPath(null);
      canvas.plotPath(undefined);
      canvas.plotPath([]);
      canvas.plotPath([0]);
      canvas.plotPath([[0, 1]]);
      canvas.plotPath([{x: 0, y: 0}]);

      expect(moveToSpy).not.to.have.been.called;
      expect(lineToSpy).not.to.have.been.called;

      moveToSpy.restore();
      lineToSpy.restore();
    });

    it('should throw an error if provided incorrect points arrays', function () {
      var anError = /must be an array of/;

      expect(canvas.plotPath.bind(null, {})).to.throw(anError);
      expect(canvas.plotPath.bind(null, [[0]])).to.throw(anError);
      expect(canvas.plotPath.bind(null, [{x: 0}])).to.throw(anError);
      expect(canvas.plotPath.bind(null, [{y: 0}])).to.throw(anError);
      expect(canvas.plotPath.bind(null, [{}])).to.throw(anError);
      expect(canvas.plotPath.bind(null, [[0, 1, 2]])).to.throw(anError);
      expect(canvas.plotPath.bind(null, ['wat'])).to.throw(anError);
    });

    it('should accept and plot valid point arrays', function () {
      var context = canvas.getCurrentContext();
      var moveToSpy = spy(context, 'moveTo');
      var lineToSpy = spy(context, 'lineTo');

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

  describe('actions and setters', function () {

    it('should return the canvas', function () {
      each(canvas, function (method, key) {
        if (!isGetter.exec(key)) {
          expect(method.apply(null, argumentMap[key])).to.equal(canvas);
        }
      });
    });

  });

  describe('helper methods', function () {

    it('should create color values', function () {
      expect(canvas.createHSL(123, 40, 50)).to.equal('hsl(123,40%,50%)');
      expect(canvas.createHSLA(123, 40, 50, 0.5)).to.equal('hsla(123,40%,50%,0.5)');
      expect(canvas.createRGB(111, 222, 333)).to.equal('rgb(111,222,333)');
      expect(canvas.createRGBA(111, 222, 333, 0.5)).to.equal('rgba(111,222,333,0.5)');
    });

    it('should remove alpha values from colors', function () {
      expect(canvas.getHSLFromHSLA(canvas.createHSLA(123, 40, 50, 0.5))).to.equal('hsl(123,40%,50%)');
      expect(canvas.getRGBFromRGBA(canvas.createRGBA(111, 222, 333, 0.5))).to.equal('rgb(111,222,333)');
    });

    it('should convert angles', function () {
      expect(canvas.getRadiansFromDegrees(0)).to.equal(0);
      expect(canvas.getRadiansFromDegrees(180)).to.equal(Math.PI);
      expect(canvas.getRadiansFromDegrees(360)).to.equal(Math.PI * 2);

      expect(canvas.getDegreesFromRadians(0)).to.equal(0);
      expect(canvas.getDegreesFromRadians(Math.PI)).to.equal(180);
      expect(canvas.getDegreesFromRadians(Math.PI * 2)).to.equal(360);
    });

    it('should convert fractions & percentages', function () {
      expect(canvas.getPercentFromFraction(0.75)).to.equal(75);
      expect(canvas.getFractionFromPercent(25)).to.equal(0.25);
    });

    it('should get fractions & percentages of the canvas size', function () {
      canvas.setSize(400, 200);

      expect(canvas.getPercentOfWidth(75)).to.equal(300);
      expect(canvas.getFractionOfWidth(0.25)).to.equal(100);

      expect(canvas.getPercentOfHeight(75)).to.equal(150);
      expect(canvas.getFractionOfHeight(0.25)).to.equal(50);
    });

    it('should return information about a pixel', function () {
      canvas.setSize(5, 5);

      expect(canvas.getPixelData(2, 2)).to.eql([0, 0, 0, 0]);
      expect(canvas.getPixelColor(2, 2)).to.equal('rgba(0,0,0,0)');
    });

    it('should calculate the distance between 2 points', function () {
      expect(canvas.getDistance()).to.be.NaN;
      expect(canvas.getDistance(0, 0, 0, 10)).to.equal(10);
      expect(canvas.getDistance(0, 0, 0, -10)).to.equal(10);
      expect(canvas.getDistance(0, 0, 10, 0)).to.equal(10);
      expect(canvas.getDistance(0, 3, 4, 0)).to.equal(5);
      expect(canvas.getDistance(4, 0, 0, 3)).to.equal(5);
      expect(canvas.getDistance(-4, 0, 0, -3)).to.equal(5);
    });

    it('should error when calculating angles with wrong arguments', function () {
      var anError = /Incorrect number of arguments/;

      expect(canvas.getAngle.bind(null, 0, 0, 0, 0)).not.to.throw(anError);
      expect(canvas.getAngle.bind(null, 0, 0, 0, 0, 0, 0)).not.to.throw(anError);

      expect(canvas.getAngle.bind(null)).to.throw(anError);
      expect(canvas.getAngle.bind(null, 0)).to.throw(anError);
      expect(canvas.getAngle.bind(null, 0, 0, 0)).to.throw(anError);
      expect(canvas.getAngle.bind(null, 0, 0, 0, 0, 0)).to.throw(anError);
      expect(canvas.getAngle.bind(null, 0, 0, 0, 0, 0, 0, 0, 0, 0)).to.throw(anError);
    });

    it('should calculate the angle between 2 points', function () {
      expect(canvas.getAngle(0, 0, 10, 0)).to.equal(0);
      expect(canvas.getAngle(0, 0, 0, 10)).to.equal(Math.PI * 0.5);
      expect(canvas.getAngle(0, 0, 0, -10)).to.equal(-Math.PI * 0.5);
      expect(canvas.getAngle(0, 0, 10, 10)).to.equal(Math.PI * 0.25);
      expect(canvas.getAngle(0, 0, 10, -10)).to.equal(-Math.PI * 0.25);
      expect(canvas.getAngle(0, 0, -10, 10)).to.equal(Math.PI * 0.75);
      expect(canvas.getAngle(0, 0, -10, -10)).to.equal(-Math.PI * 0.75);
    });

    it('should calculate the angle between 3 points', function () {
      expect(canvas.getAngle(0, 0, 10, 0, 20, 0)).to.equal(Math.PI);
      expect(canvas.getAngle(20, 0, 10, 0, 0, 0)).to.equal(Math.PI);
      expect(canvas.getAngle(0, 0, 10, 0, 10, 10)).to.equal(Math.PI * 0.5);
      expect(canvas.getAngle(0, 0, 10, 0, 10, -10)).to.equal(-Math.PI * 0.5);
      expect(canvas.getAngle(0, 0, 10, 0, 20, 10)).to.equal(Math.PI * 0.75);
      expect(canvas.getAngle(0, 0, 10, 0, 20, -10)).to.equal(-Math.PI * 0.75);
      expect(canvas.getAngle(0, 0, 10, 0, 0, 0)).to.equal(0);
      expect(canvas.getAngle(0, 0, -10, 10, -10, 0)).to.equal(Math.PI * 0.25);
      expect(canvas.getAngle(0, 0, -10, 10, 0, 10)).to.equal(-Math.PI * 0.25);
    });

  });

  describe('tap', function () {

    it('should allow a function to be run during a chain', function () {
      var result = false;

      expect(
        canvas
          .setFill('black')
          .tap(function () {
            result = true;
            this.setFill('red');
          })
          .getFill()
      ).to.equal('red');

      expect(result).to.be.true;
    });

    it('should error if no callback is provided', function () {
      var anError = /function/i;

      expect(canvas.tap).to.throw(anError);
      expect(canvas.tap.bind(null, 1)).to.throw(anError);
      expect(canvas.tap.bind(null, function () {})).not.to.throw(anError);
    });

  });

  describe('repeat', function () {

    it('should loop over the provided range', function () {
      var expected;
      var callback = spy(function () {});

      canvas.repeat(null, callback);
      expect(callback).not.to.have.been.called;
      callback.reset();

      canvas.repeat(0, null, callback);
      expect(callback).not.to.have.been.called;
      callback.reset();

      canvas.repeat(0, 1, null, callback);
      expect(callback).not.to.have.been.called;
      callback.reset();

      canvas.repeat(0, 0, 1, callback);
      expect(callback).not.to.have.been.called;
      callback.reset();

      expected = [0, 1, 2];
      canvas.repeat(3, callback);
      expect(callback).to.have.been.called.thrice;
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).to.eql([value]);
      });
      callback.reset();

      expected = [1, 2, 3];
      canvas.repeat(1, 4, callback);
      expect(callback).to.have.been.called.thrice;
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).to.eql([value]);
      });
      callback.reset();

      expected = [-2, -3, -4];
      canvas.repeat(-2, -5, callback);
      expect(callback).to.have.been.called.thrice;
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).to.eql([value]);
      });
      callback.reset();

      expected = [2, 4, 6];
      canvas.repeat(2, 8, 2, callback);
      expect(callback).to.have.been.called.thrice;
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).to.eql([value]);
      });
      callback.reset();

      expected = [10, 5, 0];
      canvas.repeat(10, -5, 5, callback);
      expect(callback).to.have.been.called.thrice;
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).to.eql([value]);
      });
      callback.reset();

      expected = [1, 3, 5];
      canvas.repeat(1, 6, 2, callback);
      expect(callback).to.have.been.called.thrice;
      each(expected, function (value, index) {
        expect(callback.getCall(index).args).to.eql([value]);
      });
      callback.reset();
    });

    it('should error if wrong arguments provided', function () {
      var anError = /arguments/i;

      expect(canvas.repeat).to.throw(anError);
      expect(canvas.repeat.bind(null, 0)).to.throw(anError);
      expect(canvas.repeat.bind(null, 0, 0, 0, 0, 0)).to.throw(anError);
    });

    it('should error if no callback is provided', function () {
      var anError = /function/i;

      expect(canvas.repeat.bind(null, 0, 1)).to.throw(anError);
      expect(canvas.repeat.bind(null, 0, 1, 1)).to.throw(anError);
      expect(canvas.repeat.bind(null, 0, 1, 1, 1)).to.throw(anError);
    });

  });

});
