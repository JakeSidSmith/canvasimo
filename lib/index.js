'use strict';

(function () {

  var propertyMap = {
    globalAlpha: 'opacity',
    globalCompositeOperation: 'globalCompositeOperation',
    fillStyle: 'fill',
    strokeStyle: 'stroke',
    lineWidth: 'strokeWidth',
    lineCap: 'strokeCap',
    lineJoin: 'strokeJoin',
    lineDashOffset: 'strokeDashOffset',
    miterLimit: 'miterLimit',
    shadowColor: 'shadowColor',
    shadowBlur: 'shadowBlur',
    shadowOffsetX: 'shadowOffsetX',
    shadowOffsetY: 'shadowOffsetY',
    font: 'font',
    textAlign: 'textAlign',
    textBaseline: 'textBaseline'
  };

  var imageSmoothingKeys = [
    'imageSmoothingEnabled',
    'msImageSmoothingEnabled',
    'mozImageSmoothingEnabled',
    'webkitImageSmoothingEnabled'
  ];

  function titleCase (text) {
    return text.charAt(0).toUpperCase() + text.substring(1);
  }

  function Canvas (input) {
    var element = input;
    var ctx = element.getContext('2d');

    // Attribute getters & setters
    this.setWidth = function (value) {
      element.setAttribute('width', parseInt(value, 10));
      return this;
    }.bind(this);

    this.setHeight = function (value) {
      element.setAttribute('height', parseInt(value, 10));
      return this;
    }.bind(this);

    this.getWidth = function () {
      return parseInt(element.getAttribute('width'), 10);
    }.bind(this);

    this.getHeight = function () {
      return parseInt(element.getAttribute('height'), 10);
    }.bind(this);

    this.setSize = function (width, height) {
      this.setWidth(width);
      this.setHeight(height);
      return this;
    }.bind(this);

    this.getSize = function () {
      return {
        width: this.getWidth(),
        height: this.getHeight()
      };
    }.bind(this);

    // Canvas basic getters and setters
    function setCanvasProperty (attribute, value) {
      ctx[attribute] = value;
      return this;
    };

    function getCanvasProperty (attribute) {
      return ctx[attribute];
    };

    // Map all properties except image smoothing
    for (var key in propertyMap) {
      var newKey = titleCase(propertyMap[key]);

      this['set' + newKey] = setCanvasProperty.bind(this, key);
      this['get' + newKey] = getCanvasProperty.bind(this, key);
    }

    // Image smoothing
    this.setImageSmoothing = function (value) {
      for (var i = 0; i < imageSmoothingKeys.length; i += 1) {
        if (imageSmoothingKeys[i] in ctx) {
          ctx[imageSmoothingKeys[i]] = value;
          return this;
        }
      }
      return this;
    }.bind(this);

    // Canvas basic action
    function canvasAction (fn) {
      ctx[fn].apply(ctx, Array.prototype.slice.call(arguments, 1));
      return this;
    };

    // Standard actions
    this.save = canvasAction.bind(this, 'save');
    this.restore = canvasAction.bind(this, 'restore');
    this.scale = canvasAction.bind(this, 'scale');
    this.rotate = canvasAction.bind(this, 'rotate');
    this.translate = canvasAction.bind(this, 'translate');
    this.transform = canvasAction.bind(this, 'transform');
    this.setTransform = canvasAction.bind(this, 'setTransform');
    this.resetTransform = canvasAction.bind(this, 'resetTransform');
    this.fill = canvasAction.bind(this, 'fill');
    this.stroke = canvasAction.bind(this, 'stroke');
    this.drawFocusIfNeeded = canvasAction.bind(this, 'drawFocusIfNeeded');
    this.clip = canvasAction.bind(this, 'clip');
    this.clearRect = canvasAction.bind(this, 'clearRect');
    this.moveTo = canvasAction.bind(this, 'moveTo');
    this.lineTo = canvasAction.bind(this, 'lineTo');
    this.quadraticCurveTo = canvasAction.bind(this, 'quadraticCurveTo');
    this.bezierCurveTo = canvasAction.bind(this, 'bezierCurveTo');
    this.arcTo = canvasAction.bind(this, 'arcTo');
    this.beginPath = canvasAction.bind(this, 'beginPath');
    this.fillText = canvasAction.bind(this, 'fillText');
    this.strokeText = canvasAction.bind(this, 'strokeText');
    this.drawImage = canvasAction.bind(this, 'drawImage');
    this.putImageData = canvasAction.bind(this, 'putImageData');

    // Changed to end path to match begin path
    this.endPath = canvasAction.bind(this, 'closePath');
    // Changed to plot to match plotters
    this.plotRect = canvasAction.bind(this, 'rect');
    this.plotArc = canvasAction.bind(this, 'arc');
    this.plotEllipse = canvasAction.bind(this, 'ellipse');
    // Changed to stroke to match other stroke functions
    this.setStrokeDash = canvasAction.bind(this, 'setLineDash');

    // Standard getters
    this.getContextAttributes = ctx.getContextAttributes.bind(ctx);
    this.getImageData = ctx.getImageData.bind(ctx);

    // Standard creators
    this.createLinearGradient = ctx.createLinearGradient.bind(ctx);
    this.createRadialGradient = ctx.createRadialGradient.bind(ctx);
    this.createPattern = ctx.createPattern.bind(ctx);
    this.createImageData = ctx.createImageData.bind(ctx);

    // Standard checkers
    this.isPointInPath = ctx.isPointInPath.bind(ctx);
    this.isPointInStroke = ctx.isPointInStroke.bind(ctx);

    // Standard measure text
    this.getTextSize = ctx.measureText.bind(ctx);

    // Changed to stroke to match other stroke functions
    this.getStrokeDash = ctx.getLineDash.bind(ctx);

    // Additional actions
    this.clearCanvas = function () {
      return this.clearRect(0, 0, this.getWidth(), this.getHeight());
    }.bind(this);

    this.fillCanvas = function () {
      return this.fillRect(0, 0, this.getWidth(), this.getHeight());
    }.bind(this);

    this.plotLine = function (x1, y1, x2, y2) {
      return this
        .moveTo(x1, y1)
        .lineTo(x2, y2);
    }.bind(this);

    this.strokeLine = function (x1, y1, x2, y2, color) {
      return this
        .beginPath()
        .moveTo(x1, y1)
        .lineTo(x2, y2)
        .endPath()
        .setStroke(color)
        .stroke();
    }.bind(this);

    this.fillRect = function (x, y, width, height, color) {
      this.setFill(color);
      ctx.fillRect(x, y, width, height);
      return this;
    }.bind(this);

    this.strokeRect = function (x, y, width, height, color) {
      this.setStroke(color);
      ctx.strokeRect(x, y, width, height);
      return this;
    }.bind(this);

    this.plotPoint = function (x, y) {
      return this.plotRect(x, y, 1, 1);
    }.bind(this);

    this.strokePoint = function (x, y) {
      return this.fillRect(x, y, 1, 1);
    }.bind(this);

    // Helper funcitons
    this.toRadians = function (degrees) {
      return degrees * Math.PI / 180;
    }.bind(this);

    this.toDegrees = function (radians) {
      return radians * 180 / Math.PI;
    }.bind(this);

    this.toPercent = function (fraction) {
      return (fraction * 100);
    }.bind(this);

    this.toFraction = function (percent) {
      return (percent / 100);
    }.bind(this);

    this.createHSL = function (h, s, l) {
      return 'rgb(' + h + ',' + s + '%,' + l + '%)';
    }.bind(this);

    this.createHSLA = function (h, s, l, a) {
      return 'rgb(' + h + ',' + s + '%,' + l + '%,' + a + ')';
    }.bind(this);

    this.createRGB = function (r, g, b) {
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }.bind(this);

    this.createRGBA = function (r, g, b, a) {
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }.bind(this);

    this.getRGBFromRGBA = this.getHSLFromHSLA = function (color) {
      var lastCommaIndex = color.lastIndexOf(',');
      return color.substring(0, lastCommaIndex) + ')';
    }.bind(this);

    this.getPercentOfWidth = function (percent) {
      return this.getWidth() / 100 * percent;
    }.bind(this);

    this.getFractionOfWidth = function (fraction) {
      return this.getWidth() * fraction;
    }.bind(this);

    this.getPercentOfHeight = function (percent) {
      return this.getHeight() / 100 * percent;
    }.bind(this);

    this.getFractionOfHeight = function (fraction) {
      return this.getHeight() * fraction;
    }.bind(this);

    this.getPixelColor = function (x, y) {
      var data = this.getImageData(x, y, 1, 1).data;
      return this.createRGBA(data[0], data[1], data[2], data[3]);
    }.bind(this);
  }

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this || window;

  // Export for commonjs / browserify
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Canvas;
    }
    exports.Canvas = Canvas;
  } else if (typeof root !== 'undefined') {
    // Add to root object
    root.Canvas = Canvas;
  }

  // Define for requirejs
  if (root && typeof root.define === 'function' && root.define.amd) {
    root.define(function () {
      return Canvas;
    });
  }

})();
