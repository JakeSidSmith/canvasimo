'use strict';

(function () {

  var propertyMap = {
    globalAlpha: 'opacity',
    globalCompositeOperation: 'compositeOperation',
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
    textAlign: 'textAlign',
    textBaseline: 'textBaseline'
  };

  var imageSmoothingKeys = [
    'imageSmoothingEnabled',
    'msImageSmoothingEnabled',
    'mozImageSmoothingEnabled',
    'webkitImageSmoothingEnabled'
  ];

  var isNormal = /^(normal)$/i;
  var isFontStyle = /^(italic|oblique)$/i;
  var isFontVariant = /^(small-caps)$/i;
  var isFontWeight = /^(bold|bolder|lighter|\d00)$/i;
  var isSpecialFont = /^(caption|icon|menu|message-box|small-caption|status-bar)$/i;
  var leadingAndTrailingSpace = /^\s+|\s+$/g;
  var oneOrMoreSpaces = /\s+/g;
  var defaultFont = ['normal', 'normal', 'normal', '10px', 'sans-serif'];

  var contextType = '2d';

  function getFontParts (input) {
    if (!input) {
      return defaultFont;
    }

    var font = input.replace(leadingAndTrailingSpace, '');

    if (isSpecialFont.exec(font)) {
      return [font];
    }

    var matchFontSize = /(^|\s)+\d+(px|%)\s+/i.exec(font);

    if (!matchFontSize) {
      return defaultFont;
    }

    var numberOfLeadingSpaces = matchFontSize[1].length;
    var indexOfFontSize = matchFontSize.index;

    var requiredParts = font.substring(indexOfFontSize + numberOfLeadingSpaces).split(oneOrMoreSpaces);

    if (requiredParts.length < 2) {
      return defaultFont;
    }

    var optional = font.substring(0, indexOfFontSize);
    var optionalParts = optional && optional.split(oneOrMoreSpaces);

    var fontStyle, fontVariant, fontWeight;

    while (optionalParts.length) {
      if (isFontStyle.exec(optionalParts[0])) {
        fontStyle = optionalParts.splice(0, 1)[0];
      } else if (isFontVariant.exec(optionalParts[0])) {
        fontVariant = optionalParts.splice(0, 1)[0];
      } else if (isFontWeight.exec(optionalParts[0])) {
        fontWeight = optionalParts.splice(0, 1)[0];
      } else if (isNormal.exec(optionalParts[0])) {
        optionalParts.splice(0, 1);
      } else {
        return defaultFont;
      }
    }

    return [
      fontStyle || defaultFont[0],
      fontVariant || defaultFont[1],
      fontWeight || defaultFont[2],
      requiredParts.splice(0, 1)[0] || defaultFont[3],
      requiredParts.join(' ') || defaultFont[4]
    ];
  }

  function formatFont (input) {
    return getFontParts(input).join(' ');
  }

  function titleCase (text) {
    return text.charAt(0).toUpperCase() + text.substring(1);
  }

  function Canvas (input) {
    var element = input;
    var ctx = element.getContext(contextType);

    ctx.font = formatFont(ctx.font);

    this.getContext = function () {
      return ctx;
    };

    this.getContextType = function () {
      return contextType;
    };

    this.getDataURL = function () {
      return element.toDataURL();
    };

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
      return this
        .setWidth(width)
        .setHeight(height);
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

    this.getImageSmoothing = function () {
      for (var i = 0; i < imageSmoothingKeys.length; i += 1) {
        if (imageSmoothingKeys[i] in ctx) {
          return ctx[imageSmoothingKeys[i]];
        }
      }
      return null;
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

    // Fonts
    this.setFont = function (font) {
      ctx.font = formatFont(font);
      return this;
    }.bind(this);

    this.getFont = function () {
      return formatFont(ctx.font);
    }.bind(this);

    // Font property setters
    this.setFontStyle = function (style) {
      var parts = getFontParts(ctx.font);
      if (parts.length < 5) {
        return this.setFont(null);
      }
      parts[0] = style || defaultFont[0];
      ctx.font = parts.join(' ');
      return this;
    }.bind(this);

    this.setFontVariant = function (variant) {
      var parts = getFontParts(ctx.font);
      if (parts.length < 5) {
        return this.setFont(null);
      }
      parts[1] = variant || defaultFont[1];
      ctx.font = parts.join(' ');
      return this;
    }.bind(this);

    this.setFontWeight = function (weight) {
      var parts = getFontParts(ctx.font);
      if (parts.length < 5) {
        return this.setFont(null);
      }
      parts[2] = weight || defaultFont[2];
      ctx.font = parts.join(' ');
      return this;
    }.bind(this);

    this.setFontSize = function (size) {
      var parts = getFontParts(ctx.font);
      if (parts.length < 5) {
        return this.setFont(null);
      }
      parts[3] = (typeof size === 'number' ? size + 'px' : size) || defaultFont[3];
      ctx.font = parts.join(' ');
      return this;
    }.bind(this);

    this.setFontFamily = function (family) {
      var parts = getFontParts(ctx.font);
      if (parts.length < 5) {
        return this.setFont(null);
      }
      parts[4] = family || defaultFont[4];
      ctx.font = parts.join(' ');
      return this;
    }.bind(this);

    // Font property getters
    this.getFontStyle = function () {
      var parts = getFontParts(ctx.font);
      if (parts.length < 5) {
        return null;
      }
      return parts[0];
    }.bind(this);

    this.getFontVariant = function () {
      var parts = getFontParts(ctx.font);
      if (parts.length < 5) {
        return null;
      }
      return parts[1];
    }.bind(this);

    this.getFontWeight = function () {
      var parts = getFontParts(ctx.font);
      if (parts.length < 5) {
        return null;
      }
      return parts[2];
    }.bind(this);

    this.getFontSize = function () {
      var parts = getFontParts(ctx.font);
      if (parts.length < 5) {
        return null;
      }
      return parseFloat(parts[3]);
    }.bind(this);

    this.getFontFamily = function () {
      var parts = getFontParts(ctx.font);
      if (parts.length < 5) {
        return null;
      }
      return parts[4];
    }.bind(this);

    // Helper methods
    this.createHSL = function (h, s, l) {
      return 'hsl(' + h + ',' + s + '%,' + l + '%)';
    }.bind(this);

    this.createHSLA = function (h, s, l, a) {
      return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
    }.bind(this);

    this.createRGB = function (r, g, b) {
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }.bind(this);

    this.createRGBA = function (r, g, b, a) {
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }.bind(this);

    this.getRGBFromRGBA = this.getHSLFromHSLA = function (color) {
      var lastCommaIndex = color.lastIndexOf(',');
      return color.replace(/^(\w{3})a/, '$1').substring(0, lastCommaIndex - 1) + ')';
    }.bind(this);

    this.getRadiansFromDegrees = function (degrees) {
      return degrees * Math.PI / 180;
    }.bind(this);

    this.getDegreesFromRadians = function (radians) {
      return radians * 180 / Math.PI;
    }.bind(this);

    this.getPercentFromFraction = function (fraction) {
      return (fraction * 100);
    }.bind(this);

    this.getFractionFromPercent = function (percent) {
      return (percent / 100);
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

    this.getPixelData = function (x, y) {
      return this.getImageData(x, y, 1, 1).data;
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
