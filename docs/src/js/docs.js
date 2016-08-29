'use strict';

(function () {

  var types = {
    number: 'Number',
    boolean: 'Boolean',
    string: 'String',
    object: 'Object',
    array: 'Array',
    function: 'Function',
    context: 'RenderingContext',
    htmlElement: 'HTMLElement',
    rect: 'DOMRect',
    text: 'TextMetrics',
    gradient: 'CanvasGradient',
    pattern: 'CanvasPattern',
    image: 'Image',
    imageData: 'ImageData',
    dataUrl: 'Data URI',
    path: 'Path2D'
  };

  module.exports = [
    {
      name: 'Canvas element',
      description: 'A collection of methods for getting and setting various properties of the canvas element.',
      methods: [
        {
          name: 'getCanvas',
          alias: 'getElement',
          description: 'Get the canvas element.',
          returns: {
            name: 'element',
            type: types.htmlElement
          }
        },
        {
          name: 'setSize',
          description: 'Set the canvas dimensions.',
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
          description: 'Get the canvas dimensions.',
          returns: {
            name: '{width, height}',
            type: types.object
          }
        },
        {
          name: 'setWidth',
          description: 'Set the canvas width.',
          arguments: [
            {
              name: 'width',
              type: types.number
            }
          ]
        },
        {
          name: 'getWidth',
          description: 'Get the canvas width.',
          returns: {
            name: 'width',
            type: types.number
          }
        },
        {
          name: 'setHeight',
          description: 'Set the canvas height.',
          arguments: [
            {
              name: 'height',
              type: types.number
            }
          ]
        },
        {
          name: 'getHeight',
          description: 'Get the canvas height.',
          returns: {
            name: 'height',
            type: types.number
          }
        },
        {
          name: 'getBoundingClientRect',
          description: 'Returns the canvas size & position on screen.',
          returns: {
            name: '{top, right, bottom, left, width, height}',
            type: types.rect
          }
        }
      ]
    },
    {
      name: 'Context',
      description: 'A collection of methods for retreiving a canvas context or information about the context.',
      methods: [
        {
          name: 'getContext',
          description: 'Get the standard canvas context (used for drawing).',
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
          description: 'Get canvas context used by Canvasimo (2d).',
          returns: {
            name: 'context',
            type: types.context
          }
        },
        {
          name: 'getCurrentContextType',
          description: 'Get the context type used by Canvasimo (2d, webgl, etc).',
          returns: {
            name: 'contextType',
            type: types.string
          }
        },
        {
          name: 'getContextAttributes',
          description: 'Get the context attributes used.',
          returns: {
            name: 'contextAttributes',
            type: types.object
          }
        }
      ]
    },
    {
      name: 'Solid Shapes',
      description: 'A collection of methods for plotting or drawing solid shapes - ' +
        'those that create a new shape when invoked, and are self closing.',
      methods: [
        {
          name: 'plotRect',
          alias: 'rect',
          description: 'Plot a rectangle that can then have a fill or stroke applied to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
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
          name: 'strokeRect',
          description: 'Plot a rectangle and apply a stroke to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'width',
              type: types.number
            },
            {
              name: 'height',
              type: types.number
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillRect',
          description: 'Plot a rectangle and apply a fill to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'width',
              type: types.number
            },
            {
              name: 'height',
              type: types.number
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'plotRoundedRect',
          description: 'Plot a rounded rectangle that can then have a fill or stroke applied to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'width',
              type: types.number
            },
            {
              name: 'height',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            }
          ]
        },
        {
          name: 'strokeRoundedRect',
          description: 'Plot a rounded rectangle and apply a stroke to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'width',
              type: types.number
            },
            {
              name: 'height',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillRoundedRect',
          description: 'Plot a rounded rectangle and apply a fill to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'width',
              type: types.number
            },
            {
              name: 'height',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'plotCircle',
          description: 'Plot a circle that can then have a stroke or fill applied to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            }
          ]
        },
        {
          name: 'strokeCircle',
          description: 'Plot a circle and apply a stroke to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillCircle',
          description: 'Plot a circle and apply a fill to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'plotPoly',
          description: 'Plot a polygon that can then have a stroke or fill applied to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'sides',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            }
          ]
        },
        {
          name: 'strokePoly',
          description: 'Plot a polygon and apply a stoke to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'sides',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillPoly',
          description: 'Plot a polygon and apply a fill to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'sides',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'plotStar',
          description: 'Plot a star that can then have a stroke or fill applied to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'sides',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            }
          ]
        },
        {
          name: 'strokeStar',
          description: 'Plot a star and apply a stoke to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'sides',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillStar',
          description: 'Plot a star and apply a fill to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'sides',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'plotBurst',
          description: 'Plot a burst that can then have a stroke or fill applied to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'outerRadius',
              type: types.number
            },
            {
              name: 'innerRadius',
              type: types.number
            },
            {
              name: 'sides',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            }
          ]
        },
        {
          name: 'strokeBurst',
          description: 'Plot a burst and apply a stoke to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'outerRadius',
              type: types.number
            },
            {
              name: 'innerRadius',
              type: types.number
            },
            {
              name: 'sides',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillBurst',
          description: 'Plot a burst and apply a fill to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'outerRadius',
              type: types.number
            },
            {
              name: 'innerRadius',
              type: types.number
            },
            {
              name: 'sides',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'plotPixel',
          description: 'Plot a single pixel that can then have a stroke or fill applied to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            }
          ]
        },
        {
          name: 'strokePixel',
          description: 'Plot a single pixel and apply a stroke to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillPixel',
          description: 'Plot a single pixel and apply a fill to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'plotClosedPath',
          description: 'Plot a closed path that can then have a stroke or fill applied to it.',
          arguments: [
            {
              name: 'points',
              type: types.array
            }
          ]
        },
        {
          name: 'strokeClosedPath',
          description: 'Plot a closed path and apply a stroke to it.',
          arguments: [
            {
              name: 'points',
              type: types.array
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillClosedPath',
          description: 'Plot a closed path and apply a fill to it.',
          arguments: [
            {
              name: 'points',
              type: types.array
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        }
      ]
    },
    {
      name: 'Open Shapes',
      description: 'A collection of methods for plotting or drawing open shapes - ' +
        'those that create a new shape when invoked, but are not self closing.',
      methods: [
        {
          name: 'plotLine',
          description: 'Plot a line that can then have a stroke or fill applied to it.',
          arguments: [
            {
              name: 'x1',
              type: types.number
            },
            {
              name: 'y1',
              type: types.number
            },
            {
              name: 'x2',
              type: types.number
            },
            {
              name: 'y2',
              type: types.number
            }
          ]
        },
        {
          name: 'strokeLine',
          description: 'Plot a line and apply a stroke to it.',
          arguments: [
            {
              name: 'x1',
              type: types.number
            },
            {
              name: 'y1',
              type: types.number
            },
            {
              name: 'x2',
              type: types.number
            },
            {
              name: 'y2',
              type: types.number
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'plotLength',
          description: 'Plot a line, by length & angle, that can then have a stroke or fill applied to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'length',
              type: types.number
            },
            {
              name: 'angle',
              type: types.number
            }
          ]
        },
        {
          name: 'strokeLength',
          description: 'Plot a line, by length & angle, and apply a stroke to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'length',
              type: types.number
            },
            {
              name: 'angle',
              type: types.number
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'plotPath',
          description: 'Plot a path, that is not self closing, that can have a stroke or fill applied to it.',
          arguments: [
            {
              name: 'points',
              type: types.array
            }
          ]
        },
        {
          name: 'strokePath',
          description: 'Plot a path, that is not self closing, and apply a stroke to it.',
          arguments: [
            {
              name: 'points',
              type: types.array
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillPath',
          description: 'Plot a path, that is not self closing, and apply a fill to it.',
          arguments: [
            {
              name: 'points',
              type: types.array
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        }
      ]
    },
    {
      name: 'Paths',
      description: 'A collection of methods for plotting or drawing paths - ' +
        'shapes that can be connected to create more complex shapes.',
      methods: [
        {
          name: 'plotArc',
          alias: 'arc',
          description: 'Plot an arc that can have a stroke or fill applied to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'startAngle',
              type: types.number
            },
            {
              name: 'endAngle',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            }
          ]
        },
        {
          name: 'strokeArc',
          description: 'Plot an arc and apply a stroke to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'startAngle',
              type: types.number
            },
            {
              name: 'endAngle',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillArc',
          description: 'Plot an arc and apply a fill to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            },
            {
              name: 'startAngle',
              type: types.number
            },
            {
              name: 'endAngle',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'plotEllipse',
          alias: 'ellipse',
          description: 'Plot an ellipse that can then have a stroke or fill applied to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radiusX',
              type: types.number
            },
            {
              name: 'radiusY',
              type: types.number
            },
            {
              name: 'rotation',
              type: types.number
            },
            {
              name: 'startAngle',
              type: types.number
            },
            {
              name: 'endAngle',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            }
          ]
        },
        {
          name: 'strokeEllipse',
          description: 'Plot an ellipse and apply a stroke to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radiusX',
              type: types.number
            },
            {
              name: 'radiusY',
              type: types.number
            },
            {
              name: 'rotation',
              type: types.number
            },
            {
              name: 'startAngle',
              type: types.number
            },
            {
              name: 'endAngle',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillEllipse',
          description: 'Plot an ellipse and apply a fill to it.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'radiusX',
              type: types.number
            },
            {
              name: 'radiusY',
              type: types.number
            },
            {
              name: 'rotation',
              type: types.number
            },
            {
              name: 'startAngle',
              type: types.number
            },
            {
              name: 'endAngle',
              type: types.number
            },
            {
              name: 'counterClockwise',
              type: types.boolean,
              optional: true
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        }
      ]
    },
    {
      name: 'Text',
      description: 'A collection of methods for drawing text, ' +
        'and getting and setting properties related to text rendering.',
      methods: [
        {
          name: 'strokeText',
          description: 'Draw a text with a stroke.',
          arguments: [
            {
              name: 'text',
              type: types.string
            },
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'maxWidth',
              type: types.number,
              optional: true
            },
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillText',
          description: 'Draw a text with a fill.',
          arguments: [
            {
              name: 'text',
              type: types.string
            },
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'maxWidth',
              type: types.number,
              optional: true
            },
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'getTextSize',
          alias: 'measureText',
          description: 'Get information about the size text will be drawn.',
          returns: {
            name: '{width}',
            type: types.text
          }
        },
        {
          name: 'setTextAlign',
          description: 'Set the horizontal text alignment.',
          arguments: [
            {
              name: 'alignment',
              type: types.string
            }
          ]
        },
        {
          name: 'getTextAlign',
          description: 'Get the horizontal text alignment.',
          returns: {
            name: 'alignment',
            type: types.string
          }
        },
        {
          name: 'setTextBaseline',
          description: 'Set the vertical text alignment.',
          arguments: [
            {
              name: 'alignment',
              type: types.string
            }
          ]
        },
        {
          name: 'getTextBaseline',
          description: 'Get the vertical text alignment.',
          returns: {
            name: 'alignment',
            type: types.string
          }
        }
      ]
    },
    {
      name: 'Fonts',
      description: 'A collection of methods for getting and setting font styles and variations.',
      methods: [
        {
          name: 'setFont',
          description: 'Set the font to use.',
          arguments: [
            {
              name: 'font',
              type: types.string
            }
          ]
        },
        {
          name: 'getFont',
          description: 'Get the font that is being used.',
          returns: {
            name: 'font',
            type: types.string
          }
        },
        {
          name: 'setFontFamily',
          description: 'Set the font family to use.',
          arguments: [
            {
              name: 'fontFamily',
              type: types.string
            }
          ]
        },
        {
          name: 'getFontFamily',
          description: 'Get the font that is being used.',
          returns: {
            name: 'fontFamily',
            type: types.string
          }
        },
        {
          name: 'setFontSize',
          description: 'Set the font size to use.',
          arguments: [
            {
              name: 'fontSize',
              type: types.number
            }
          ]
        },
        {
          name: 'getFontSize',
          description: 'Get the font size that is being used.',
          returns: {
            name: 'fontSize',
            type: [types.number, types.string]
          }
        },
        {
          name: 'setFontStyle',
          description: 'Set the font style to use.',
          arguments: [
            {
              name: 'fontStyle',
              type: types.string
            }
          ]
        },
        {
          name: 'getFontStyle',
          description: 'Get the font style that is being used.',
          returns: {
            name: 'fontStyle',
            type: types.string
          }
        },
        {
          name: 'setFontVariant',
          description: 'Set the font variant to use.',
          arguments: [
            {
              name: 'fontVariant',
              type: types.string
            }
          ]
        },
        {
          name: 'getFontVariant',
          description: 'Get the font variant that is being used.',
          returns: {
            name: 'fontVariant',
            type: types.string
          }
        },
        {
          name: 'setFontWeight',
          description: 'Set the font weight to use.',
          arguments: [
            {
              name: 'fontWeight',
              type: [types.number, types.string]
            }
          ]
        },
        {
          name: 'getFontWeight',
          description: 'Get the font weight that is being used.',
          returns: {
            name: 'fontWeight',
            type: types.string
          }
        }
      ]
    },
    {
      name: 'Stroke Styles',
      description: 'A collection of methods for getting and setting stroke styles, ' +
        'and applying strokes to existing shapes.',
      methods: [
        {
          name: 'stroke',
          description: 'Apply a stroke to the current shape.',
          arguments: [
            {
              name: 'stroke',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'setStroke',
          alias: 'setStrokeStyle',
          description: 'Set the stroke style to use.',
          arguments: [
            {
              name: 'strokeStyle',
              type: types.string
            }
          ]
        },
        {
          name: 'getStroke',
          alias: 'getStrokeStyle',
          description: 'Get the stroke style that is being used.',
          returns: {
            name: 'strokeStyle',
            type: types.string
          }
        },
        {
          name: 'setStrokeCap',
          alias: 'setLineCap',
          description: 'Set the stroke cap to use.',
          arguments: [
            {
              name: 'strokeCap',
              type: types.string
            }
          ]
        },
        {
          name: 'getStrokeCap',
          alias: 'getLineCap',
          description: 'Get the stroke cap that is being used.',
          returns: {
            name: 'strokeCap',
            type: types.string
          }
        },
        {
          name: 'setStrokeDash',
          alias: 'setLineDash',
          description: 'Set the stroke dash to use.',
          arguments: [
            {
              name: 'strokeDash',
              type: types.array
            }
          ]
        },
        {
          name: 'getStrokeDash',
          alias: 'getLineDash',
          description: 'Get the stroke dash that is being used.',
          returns: {
            name: 'strokeDash',
            type: types.array
          }
        },
        {
          name: 'setStrokeDashOffset',
          alias: 'setLineDashOffset',
          description: 'Set the stroke dash offset to use.',
          arguments: [
            {
              name: 'strokeDashOffset',
              type: types.number
            }
          ]
        },
        {
          name: 'getStrokeDashOffset',
          alias: 'getLineDashOffset',
          description: 'Get the stroke dash offset that is being used.',
          returns: {
            name: 'strokeDashOffset',
            type: types.number
          }
        },
        {
          name: 'setStrokeJoin',
          alias: 'setLineJoin',
          description: 'Set the stroke join to use.',
          arguments: [
            {
              name: 'strokeJoin',
              type: types.string
            }
          ]
        },
        {
          name: 'getStrokeJoin',
          alias: 'getLineJoin',
          description: 'Get the stroke join that is being used.',
          returns: {
            name: 'strokeJoin',
            type: types.string
          }
        },
        {
          name: 'setStrokeWidth',
          alias: 'setLineWidth',
          description: 'Set the stroke width to use.',
          arguments: [
            {
              name: 'strokeWidth',
              type: types.number
            }
          ]
        },
        {
          name: 'getStrokeWidth',
          alias: 'getLineWidth',
          description: 'Get the stroke width that is being used.',
          returns: {
            name: 'strokeWidth',
            type: types.number
          }
        },
        {
          name: 'setMiterLimit',
          description: 'Set the miter limit to use.',
          arguments: [
            {
              name: 'miterLimit',
              type: types.number
            }
          ]
        },
        {
          name: 'getMiterLimit',
          description: 'Get the miter limit that is being used.',
          returns: {
            name: 'miterLimit',
            type: types.number
          }
        }
      ]
    },
    {
      name: 'Fill styles',
      description: 'A collection of methods for getting and setting fill styles, ' +
        'and applying fills to existing shapes.',
      methods: [
        {
          name: 'fill',
          description: 'Apply a fill to the current shape.',
          arguments: [
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'fillCanvas',
          description: 'Apply a fill to the entire canvas area.',
          arguments: [
            {
              name: 'fill',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'clearRect',
          description: 'Clear a rectangular area of the canvas.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
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
          name: 'clearCanvas',
          description: 'Clear the entire canvas area.'
        },
        {
          name: 'setFill',
          alias: 'setFillStyle',
          description: 'Set the fill to use.',
          arguments: [
            {
              name: 'fill',
              type: types.string
            }
          ]
        },
        {
          name: 'getFill',
          alias: 'getFillStyle',
          description: 'Get the fill that is being used.',
          returns: {
            name: 'fill',
            type: types.string
          }
        },
        {
          name: 'createLinearGradient',
          description: 'Create a linear gradient to use as a fill.',
          arguments: [
            {
              name: 'x1',
              type: types.number
            },
            {
              name: 'y1',
              type: types.number
            },
            {
              name: 'x2',
              type: types.number
            },
            {
              name: 'y2',
              type: types.number
            }
          ],
          returns: {
            name: 'gradient',
            type: types.gradient
          }
        },
        {
          name: 'createRadialGradient',
          description: 'Create a radial gradient to use as a fill.',
          arguments: [
            {
              name: 'x1',
              type: types.number
            },
            {
              name: 'y1',
              type: types.number
            },
            {
              name: 'radius1',
              type: types.number
            },
            {
              name: 'x2',
              type: types.number
            },
            {
              name: 'y2',
              type: types.number
            },
            {
              name: 'radius2',
              type: types.number
            },
          ],
          returns: {
            name: 'gradient',
            type: types.gradient
          }
        },
        {
          name: 'createPattern',
          description: 'Create a pattern to be used as a fill.',
          arguments: [
            {
              name: 'image',
              type: types.image
            },
            {
              name: 'repetition',
              type: types.string
            }
          ],
          returns: {
            name: 'pattern',
            type: types.pattern
          }
        },
        {
          name: 'drawImage',
          description: 'Draw an image to the canvas. ' +
            'If the second position / size arguments are supplied, the first will be used for cropping the image, ' +
            'and the second for the position and size it will be drawn.',
          arguments: [
            {
              name: 'image',
              type: types.image
            },
            {
              name: 'x1',
              type: types.number
            },
            {
              name: 'y1',
              type: types.number
            },
            {
              name: 'width1',
              type: types.number,
              optional: true
            },
            {
              name: 'height1',
              type: types.number,
              optional: true
            },
            {
              name: 'x2',
              type: types.number,
              optional: true
            },
            {
              name: 'y2',
              type: types.number,
              optional: true
            },
            {
              name: 'width2',
              type: types.number,
              optional: true
            },
            {
              name: 'height2',
              type: types.number,
              optional: true
            }
          ]
        }
      ]
    },
    {
      name: 'Image Data',
      description: 'A collection of methods for creating, putting, or getting image data about the canvas.',
      methods: [
        {
          name: 'getDataURL',
          description: 'Get a data URL of the current canvas state.',
          arguments: [
            {
              name: 'type',
              type: types.string,
              optional: true
            },
            {
              name: 'quality',
              type: types.number,
              optional: true
            }
          ],
          returns: {
            name: 'url',
            type: types.dataUrl
          }
        },
        {
          name: 'createImageData',
          description: 'Create image data with either the width and height specified, ' +
            'or with the width and height of a the image data supplied.',
          arguments: [
            {
              name: 'width',
              type: types.number
            },
            {
              name: 'height',
              type: types.number
            }
          ],
          returns: {
            name: 'imageData',
            type: types.imageData
          }
        },
        {
          name: 'getImageData',
          description: 'Get the image data from an area of the canvas.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'width',
              type: types.number
            },
            {
              name: 'height',
              type: types.number
            }
          ],
          returns: {
            name: 'imageData',
            type: types.imageData
          }
        },
        {
          name: 'putImageData',
          description: 'Draw image data onto the canvas.',
          arguments: [
            {
              name: 'imageData',
              type: types.imageData
            },
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'cropX',
              type: types.number,
              optional: true
            },
            {
              name: 'cropY',
              type: types.number,
              optional: true
            },
            {
              name: 'cropWidth',
              type: types.number,
              optional: true
            },
            {
              name: 'cropHeight',
              type: types.number,
              optional: true
            }
          ]
        },
        {
          name: 'getPixelData',
          description: 'Get image data about a specific pixel.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            }
          ],
          returns: {
            name: 'imageData',
            type: types.imageData
          }
        },
        {
          name: 'getPixelColor',
          description: 'Get the color of a specific pixel.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            }
          ],
          returns: {
            name: 'color',
            type: types.string
          }
        }
      ]
    },
    {
      name: 'Color Helpers',
      description: 'A collection of methods to help with creating color strings.',
      methods: [
        {
          name: 'createHSL',
          description: 'Create an HSL color string from the given values.',
          arguments: [
            {
              name: 'hue',
              type: types.number
            },
            {
              name: 'saturation',
              type: types.number
            },
            {
              name: 'lightness',
              type: types.number
            }
          ],
          returns: {
            name: 'color',
            type: types.string
          }
        },
        {
          name: 'createHSLA',
          description: 'Create an HSLA color string from the given values.',
          arguments: [
            {
              name: 'hue',
              type: types.number
            },
            {
              name: 'saturation',
              type: types.number
            },
            {
              name: 'lightness',
              type: types.number
            },
            {
              name: 'alpha',
              type: types.number
            }
          ],
          returns: {
            name: 'color',
            type: types.string
          }
        },
        {
          name: 'createRGB',
          description: 'Create an RGB color string from the given values.',
          arguments: [
            {
              name: 'red',
              type: types.number
            },
            {
              name: 'green',
              type: types.number
            },
            {
              name: 'blue',
              type: types.number
            }
          ],
          returns: {
            name: 'color',
            type: types.string
          }
        },
        {
          name: 'createRGBA',
          description: 'Create an RGBA color string from the given values.',
          arguments: [
            {
              name: 'red',
              type: types.number
            },
            {
              name: 'green',
              type: types.number
            },
            {
              name: 'blue',
              type: types.number
            },
            {
              name: 'alpha',
              type: types.number
            }
          ],
          returns: {
            name: 'color',
            type: types.string
          }
        },
        {
          name: 'getHSLFromHSLA',
          description: 'Return an HSL color string from the given HSLA color string.',
          arguments: [
            {
              name: 'color',
              type: types.string
            }
          ],
          returns: {
            name: 'color',
            type: types.string
          }
        },
        {
          name: 'getRGBFromRGBA',
          description: 'Return an RGB color string from the given RGBA color string.',
          arguments: [
            {
              name: 'color',
              type: types.string
            }
          ],
          returns: {
            name: 'color',
            type: types.string
          }
        }
      ]
    },
    {
      name: 'Converting Sizes',
      description: 'A collection of methods to help with calculating and converting sizes, and distances.',
      methods: [
        {
          name: 'getFractionFromPercent',
          description: 'Get a fraction from the provided percent value e.g. 80 returns 0.8.',
          arguments: [
            {
              name: 'percent',
              type: types.number
            }
          ],
          returns: {
            name: 'fraction',
            type: types.number
          }
        },
        {
          name: 'getPercentFromFraction',
          description: 'Get a percent from the provided fraction value e.g. 0.7 returns 70.',
          arguments: [
            {
              name: 'fraction',
              type: types.number
            }
          ],
          returns: {
            name: 'percent',
            type: types.number
          }
        },
        {
          name: 'getFractionOfWidth',
          description: 'Returns the actual value of a fraction of the canvas width e.g. ' +
            'a canvas with a width of 200 returns 100 if the provided value is 0.5.',
          arguments: [
            {
              name: 'fraction',
              type: types.number
            }
          ],
          returns: {
            name: 'width',
            type: types.number
          }
        },
        {
          name: 'getFractionOfHeight',
          description: 'Returns the actual value of a fraction of the canvas height e.g. ' +
            'a canvas with a height of 100 returns 20 if the provided value is 0.2.',
          arguments: [
            {
              name: 'fraction',
              type: types.number
            }
          ],
          returns: {
            name: 'height',
            type: types.number
          }
        },
        {
          name: 'getPercentOfWidth',
          description: 'Returns the actual value of a percentage of the canvas width e.g. ' +
            'a canvas with a width of 200 returns 100 if the provided value is 50.',
          arguments: [
            {
              name: 'percent',
              type: types.number
            }
          ],
          returns: {
            name: 'width',
            type: types.number
          }
        },
        {
          name: 'getPercentOfHeight',
          description: 'Returns the actual value of a percentage of the canvas height e.g. ' +
            'a canvas with a height of 100 returns 20 if the provided value is 20.',
          arguments: [
            {
              name: 'percent',
              type: types.number
            }
          ],
          returns: {
            name: 'height',
            type: types.number
          }
        },
        {
          name: 'getDistance',
          description: 'Returns the distance between 2 points.',
          arguments: [
            {
              name: 'x1',
              type: types.number
            },
            {
              name: 'y1',
              type: types.number
            },
            {
              name: 'x2',
              type: types.number
            },
            {
              name: 'y2',
              type: types.number
            }
          ],
          returns: {
            name: 'distance',
            type: types.number
          }
        }
      ]
    },
    {
      name: 'Converting Angles',
      description: 'A collection of methods to help with calculating and converting angles.',
      methods: [
        {
          name: 'getRadiansFromDegrees',
          description: 'Get a radian value from the provided degrees e.g. 90 returns 1.5708.',
          arguments: [
            {
              name: 'degrees',
              type: types.number
            }
          ],
          returns: {
            name: 'radians',
            type: types.number
          }
        },
        {
          name: 'getDegreesFromRadians',
          description: 'Get a degree value from the provided radians e.g. 3.14159 returns 180.',
          arguments: [
            {
              name: 'radians',
              type: types.number
            }
          ],
          returns: {
            name: 'degrees',
            type: types.number
          }
        },
        {
          name: 'getAngle',
          description: 'Get the angle (in radians) between 2 or 3 points.',
          arguments: [
            {
              name: 'x1',
              type: types.number
            },
            {
              name: 'y1',
              type: types.number
            },
            {
              name: 'x2',
              type: types.number
            },
            {
              name: 'y2',
              type: types.number
            },
            {
              name: 'x3',
              type: types.number,
              optional: true
            },
            {
              name: 'y3',
              type: types.number,
              optional: true
            }
          ],
          returns: {
            name: 'angle',
            type: types.number
          }
        }
      ]
    },
    {
      name: 'Path Plotting',
      description: 'A collection of methods for path drawing.',
      methods: [
        {
          name: 'beginPath',
          description: 'Begin a new path (shape).'
        },
        {
          name: 'closePath',
          description: 'Close the current path (shape).'
        },
        {
          name: 'moveTo',
          description: 'Move the starting point of a the next sub-path.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            }
          ]
        },
        {
          name: 'lineTo',
          description: 'Connect the last point to the provided coordinates.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            }
          ]
        },
        {
          name: 'arcTo',
          description: 'Arc from one point to another.',
          arguments: [
            {
              name: 'x1',
              type: types.number
            },
            {
              name: 'y1',
              type: types.number
            },
            {
              name: 'x2',
              type: types.number
            },
            {
              name: 'y2',
              type: types.number
            },
            {
              name: 'radius',
              type: types.number
            }
          ]
        },
        {
          name: 'bezierCurveTo',
          description: 'Connect the last point to the provided coordinates with a bezier curve (2 control points).',
          arguments: [
            {
              name: 'controlPoint1X',
              type: types.number
            },
            {
              name: 'controlPoint1Y',
              type: types.number
            },
            {
              name: 'controlPoint2X',
              type: types.number
            },
            {
              name: 'controlPoint2Y',
              type: types.number
            },
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            }
          ]
        },
        {
          name: 'quadraticCurveTo',
          description: 'Connect the last point to the provided coordinates with a quadratic curve (1 control point).',
          arguments: [
            {
              name: 'controlPointX',
              type: types.number
            },
            {
              name: 'controlPointY',
              type: types.number
            },
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            }
          ]
        }
      ]
    },
    {
      name: 'Canvas State',
      description: 'A collection of methods to save, restore, or transform the canvas state.',
      methods: [
        {
          name: 'save',
          description: 'Push the current state of the canvas into a stack that can later be restored.'
        },
        {
          name: 'restore',
          description: 'Restore the most recent state of the canvas that was saved.'
        },
        {
          name: 'rotate',
          description: 'Add rotation (in radians) to the transform matrix so that shapes can be drawn at an angle.',
          arguments: [
            {
              name: 'angle',
              type: types.number
            }
          ]
        },
        {
          name: 'scale',
          description: 'Scale the transform matrix so that shapes can be drawn at the provided scale.',
          arguments: [
            {
              name: 'scale',
              type: types.number
            }
          ]
        },
        {
          name: 'translate',
          description: 'Move the canvas origin.',
          arguments: [
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            }
          ]
        },
        {
          name: 'transform',
          description: 'Multiply the current transformation with the provided matrix.',
          arguments: [
            {
              name: 'horizontalScale',
              type: types.number
            },
            {
              name: 'horizontalSkew',
              type: types.number
            },
            {
              name: 'verticalSkew',
              type: types.number
            },
            {
              name: 'verticalScale',
              type: types.number
            },
            {
              name: 'horizontalMove',
              type: types.number
            },
            {
              name: 'verticalMove',
              type: types.number
            }
          ]
        },
        {
          name: 'setTransform',
          description: 'Replace the current transformation with the provided matrix.',
          arguments: [
            {
              name: 'horizontalScale',
              type: types.number
            },
            {
              name: 'horizontalSkew',
              type: types.number
            },
            {
              name: 'verticalSkew',
              type: types.number
            },
            {
              name: 'verticalScale',
              type: types.number
            },
            {
              name: 'horizontalMove',
              type: types.number
            },
            {
              name: 'verticalMove',
              type: types.number
            }
          ]
        },
        {
          name: 'resetTransform',
          description: 'Replace the current transformation with the default matrix: [1, 0, 0, 1, 0, 0].'
        },
        {
          name: 'clip',
          description: 'Use the current path as a clipping path.',
          arguments: [
            {
              name: 'path',
              type: types.path,
              optional: true
            },
            {
              name: 'fillRule',
              type: types.string,
              optional: true
            }
          ]
        },
        {
          name: 'setOpacity',
          alias: 'setGlobalAlpha',
          description: 'Set the opacity to use for drawing.',
          arguments: [
            {
              name: 'opacity',
              type: types.number
            }
          ]
        },
        {
          name: 'getOpacity',
          alias: 'getGlobalAlpha',
          description: 'Get the opacity that is being used.',
          returns: {
            name: 'opacity',
            type: types.number
          }
        },
        {
          name: 'setCompositeOperation',
          alias: 'setGlobalCompositeOperation',
          description: 'Set the composite operation to use for drawing.',
          arguments: [
            {
              name: 'compositeOperation',
              type: types.string
            }
          ]
        },
        {
          name: 'getCompositeOperation',
          alias: 'getGlobalCompositeOperation',
          description: 'Get the composite operation that is being used.',
          returns: {
            name: 'compositeOperation',
            type: types.string
          }
        },
        {
          name: 'setImageSmoothingEnabled',
          description: 'Set whether image smoothing should be used.',
          arguments: [
            {
              name: 'imageSmoothingEnabled',
              type: types.boolean
            }
          ]
        },
        {
          name: 'getImageSmoothingEnabled',
          description: 'Get whether image smoothing is being used.',
          returns: {
            name: 'imageSmoothingEnabled',
            type: types.boolean
          }
        },
        {
          name: 'setShadowBlur',
          description: 'Set how blurry shadows are.',
          arguments: [
            {
              name: 'shadowBlur',
              type: types.number
            }
          ]
        },
        {
          name: 'getShadowBlur',
          description: 'Get the value of how blurry shadows are.',
          returns: {
            name: 'shadowBlur',
            type: types.number
          }
        },
        {
          name: 'setShadowColor',
          description: 'Set the color to be used for shadows.',
          arguments: [
            {
              name: 'color',
              type: types.string
            }
          ]
        },
        {
          name: 'getShadowColor',
          description: 'Get the color being used for shadows.',
          returns: {
            name: 'color',
            type: types.string
          }
        },
        {
          name: 'setShadowOffsetX',
          description: 'Set how horizontally offset shadows should be.',
          arguments: [
            {
              name: 'offset',
              type: types.number
            }
          ]
        },
        {
          name: 'getShadowOffsetX',
          description: 'Get the value of how horizontally offset shadows should be.',
          returns: {
            name: 'offset',
            type: types.number
          }
        },
        {
          name: 'setShadowOffsetY',
          description: 'Set how vertically offset shadows should be.',
          arguments: [
            {
              name: 'offset',
              type: types.number
            }
          ]
        },
        {
          name: 'getShadowOffsetY',
          description: 'Get the value of how vertically offset shadows should be.',
          returns: {
            name: 'offset',
            type: types.number
          }
        }
      ]
    },
    {
      name: 'Misc',
      description: 'Miscellaneous methods.',
      methods: [
        {
          name: 'tap',
          description: 'Break out of the method chain and execute a callback.',
          arguments: [
            {
              name: 'callback',
              type: types.function
            }
          ]
        },
        {
          name: 'repeat',
          description: 'Break out of the method chain and execute a callback with values between start and end, ' +
            'incresing / decreasing by step (start defaults to 0, step defaults to 1). ' +
            'You may return false from the callback at any point to stop at the current iteration.',
          arguments: [
            {
              name: 'start',
              type: types.number,
              optional: true
            },
            {
              name: 'end',
              type: types.number
            },
            {
              name: 'step',
              type: types.number,
              optional: true
            },
            {
              name: 'callback',
              type: types.function
            }
          ]
        },
        {
          name: 'forEach',
          description: 'Break out of the method chain and loop over the given array, object or string, ' +
            'calling the callback with the value & key / index. ' +
            'You may return false from the callback at any point to stop at the current iteration.',
          arguments: [
            {
              name: 'iterable',
              type: [types.array, types.object, types.string]
            },
            {
              name: 'callback',
              type: types.function
            }
          ]
        },
        {
          name: 'constrain',
          description: 'Constrain a number between a minimum and maximum value.',
          arguments: [
            {
              name: 'value',
              type: types.number
            },
            {
              name: 'minimum',
              type: types.number
            },
            {
              name: 'maximum',
              type: types.number
            }
          ],
          returns: {
            name: 'value',
            type: types.number
          }
        },
        {
          name: 'map',
          description: 'Map a value from one range to another e.g. ' +
            'mapping 0.5 from 0-1 to 0-10 returns 5.',
          arguments: [
            {
              name: 'value',
              type: types.number
            },
            {
              name: 'fromStart',
              type: types.number
            },
            {
              name: 'fromEnd',
              type: types.number
            },
            {
              name: 'toStart',
              type: types.number
            },
            {
              name: 'toEnd',
              type: types.number
            }
          ],
          returns: {
            name: 'value',
            type: types.number
          }
        },
        {
          name: 'drawFocusIfNeeded',
          description: 'Draw a focus ring around the current path, or the path supplied, ' +
            'if the element supplied has focus.',
          arguments: [
            {
              name: 'path',
              type: types.path,
              optional: true
            },
            {
              name: 'element',
              type: types.element
            }
          ]
        },
        {
          name: 'isPointInPath',
          description: 'Returns whether the given point is within the current or given path.',
          arguments: [
            {
              name: 'path',
              type: types.path,
              optional: true
            },
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            },
            {
              name: 'fillRule',
              type: types.string,
              optional: true
            }
          ],
          returns: {
            name: 'isPointInPath',
            type: types.boolean
          }
        },
        {
          name: 'isPointInStroke',
          description: 'Returns whether the given point is within the area contained by applying ' +
            'a stroke to the current or given path.',
          arguments: [
            {
              name: 'path',
              type: types.path,
              optional: true
            },
            {
              name: 'x',
              type: types.number
            },
            {
              name: 'y',
              type: types.number
            }
          ]
        }
      ]
    }
  ];

})();
