'use strict';

(function () {

  module.exports = function getContext (type) {
    if (type === '2d') {
      return {
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
        strokeRect: function () {},
        imageSmoothingEnabled: true
      };
    }
    throw new Error('Context must be "2d"');
  };

})();
