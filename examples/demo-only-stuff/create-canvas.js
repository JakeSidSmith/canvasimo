'use strict';

(function () {

  function createCanvas () {
    var canvases = document.getElementsByTagName('canvas');
    var latestCanvas = canvases[canvases.length - 1];

    if (latestCanvas) {
      latestCanvas.id = '';
    }

    var scripts = document.getElementsByTagName('script');
    var latestScript = scripts[scripts.length - 1];

    var newCanvas = document.createElement('canvas');
    newCanvas.id = 'canvas';

    latestScript.parentNode.insertBefore(newCanvas, latestScript);

    return new Canvasimo(newCanvas);
  }

  window.createCanvas = createCanvas;

})();
