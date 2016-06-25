'use strict';

var docs = require('../docs/docs');
var expect = require('chai').expect;
var sinon = require('sinon');
var stub = sinon.stub;
var utils = require('./helpers/utils');
var each = utils.each;
var any = utils.any;
var getContextStub = require('./helpers/get-context-stub');
var Canvas = require('../lib/index.js');

describe('docs', function () {

  var element = document.createElement('canvas');
  stub(element, 'getContext', getContextStub);
  var canvas = new Canvas(element);

  it('is a list of groups', function () {
    expect(docs.length).to.be.above(1);

    each(docs, function (value) {
      expect(value.name).to.exist;
      expect(value.methods).to.exist;
    });
  });

  it('should contain all of the canvasimo methods (or aliases)', function () {
    each(canvas, function (value, key) {
      var anyGroupContainsTheMethod = any(docs, function (group) {
        return any(group.methods, function (method) {
          return method.name === key || method.alias === key;
        });
      });

      expect(anyGroupContainsTheMethod).to.be.true;
    });
  });

});
