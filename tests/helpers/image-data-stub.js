'use strict';

(function () {

  function ImageData (width, height) {
    var pixelData = [0, 0, 0, 0];

    this.width = width;
    this.height = height;
    this.data = [];

    for (var i = 0; i < width * height; i += 1) {
      this.data = this.data.concat(pixelData);
    }
  }

  module.exports = ImageData;

})();
