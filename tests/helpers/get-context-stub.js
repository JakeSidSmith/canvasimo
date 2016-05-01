'use strict';

(function () {

  var ctx = {
    imageSmoothingEnabled: true,
    webkitImageSmoothingEnabled: false,
    globalAlpha: 1, // number
    globalCompositeOperation: 'source-over', // string
    fillStyle: '#000000', // string
    strokeStyle: '#000000', // string
    lineWidth: 1, // number
    lineCap: 'butt', // string
    lineJoin: 'miter', // string
    lineDashOffset: 0, // number
    miterLimit: 10, // number
    shadowColor: 'rgba(0, 0, 0, 0)', // string
    shadowBlur: 0, // number
    shadowOffsetX: 0, // number
    shadowOffsetY: 0, // number
    font: '10px sans-serif', // string
    textAlign: 'start', // string
    textBaseline: 'alphabetic', // string
    getContextAttributes: function () {},
    getImageData: function () {},
    createLinearGradient: function () {},
    createRadialGradient: function () {},
    createPattern: function () {},
    createImageData: function () {},
    isPointInPath: function () {},
    isPointInStroke: function () {},
    measureText: function () {},
    getLineDash: function () {},
    save: function () {},
    restore: function () {},
    scale: function () {},
    rotate: function () {},
    translate: function () {},
    transform: function () {},
    setTransform: function () {},
    resetTransform: function () {},
    fill: function () {},
    stroke: function () {},
    drawFocusIfNeeded: function () {},
    clip: function () {},
    clearRect: function () {},
    moveTo: function () {},
    lineTo: function () {},
    quadraticCurveTo: function () {},
    bezierCurveTo: function () {},
    arcTo: function () {},
    beginPath: function () {},
    fillText: function () {},
    strokeText: function () {},
    drawImage: function () {},
    putImageData: function () {},
    closePath: function () {},
    rect: function () {},
    arc: function () {},
    ellipse: function () {},
    setLineDash: function () {},
    fillRect: function () {},
    strokeRect: function () {}
  };

  module.exports = function getContext (type) {
    if (type === '2d') {
      return ctx;
    }
    throw new Error('Context must be "2d"');
  };

})();
