/* global Canvasimo */

'use strict';

(function () {

  var element = document.getElementById('canvas');
  var parent = element.parentNode;
  var canvas = new Canvasimo(element);

  function draw () {
    canvas
      .fillText('Hello, World!', 20, 20, null, 'red');
  }

  function setCanvasSize () {
    canvas
      .setWidth(parent.clientWidth);

    draw();
  }

  window.addEventListener('resize', setCanvasSize);

  setCanvasSize();

})();
