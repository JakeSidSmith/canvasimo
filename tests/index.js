'use strict';

var expect = require('chai').expect;
var stub = require('sinon').stub;
var Canvas = require('../lib/index.js');
var getContextStub = require('./helpers/get-context-stub');

describe('sensible canvas', function () {

  var canvas, element;

  function ImageData (x, y) {
    return {
      width: x,
      height: y,
      data: new Array(x * y * 4)
    };
  }

  var getters = {
    getOpacity: {value: 1, type: 'number'},
    getGlobalCompositeOperation: {value: 'source-over', type: 'string'},
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

  describe('image smoothing', function () {

    it('should return the first image smoothing value', function () {
      expect(canvas.getImageSmoothing()).to.be.true;
    });

    it('should set the first image smoothing value', function () {
      canvas.setImageSmoothing(false);

      expect(canvas.getImageSmoothing()).to.be.false;
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

  describe('actions and setters', function () {

    it('should return the canvas', function () {
      for (var key in canvas) {
        if (!isGetter.exec(key)) {
          expect(canvas[key].apply(null, argumentMap[key])).to.equal(canvas);
        }
      }
    });

  });

});
