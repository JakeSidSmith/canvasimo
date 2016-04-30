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

  it('should return an interface', function () {
    element = document.createElement('canvas');
    stub(element, 'getContext', getContextStub);
    canvas = new Canvas(element);

    expect(canvas).to.exist;
  });

  describe('interface', function () {

    it('should return itself for every method except getters', function () {
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

      var isGetter = /^(to|get|create|is)/i;

      for (var key in canvas) {
        if (!isGetter.exec(key)) {
          expect(canvas[key].apply(null, argumentMap[key])).to.equal(canvas);
        }
      }
    });

  });

});
