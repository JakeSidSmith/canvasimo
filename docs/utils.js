'use strict';

(function () {

  var vendorPrefixes = ['-webkit', '-moz', '-ms', '-o', ''];

  function each (obj, fn) {
    var result;

    if (Array.isArray(obj) || typeof obj === 'string') {
      for (var i = 0; i < obj.length; i += 1) {
        result = fn(obj[i], i);

        if (result) {
          return result;
        }
      }
    } else if (typeof obj === 'object') {
      for (var key in obj) {
        result = fn(obj[key], key);

        if (result) {
          return result;
        }
      }
    }
  }

  function any (obj, fn) {
    var returned = each(obj, function (value, key) {
      return fn(value, key);
    });

    return returned ? true : false;
  }

  function toSpinalCase (str) {
    if (!str) {
      return '';
    }

    return str.replace(/([a-z])([A-Z])/g, function (whole, lowerCase, upperCase) {
      return lowerCase + '-' + upperCase;
    }).toLowerCase();
  }

  function createStyles (obj) {
    var style = '';

    each(obj, function (value, key) {
      if (key.indexOf('webkit') === 0) {
        each(vendorPrefixes, function (prefix) {
          style += toSpinalCase(key.replace(/^webkit/, prefix)) + ':' + value + ';';
        });
      } else {
        style += toSpinalCase(key) + ':' + value + ';';
      }
    });

    return style;
  }

  function createElement () {
    var children = Array.prototype.slice.call(arguments);
    var type = children.shift();
    var props = children.shift();

    var element = document.createElement(type);

    each(props, function (value, key) {
      switch (key) {
        case 'className':
          element.setAttribute('class', value);
          break;
        case 'style':
          element.setAttribute(key, createStyles(value));
          break;
        default:
          element.setAttribute(toSpinalCase(key), value);
          break;
      }
    });

    return element;
  }

  module.exports = {
    each: each,
    any: any,
    toSpinalCase: toSpinalCase,
    createStyles: createStyles,
    createElement: createElement
  };

})();
