'use strict';

(function () {

  var types = {
    number: 'Number',
    boolean: 'Boolean',
    string: 'String',
    object: 'Object',
    array: 'Array',
    context: 'RenderingContext',
    htmlElement: 'HTMLElement',
    rect: 'DOMRect',
    text: 'TextMetrics'
  };

  module.exports = [
    {
      name: 'Canvas element',
      description: 'A collection of methods for getting and setting various properties of the canvas element',
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
        },
        {
          name: 'getBoundingClientRect',
          description: 'Returns the canvas size & position on screen',
          returns: {
            name: '{top, right, bottom, left, width, height}',
            type: types.rect
          }
        }
      ]
    },
    {
      name: 'Context',
      description: 'A collection of methods for retreiving a canvas context or information about the context',
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
      description: 'A collection of methods for plotting or drawing solid shapes - ' +
        'those that create a new shape when invoked, and are self closing',
      methods: [
        {
          name: 'plotRect',
          alias: 'rect',
          description: 'Plot a rectangle that can then have a fill or stroke applied to it',
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
          description: 'Plot a rectangle and apply a stroke to it',
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
          description: 'Plot a rectangle and apply a fill to it',
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
          description: 'Plot a rounded rectangle that can then have a fill or stroke applied to it',
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
          description: 'Plot a rounded rectangle and apply a stroke to it',
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
          description: 'Plot a rounded rectangle and apply a fill to it',
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
          description: 'Plot a circle that can then have a stroke or fill applied to it',
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
          description: 'Plot a circle and apply a stroke to it',
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
          description: 'Plot a circle and apply a fill to it',
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
          description: 'Plot a polygon that can then have a stroke or fill applied to it',
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
          description: 'Plot a polygon and apply a stoke to it',
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
          description: 'Plot a polygon and apply a fill to it',
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
          description: 'Plot a star that can then have a stroke or fill applied to it',
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
          description: 'Plot a star and apply a stoke to it',
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
          description: 'Plot a star and apply a fill to it',
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
          description: 'Plot a burst that can then have a stroke or fill applied to it',
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
          description: 'Plot a burst and apply a stoke to it',
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
          description: 'Plot a burst and apply a fill to it',
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
          description: 'Plot a single pixel that can then have a stroke or fill applied to it',
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
          description: 'Plot a single pixel and apply a stroke to it',
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
          description: 'Plot a single pixel and apply a fill to it',
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
          description: 'Plot a closed path that can then have a stroke or fill applied to it',
          arguments: [
            {
              name: 'points',
              type: types.array
            }
          ]
        },
        {
          name: 'strokeClosedPath',
          description: 'Plot a closed path and apply a stroke to it',
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
          description: 'Plot a closed path and apply a fill to it',
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
        'those that create a new shape when invoked, but are not self closing',
      methods: [
        {
          name: 'plotLine',
          description: 'Plot a line that can then have a stroke or fill applied to it',
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
          description: 'Plot a line and apply a stroke to it',
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
          description: 'Plot a line, by length & angle, that can then have a stroke or fill applied to it',
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
          description: 'Plot a line, by length & angle, and apply a stroke to it',
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
          description: 'Plot a path, that is not self closing, that can have a stroke or fill applied to it',
          arguments: [
            {
              name: 'points',
              type: types.array
            }
          ]
        },
        {
          name: 'strokePath',
          description: 'Plot a path, that is not self closing, and apply a stroke to it',
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
          description: 'Plot a path, that is not self closing, and apply a fill to it',
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
        'shapes that can be connected to create more complex shapes',
      methods: [
        {
          name: 'plotArc',
          alias: 'arc',
          description: 'Plot an arc that can have a stroke or fill applied to it',
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
          description: 'Plot an arc and apply a stroke to it',
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
          description: 'Plot an arc and apply a fill to it',
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
          description: 'Plot an ellipse that can then have a stroke or fill applied to it',
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
          description: 'Plot an ellipse and apply a stroke to it',
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
          description: 'Plot an ellipse and apply a fill to it',
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
        'and getting and setting properties related to text rendering',
      methods: [
        {
          name: 'strokeText',
          description: 'Draw a text with a stroke',
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
          description: 'Draw a text with a fill',
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
          description: 'Get information about the size text will be drawn',
          returns: {
            name: '{width}',
            type: types.text
          }
        },
        {
          name: 'setTextAlign',
          description: 'Set the horizontal text alignment',
          arguments: [
            {
              name: 'alignment',
              type: types.string
            }
          ]
        },
        {
          name: 'getTextAlign',
          description: 'Get the horizontal text alignment',
          returns: {
            name: 'alignment',
            type: types.string
          }
        },
        {
          name: 'setTextBaseline',
          description: 'Set the vertical text alignment',
          arguments: [
            {
              name: 'alignment',
              type: types.string
            }
          ]
        },
        {
          name: 'getTextBaseline',
          description: 'Get the vertical text alignment',
          returns: {
            name: 'alignment',
            type: types.string
          }
        }
      ]
    },
    {
      name: 'Fonts',
      description: 'A collection of methods for getting and setting font styles and variations',
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
      name: 'Stroke Styles',
      description: 'A collection of methods for getting and setting stroke styles, ' +
        'and applying strokes to existing shapes',
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
      description: 'A collection of methods for getting and setting fill styles, ' +
        'and applying fills to existing shapes',
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
      description: 'A collection of methods for creating, putting, or getting image data about the canvas',
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
      description: 'A collection of methods to help with creating color strings',
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
      description: 'A collection of methods to help with calculating and converting sizes, and distances',
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
      description: 'A collection of methods to help with calculating and converting angles',
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
      description: 'A collection of methods for path drawing',
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
      description: 'A collection of methods to save, restore, or transform the canvas state',
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
      description: 'Miscellaneous methods',
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
