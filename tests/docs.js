'use strict';

var docs = require('../docs/src/js/docs');
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

  it('should contain all of the canvasimo methods and aliases', function () {
    each(canvas, function (value, key) {
      var anyGroupContainsTheMethod = any(docs, function (group) {
        return any(group.methods, function (method) {
          return method.name === key || method.alias === key;
        });
      });

      expect(anyGroupContainsTheMethod).to.be.true;
    });
  });

  it('should have descriptions for every group', function () {
    var totalGroups = 0;
    var documentedGroups = 0;
    var firstUndocumentedGroup;

    each(docs, function (group) {
      totalGroups += 1;

      if (group.description) {
        documentedGroups += 1;
      } else if (!firstUndocumentedGroup) {
        firstUndocumentedGroup = group.name;
      }
    });

    console.log(documentedGroups + ' of ' + totalGroups + ' groups have descriptions');

    if (firstUndocumentedGroup) {
      throw new Error(firstUndocumentedGroup + ' group has no description');
    }
  });

  it('should have descriptions for every method', function () {
    var totalMethods = 0;
    var documentedMethods = 0;
    var firstUndocumentedMethod;

    each(docs, function (group) {
      each(group.methods, function (method) {
        totalMethods += 1;

        if (method.description) {
          documentedMethods += 1;
        } else if (!firstUndocumentedMethod) {
          firstUndocumentedMethod = method.name;
        }
      });
    });

    console.log(documentedMethods + ' of ' + totalMethods + ' methods have descriptions');

    if (firstUndocumentedMethod) {
      throw new Error(firstUndocumentedMethod + ' method has no description');
    }
  });

  it('should have arguments or returns for every method', function () {
    var exceptions = ['clearCanvas'];
    var totalMethods = 0;
    var documentedMethods = 0;
    var firstUndocumentedMethod;

    each(docs, function (group) {
      each(group.methods, function (method) {
        totalMethods += 1;

        if (exceptions.indexOf(method.name) >= 0) {
          return;
        }

        if (method.arguments || method.returns) {
          documentedMethods += 1;
        } else if (!firstUndocumentedMethod) {
          firstUndocumentedMethod = method.name;
        }
      });
    });

    console.log(documentedMethods + ' of ' + totalMethods + ' methods have arguments or returns');

    if (firstUndocumentedMethod) {
      throw new Error(firstUndocumentedMethod + ' method has no arguments or returns');
    }
  });

});
