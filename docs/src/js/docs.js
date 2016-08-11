'use strict';

(function () {

  var types = {
    number: 'Number',
    boolean: 'Boolean',
    string: 'String',
    object: 'Object',
    array: 'Array',
    context: 'RenderingContext',
    htmlElement: 'HTMLElement'
  };

  module.exports = [
    {
      name: 'Canvas element',
      methods: [
        {
          name: 'getCanvas',
          alias: 'getElement',
          description: 'Get the canvas element',
          returns: {
            name: 'element',
            type: types.htmlElement
          }
        },
        {
          name: 'setSize',
          description: 'Set the canvas dimensions',
          arguments: [
            {
              name: 'width',
              type: types.number
            },
            {
              name: 'height',
              type: types.number
            }
          ]
        },
        {
          name: 'getSize',
          description: 'Get the canvas dimensions',
          returns: {
            name: '{width, height}',
            type: types.object
          }
        },
        {
          name: 'setWidth',
          description: 'Set the canvas width',
          arguments: [
            {
              name: 'width',
              type: types.number
            }
          ]
        },
        {
          name: 'getWidth',
          description: 'Get the canvas width',
          returns: {
            name: 'width',
            type: types.number
          }
        },
        {
          name: 'setHeight',
          description: 'Set the canvas height',
          arguments: [
            {
              name: 'height',
              type: types.number
            }
          ]
        },
        {
          name: 'getHeight',
          description: 'Get the canvas height',
          returns: {
            name: 'height',
            type: types.number
          }
        }
      ]
    },
    {
      name: 'Context',
      methods: [
        {
          name: 'getContext',
          description: 'Get the standard canvas context (used for drawing)',
          arguments: [
            {
              name: 'contextType',
              type: types.string
            },
            {
              name: 'contextAttributes',
              type: types.object,
              optional: true
            }
          ],
          returns: {
            name: 'context',
            type: types.context
          }
        },
        {
          name: 'getCurrentContext',
          description: 'Get canvas context used by Canvasimo (2d)',
          returns: {
            name: 'context',
            type: types.context
          }
        },
        {
          name: 'getCurrentContextType',
          description: 'Get the context type used by Canvasimo (2d, webgl, etc)',
          returns: {
            name: 'contextType',
            type: types.string
          }
        },
        {
          name: 'getContextAttributes',
          description: 'Get the context attributes used',
          returns: {
            name: 'contextAttributes',
            type: types.object
          }
        }
      ]
    },
    {
      name: 'Solid Shapes',
      methods: [
        {
          name: 'plotRect',
          alias: 'rect',
          description: ''
        },
        {
          name: 'strokeRect',
          description: ''
        },
        {
          name: 'fillRect',
          description: ''
        },
        {
          name: 'plotRoundedRect',
          description: ''
        },
        {
          name: 'strokeRoundedRect',
          description: ''
        },
        {
          name: 'fillRoundedRect',
          description: ''
        },
        {
          name: 'plotCircle',
          description: ''
        },
        {
          name: 'strokeCircle',
          description: ''
        },
        {
          name: 'fillCircle',
          description: ''
        },
        {
          name: 'plotPoly',
          description: ''
        },
        {
          name: 'strokePoly',
          description: ''
        },
        {
          name: 'fillPoly',
          description: ''
        },
        {
          name: 'plotStar',
          description: ''
        },
        {
          name: 'strokeStar',
          description: ''
        },
        {
          name: 'fillStar',
          description: ''
        },
        {
          name: 'plotBurst',
          description: ''
        },
        {
          name: 'strokeBurst',
          description: ''
        },
        {
          name: 'fillBurst',
          description: ''
        },
        {
          name: 'plotPixel',
          description: ''
        },
        {
          name: 'strokePixel',
          description: ''
        },
        {
          name: 'fillPixel',
          description: ''
        },
        {
          name: 'plotClosedPath',
          description: ''
        },
        {
          name: 'strokeClosedPath',
          description: ''
        },
        {
          name: 'fillClosedPath',
          description: ''
        }
      ]
    },
    {
      name: 'Open Shapes',
      methods: [
        {
          name: 'plotLine',
          description: ''
        },
        {
          name: 'strokeLine',
          description: ''
        },
        {
          name: 'plotLength',
          description: ''
        },
        {
          name: 'strokeLength',
          description: ''
        },
        {
          name: 'plotPath',
          description: ''
        },
        {
          name: 'strokePath',
          description: ''
        },
        {
          name: 'fillPath',
          description: ''
        }
      ]
    },
    {
      name: 'Paths',
      methods: [
        {
          name: 'plotArc',
          alias: 'arc',
          description: ''
        },
        {
          name: 'strokeArc',
          description: ''
        },
        {
          name: 'fillArc',
          description: ''
        },
        {
          name: 'plotEllipse',
          alias: 'ellipse',
          description: ''
        },
        {
          name: 'strokeEllipse',
          description: ''
        },
        {
          name: 'fillEllipse',
          description: ''
        }
      ]
    },
    {
      name: 'Text',
      methods: [
        {
          name: 'strokeText',
          description: ''
        },
        {
          name: 'fillText',
          description: ''
        }
      ]
    },
    {
      name: 'Fonts',
      methods: [
        {
          name: 'setFont',
          description: ''
        },
        {
          name: 'getFont',
          description: ''
        },
        {
          name: 'setFontFamily',
          description: ''
        },
        {
          name: 'getFontFamily',
          description: ''
        },
        {
          name: 'setFontSize',
          description: ''
        },
        {
          name: 'getFontSize',
          description: ''
        },
        {
          name: 'setFontStyle',
          description: ''
        },
        {
          name: 'getFontStyle',
          description: ''
        },
        {
          name: 'setFontVariant',
          description: ''
        },
        {
          name: 'getFontVariant',
          description: ''
        },
        {
          name: 'setFontWeight',
          description: ''
        },
        {
          name: 'getFontWeight',
          description: ''
        }
      ]
    },
    {
      name: 'Text Alignment',
      methods: [
        {
          name: 'setTextAlign',
          description: ''
        },
        {
          name: 'getTextAlign',
          description: ''
        },
        {
          name: 'setTextBaseline',
          description: ''
        },
        {
          name: 'getTextBaseline',
          description: ''
        }
      ]
    },
    {
      name: 'Measure Text',
      methods: [
        {
          name: 'getTextSize',
          alias: 'measureText',
          description: ''
        }
      ]
    },
    {
      name: 'Stroke Styles',
      methods: [
        {
          name: 'stroke',
          description: ''
        },
        {
          name: 'setStroke',
          alias: 'setStrokeStyle',
          description: ''
        },
        {
          name: 'getStroke',
          alias: 'getStrokeStyle',
          description: ''
        },
        {
          name: 'setStrokeCap',
          alias: 'setLineCap',
          description: ''
        },
        {
          name: 'getStrokeCap',
          alias: 'getLineCap',
          description: ''
        },
        {
          name: 'setStrokeDash',
          alias: 'setLineDash',
          description: ''
        },
        {
          name: 'getStrokeDash',
          alias: 'getLineDash',
          description: ''
        },
        {
          name: 'setStrokeDashOffset',
          alias: 'setLineDashOffset',
          description: ''
        },
        {
          name: 'getStrokeDashOffset',
          alias: 'getLineDashOffset',
          description: ''
        },
        {
          name: 'setStrokeJoin',
          alias: 'setLineJoin',
          description: ''
        },
        {
          name: 'getStrokeJoin',
          alias: 'getLineJoin',
          description: ''
        },
        {
          name: 'setStrokeWidth',
          alias: 'setLineWidth',
          description: ''
        },
        {
          name: 'getStrokeWidth',
          alias: 'getLineWidth',
          description: ''
        },
        {
          name: 'setMiterLimit',
          description: ''
        },
        {
          name: 'getMiterLimit',
          description: ''
        }
      ]
    },
    {
      name: 'Fill styles',
      methods: [
        {
          name: 'fill',
          description: ''
        },
        {
          name: 'fillCanvas',
          description: ''
        },
        {
          name: 'clearRect',
          description: ''
        },
        {
          name: 'clearCanvas',
          description: ''
        },
        {
          name: 'setFill',
          alias: 'setFillStyle',
          description: ''
        },
        {
          name: 'getFill',
          alias: 'getFillStyle',
          description: ''
        },
        {
          name: 'createLinearGradient',
          description: ''
        },
        {
          name: 'createRadialGradient',
          description: ''
        },
        {
          name: 'createPattern',
          description: ''
        },
        {
          name: 'drawImage',
          description: ''
        }
      ]
    },
    {
      name: 'Image Data',
      methods: [
        {
          name: 'getDataURL',
          description: ''
        },
        {
          name: 'createImageData',
          description: ''
        },
        {
          name: 'getImageData',
          description: ''
        },
        {
          name: 'putImageData',
          description: ''
        },
        {
          name: 'getPixelData',
          description: ''
        },
        {
          name: 'getPixelColor',
          description: ''
        }
      ]
    },
    {
      name: 'Color Helpers',
      methods: [
        {
          name: 'createHSL',
          description: ''
        },
        {
          name: 'createHSLA',
          description: ''
        },
        {
          name: 'createRGB',
          description: ''
        },
        {
          name: 'createRGBA',
          description: ''
        },
        {
          name: 'getHSLFromHSLA',
          description: ''
        },
        {
          name: 'getRGBFromRGBA',
          description: ''
        }
      ]
    },
    {
      name: 'Converting Sizes',
      methods: [
        {
          name: 'getFractionFromPercent',
          description: ''
        },
        {
          name: 'getPercentFromFraction',
          description: ''
        },
        {
          name: 'getFractionOfWidth',
          description: ''
        },
        {
          name: 'getFractionOfHeight',
          description: ''
        },
        {
          name: 'getPercentOfWidth',
          description: ''
        },
        {
          name: 'getPercentOfHeight',
          description: ''
        },
        {
          name: 'getDistance',
          description: ''
        }
      ]
    },
    {
      name: 'Converting Angles',
      methods: [
        {
          name: 'getRadiansFromDegrees',
          description: ''
        },
        {
          name: 'getDegreesFromRadians',
          description: ''
        },
        {
          name: 'getAngle',
          description: ''
        }
      ]
    },
    {
      name: 'Path Plotting',
      methods: [
        {
          name: 'beginPath',
          description: ''
        },
        {
          name: 'closePath',
          description: ''
        },
        {
          name: 'moveTo',
          description: ''
        },
        {
          name: 'lineTo',
          description: ''
        },
        {
          name: 'arcTo',
          description: ''
        },
        {
          name: 'bezierCurveTo',
          description: ''
        },
        {
          name: 'quadraticCurveTo',
          description: ''
        }
      ]
    },
    {
      name: 'Canvas State',
      methods: [
        {
          name: 'save',
          description: ''
        },
        {
          name: 'restore',
          description: ''
        },
        {
          name: 'rotate',
          description: ''
        },
        {
          name: 'scale',
          description: ''
        },
        {
          name: 'translate',
          description: ''
        },
        {
          name: 'transform',
          description: ''
        },
        {
          name: 'setTransform',
          description: ''
        },
        {
          name: 'resetTransform',
          description: ''
        },
        {
          name: 'clip',
          description: ''
        },
        {
          name: 'setOpacity',
          alias: 'setGlobalAlpha',
          description: ''
        },
        {
          name: 'getOpacity',
          alias: 'getGlobalAlpha',
          description: ''
        },
        {
          name: 'setCompositeOperation',
          alias: 'setGlobalCompositeOperation',
          description: ''
        },
        {
          name: 'getCompositeOperation',
          alias: 'getGlobalCompositeOperation',
          description: ''
        },
        {
          name: 'setImageSmoothingEnabled',
          description: ''
        },
        {
          name: 'getImageSmoothingEnabled',
          description: ''
        },
        {
          name: 'setShadowBlur',
          description: ''
        },
        {
          name: 'getShadowBlur',
          description: ''
        },
        {
          name: 'setShadowColor',
          description: ''
        },
        {
          name: 'getShadowColor',
          description: ''
        },
        {
          name: 'setShadowOffsetX',
          description: ''
        },
        {
          name: 'getShadowOffsetX',
          description: ''
        },
        {
          name: 'setShadowOffsetY',
          description: ''
        },
        {
          name: 'getShadowOffsetY',
          description: ''
        }
      ]
    },
    {
      name: 'Misc',
      methods: [
        {
          name: 'drawFocusIfNeeded',
          description: ''
        },
        {
          name: 'isPointInPath',
          description: ''
        },
        {
          name: 'isPointInStroke',
          description: ''
        }
      ]
    }
  ];

})();
