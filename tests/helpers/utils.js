'use strict';

(function () {

  var each = function (obj, fn) {
    if (Array.isArray(obj) || typeof obj === 'string') {
      for (var i = 0; i < obj.length; i += 1) {
        fn(obj[i], i);
      }
    } else if (typeof obj === 'object') {
      for (var key in obj) {
        fn(obj[key], key);
      }
    }
  };

  var any = function (obj, fn) {
    if (Array.isArray(obj) || typeof obj === 'string') {
      for (var i = 0; i < obj.length; i += 1) {
        if (fn(obj[i], i)) {
          return true;
        }
      }
    } else if (typeof obj === 'object') {
      for (var key in obj) {
        if (fn(obj[key], key)) {
          return true;
        }
      }
    }

    return false;
  };

  module.exports = {
    each: each,
    any: any
  };

})();
