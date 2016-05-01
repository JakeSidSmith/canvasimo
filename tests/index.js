'use strict';

var expect = require('chai').expect;
var stub = require('sinon').stub;
var Canvas = require('../lib/index.js');
var getContextStub = require('./helpers/get-context-stub');

describe('sensible canvas', function () {

  var canvas, element;

  function ImageData (x, y) {
    this.width = x;
    this.height = y;
    this.data = new Array(x * y * 4);
  }

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
    getFont: {value: '10px sans-serif', type: 'string'},
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
    isPointInPath: [0, 0]
  };

  var isGetter = /^(get|create|is)/i;

  it('should return an interface', function () {
    element = document.createElement('canvas');

    stub(element, 'getContext', getContextStub);

    canvas = new Canvas(element);

    expect(canvas).to.exist;
  });

  describe('property getters', function () {

    it('should return the correct property values from the context', function () {
      for (var key in getters) {
        var result = canvas[key]();
        expect(result).to.equal(getters[key].value);
        expect(typeof result).to.equal(getters[key].type);
      }
    });

  });

  describe('context getters', function () {

    it('should return the actual canvas context', function () {
      expect(canvas.getContext()).to.equal(element.getContext('2d'));
    });

    it('should return the context type', function () {
      expect(canvas.getContextType()).to.equal('2d');
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
      expect(canvas.getImageSmoothing()).to.be.true;
    });

    it('should set the first image smoothing value', function () {
      canvas.setImageSmoothing(false);

      expect(canvas.getImageSmoothing()).to.be.false;
    });

    it('should return null if no image smoothing keys present', function () {
      var context = element.getContext('2d');
      delete context.imageSmoothingEnabled;
      delete context.webkitImageSmoothingEnabled;

      expect(canvas.getImageSmoothing()).to.be.null;
    });

    it('should not set a value if no image smoothing keys present', function () {
      canvas.setImageSmoothing(true);

      expect(canvas.getImageSmoothing()).to.be.null;
    });

  });

  describe('actions and setters', function () {

    it('should return the canvas', function () {
      for (var key in canvas) {
        if (!isGetter.exec(key)) {
          expect(canvas[key].apply(null, argumentMap[key])).to.equal(canvas);
        }
      }
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

  });

});
