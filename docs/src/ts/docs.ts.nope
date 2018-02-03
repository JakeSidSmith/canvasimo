import { Docs } from './types';

const TYPES = {
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
  path: 'Path2D',
};

const DOCS: Docs = [
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
          type: TYPES.htmlElement,
        },
      },
      {
        name: 'setSize',
        description: 'Set the canvas dimensions.',
        arguments: [
          {
            name: 'width',
            type: TYPES.number,
          },
          {
            name: 'height',
            type: TYPES.number,
          },
        ],
      },
      {
        name: 'getSize',
        description: 'Get the canvas dimensions.',
        returns: {
          name: '{width, height}',
          type: TYPES.object,
        },
      },
      {
        name: 'setWidth',
        description: 'Set the canvas width.',
        arguments: [
          {
            name: 'width',
            type: TYPES.number,
          },
        ],
      },
      {
        name: 'getWidth',
        description: 'Get the canvas width.',
        returns: {
          name: 'width',
          type: TYPES.number,
        },
      },
      {
        name: 'setHeight',
        description: 'Set the canvas height.',
        arguments: [
          {
            name: 'height',
            type: TYPES.number,
          },
        ],
      },
      {
        name: 'getHeight',
        description: 'Get the canvas height.',
        returns: {
          name: 'height',
          type: TYPES.number,
        },
      },
      {
        name: 'getBoundingClientRect',
        description: 'Returns the canvas size & position on screen.',
        returns: {
          name: '{top, right, bottom, left, width, height}',
          type: TYPES.rect,
        },
      },
    ],
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
            type: TYPES.string,
          },
          {
            name: 'contextAttributes',
            type: TYPES.object,
            optional: true,
          },
        ],
        returns: {
          name: 'context',
          type: TYPES.context,
        },
      },
      {
        name: 'getCurrentContext',
        description: 'Get canvas context used by Canvasimo (2d).',
        returns: {
          name: 'context',
          type: TYPES.context,
        },
      },
      {
        name: 'getCurrentContextType',
        description: 'Get the context type used by Canvasimo (2d, webgl, etc).',
        returns: {
          name: 'contextType',
          type: TYPES.string,
        },
      },
      {
        name: 'getContextAttributes',
        description: 'Get the context attributes used.',
        returns: {
          name: 'contextAttributes',
          type: TYPES.object,
        },
      },
    ],
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
            type: TYPES.number,
          },
          {
            name: 'y',
            type: TYPES.number,
          },
          {
            name: 'width',
            type: TYPES.number,
          },
          {
            name: 'height',
            type: TYPES.number,
          },
        ],
      },
      {
        name: 'strokeRect',
        description: 'Plot a rectangle and apply a stroke to it.',
        arguments: [
          {
            name: 'x',
            type: TYPES.number,
          },
          {
            name: 'y',
            type: TYPES.number,
          },
          {
            name: 'width',
            type: TYPES.number,
          },
          {
            name: 'height',
            type: TYPES.number,
          },
          {
            name: 'stroke',
            type: TYPES.string,
            optional: true,
          },
        ],
      },
      {
        name: 'fillRect',
        description: 'Plot a rectangle and apply a fill to it.',
        arguments: [
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'width',
            type: TYPES.number
          },
          {
            name: 'height',
            type: TYPES.number
          },
          {
            name: 'fill',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'width',
            type: TYPES.number
          },
          {
            name: 'height',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'strokeRoundedRect',
        description: 'Plot a rounded rectangle and apply a stroke to it.',
        arguments: [
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'width',
            type: TYPES.number
          },
          {
            name: 'height',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'width',
            type: TYPES.number
          },
          {
            name: 'height',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'fill',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'fill',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'sides',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'sides',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'sides',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'fill',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'sides',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'sides',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'sides',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'fill',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'outerRadius',
            type: TYPES.number
          },
          {
            name: 'innerRadius',
            type: TYPES.number
          },
          {
            name: 'sides',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'outerRadius',
            type: TYPES.number
          },
          {
            name: 'innerRadius',
            type: TYPES.number
          },
          {
            name: 'sides',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'outerRadius',
            type: TYPES.number
          },
          {
            name: 'innerRadius',
            type: TYPES.number
          },
          {
            name: 'sides',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'fill',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'strokePixel',
        description: 'Plot a single pixel and apply a stroke to it.',
        arguments: [
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'fill',
            type: TYPES.string,
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
            type: TYPES.array
          }
        ]
      },
      {
        name: 'strokeClosedPath',
        description: 'Plot a closed path and apply a stroke to it.',
        arguments: [
          {
            name: 'points',
            type: TYPES.array
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.array
          },
          {
            name: 'fill',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y1',
            type: TYPES.number
          },
          {
            name: 'x2',
            type: TYPES.number
          },
          {
            name: 'y2',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'strokeLine',
        description: 'Plot a line and apply a stroke to it.',
        arguments: [
          {
            name: 'x1',
            type: TYPES.number
          },
          {
            name: 'y1',
            type: TYPES.number
          },
          {
            name: 'x2',
            type: TYPES.number
          },
          {
            name: 'y2',
            type: TYPES.number
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'length',
            type: TYPES.number
          },
          {
            name: 'angle',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'strokeLength',
        description: 'Plot a line, by length & angle, and apply a stroke to it.',
        arguments: [
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'length',
            type: TYPES.number
          },
          {
            name: 'angle',
            type: TYPES.number
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.array
          }
        ]
      },
      {
        name: 'strokePath',
        description: 'Plot a path, that is not self closing, and apply a stroke to it.',
        arguments: [
          {
            name: 'points',
            type: TYPES.array
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.array
          },
          {
            name: 'fill',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'startAngle',
            type: TYPES.number
          },
          {
            name: 'endAngle',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'startAngle',
            type: TYPES.number
          },
          {
            name: 'endAngle',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          },
          {
            name: 'startAngle',
            type: TYPES.number
          },
          {
            name: 'endAngle',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'fill',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radiusX',
            type: TYPES.number
          },
          {
            name: 'radiusY',
            type: TYPES.number
          },
          {
            name: 'rotation',
            type: TYPES.number
          },
          {
            name: 'startAngle',
            type: TYPES.number
          },
          {
            name: 'endAngle',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radiusX',
            type: TYPES.number
          },
          {
            name: 'radiusY',
            type: TYPES.number
          },
          {
            name: 'rotation',
            type: TYPES.number
          },
          {
            name: 'startAngle',
            type: TYPES.number
          },
          {
            name: 'endAngle',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'radiusX',
            type: TYPES.number
          },
          {
            name: 'radiusY',
            type: TYPES.number
          },
          {
            name: 'rotation',
            type: TYPES.number
          },
          {
            name: 'startAngle',
            type: TYPES.number
          },
          {
            name: 'endAngle',
            type: TYPES.number
          },
          {
            name: 'counterClockwise',
            type: TYPES.boolean,
            optional: true
          },
          {
            name: 'fill',
            type: TYPES.string,
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
            type: TYPES.string
          },
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'maxWidth',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'stroke',
            type: TYPES.string,
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
            type: TYPES.string
          },
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'maxWidth',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'fill',
            type: TYPES.string,
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
          type: TYPES.text
        }
      },
      {
        name: 'setTextAlign',
        description: 'Set the horizontal text alignment.',
        arguments: [
          {
            name: 'alignment',
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getTextAlign',
        description: 'Get the horizontal text alignment.',
        returns: {
          name: 'alignment',
          type: TYPES.string
        }
      },
      {
        name: 'setTextBaseline',
        description: 'Set the vertical text alignment.',
        arguments: [
          {
            name: 'alignment',
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getTextBaseline',
        description: 'Get the vertical text alignment.',
        returns: {
          name: 'alignment',
          type: TYPES.string
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
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getFont',
        description: 'Get the font that is being used.',
        returns: {
          name: 'font',
          type: TYPES.string
        }
      },
      {
        name: 'setFontFamily',
        description: 'Set the font family to use.',
        arguments: [
          {
            name: 'fontFamily',
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getFontFamily',
        description: 'Get the font that is being used.',
        returns: {
          name: 'fontFamily',
          type: TYPES.string
        }
      },
      {
        name: 'setFontSize',
        description: 'Set the font size to use.',
        arguments: [
          {
            name: 'fontSize',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'getFontSize',
        description: 'Get the font size that is being used.',
        returns: {
          name: 'fontSize',
          type: [TYPES.number, TYPES.string]
        }
      },
      {
        name: 'setFontStyle',
        description: 'Set the font style to use.',
        arguments: [
          {
            name: 'fontStyle',
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getFontStyle',
        description: 'Get the font style that is being used.',
        returns: {
          name: 'fontStyle',
          type: TYPES.string
        }
      },
      {
        name: 'setFontVariant',
        description: 'Set the font variant to use.',
        arguments: [
          {
            name: 'fontVariant',
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getFontVariant',
        description: 'Get the font variant that is being used.',
        returns: {
          name: 'fontVariant',
          type: TYPES.string
        }
      },
      {
        name: 'setFontWeight',
        description: 'Set the font weight to use.',
        arguments: [
          {
            name: 'fontWeight',
            type: [TYPES.number, TYPES.string]
          }
        ]
      },
      {
        name: 'getFontWeight',
        description: 'Get the font weight that is being used.',
        returns: {
          name: 'fontWeight',
          type: TYPES.string
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
            type: TYPES.string,
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
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getStroke',
        alias: 'getStrokeStyle',
        description: 'Get the stroke style that is being used.',
        returns: {
          name: 'strokeStyle',
          type: TYPES.string
        }
      },
      {
        name: 'setStrokeCap',
        alias: 'setLineCap',
        description: 'Set the stroke cap to use.',
        arguments: [
          {
            name: 'strokeCap',
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getStrokeCap',
        alias: 'getLineCap',
        description: 'Get the stroke cap that is being used.',
        returns: {
          name: 'strokeCap',
          type: TYPES.string
        }
      },
      {
        name: 'setStrokeDash',
        alias: 'setLineDash',
        description: 'Set the stroke dash to use.',
        arguments: [
          {
            name: 'strokeDash',
            type: TYPES.array
          }
        ]
      },
      {
        name: 'getStrokeDash',
        alias: 'getLineDash',
        description: 'Get the stroke dash that is being used.',
        returns: {
          name: 'strokeDash',
          type: TYPES.array
        }
      },
      {
        name: 'setStrokeDashOffset',
        alias: 'setLineDashOffset',
        description: 'Set the stroke dash offset to use.',
        arguments: [
          {
            name: 'strokeDashOffset',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'getStrokeDashOffset',
        alias: 'getLineDashOffset',
        description: 'Get the stroke dash offset that is being used.',
        returns: {
          name: 'strokeDashOffset',
          type: TYPES.number
        }
      },
      {
        name: 'setStrokeJoin',
        alias: 'setLineJoin',
        description: 'Set the stroke join to use.',
        arguments: [
          {
            name: 'strokeJoin',
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getStrokeJoin',
        alias: 'getLineJoin',
        description: 'Get the stroke join that is being used.',
        returns: {
          name: 'strokeJoin',
          type: TYPES.string
        }
      },
      {
        name: 'setStrokeWidth',
        alias: 'setLineWidth',
        description: 'Set the stroke width to use.',
        arguments: [
          {
            name: 'strokeWidth',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'getStrokeWidth',
        alias: 'getLineWidth',
        description: 'Get the stroke width that is being used.',
        returns: {
          name: 'strokeWidth',
          type: TYPES.number
        }
      },
      {
        name: 'setMiterLimit',
        description: 'Set the miter limit to use.',
        arguments: [
          {
            name: 'miterLimit',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'getMiterLimit',
        description: 'Get the miter limit that is being used.',
        returns: {
          name: 'miterLimit',
          type: TYPES.number
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
            type: TYPES.string,
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
            type: TYPES.string,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'width',
            type: TYPES.number
          },
          {
            name: 'height',
            type: TYPES.number
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
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getFill',
        alias: 'getFillStyle',
        description: 'Get the fill that is being used.',
        returns: {
          name: 'fill',
          type: TYPES.string
        }
      },
      {
        name: 'createLinearGradient',
        description: 'Create a linear gradient to use as a fill.',
        arguments: [
          {
            name: 'x1',
            type: TYPES.number
          },
          {
            name: 'y1',
            type: TYPES.number
          },
          {
            name: 'x2',
            type: TYPES.number
          },
          {
            name: 'y2',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'gradient',
          type: TYPES.gradient
        }
      },
      {
        name: 'createRadialGradient',
        description: 'Create a radial gradient to use as a fill.',
        arguments: [
          {
            name: 'x1',
            type: TYPES.number
          },
          {
            name: 'y1',
            type: TYPES.number
          },
          {
            name: 'radius1',
            type: TYPES.number
          },
          {
            name: 'x2',
            type: TYPES.number
          },
          {
            name: 'y2',
            type: TYPES.number
          },
          {
            name: 'radius2',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'gradient',
          type: TYPES.gradient
        }
      },
      {
        name: 'createPattern',
        description: 'Create a pattern to be used as a fill.',
        arguments: [
          {
            name: 'image',
            type: TYPES.image
          },
          {
            name: 'repetition',
            type: TYPES.string
          }
        ],
        returns: {
          name: 'pattern',
          type: TYPES.pattern
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
            type: TYPES.image
          },
          {
            name: 'x1',
            type: TYPES.number
          },
          {
            name: 'y1',
            type: TYPES.number
          },
          {
            name: 'width1',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'height1',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'x2',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'y2',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'width2',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'height2',
            type: TYPES.number,
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
            type: TYPES.string,
            optional: true
          },
          {
            name: 'quality',
            type: TYPES.number,
            optional: true
          }
        ],
        returns: {
          name: 'url',
          type: TYPES.dataUrl
        }
      },
      {
        name: 'createImageData',
        description: 'Create image data with either the width and height specified, ' +
          'or with the width and height of a the image data supplied.',
        arguments: [
          {
            name: 'width',
            type: TYPES.number
          },
          {
            name: 'height',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'imageData',
          type: TYPES.imageData
        }
      },
      {
        name: 'getImageData',
        description: 'Get the image data from an area of the canvas.',
        arguments: [
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'width',
            type: TYPES.number
          },
          {
            name: 'height',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'imageData',
          type: TYPES.imageData
        }
      },
      {
        name: 'putImageData',
        description: 'Draw image data onto the canvas.',
        arguments: [
          {
            name: 'imageData',
            type: TYPES.imageData
          },
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'cropX',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'cropY',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'cropWidth',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'cropHeight',
            type: TYPES.number,
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'imageData',
          type: TYPES.imageData
        }
      },
      {
        name: 'getPixelColor',
        description: 'Get the color of a specific pixel.',
        arguments: [
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'color',
          type: TYPES.string
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
            type: TYPES.number
          },
          {
            name: 'saturation',
            type: TYPES.number
          },
          {
            name: 'lightness',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'color',
          type: TYPES.string
        }
      },
      {
        name: 'createHSLA',
        description: 'Create an HSLA color string from the given values.',
        arguments: [
          {
            name: 'hue',
            type: TYPES.number
          },
          {
            name: 'saturation',
            type: TYPES.number
          },
          {
            name: 'lightness',
            type: TYPES.number
          },
          {
            name: 'alpha',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'color',
          type: TYPES.string
        }
      },
      {
        name: 'createRGB',
        description: 'Create an RGB color string from the given values.',
        arguments: [
          {
            name: 'red',
            type: TYPES.number
          },
          {
            name: 'green',
            type: TYPES.number
          },
          {
            name: 'blue',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'color',
          type: TYPES.string
        }
      },
      {
        name: 'createRGBA',
        description: 'Create an RGBA color string from the given values.',
        arguments: [
          {
            name: 'red',
            type: TYPES.number
          },
          {
            name: 'green',
            type: TYPES.number
          },
          {
            name: 'blue',
            type: TYPES.number
          },
          {
            name: 'alpha',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'color',
          type: TYPES.string
        }
      },
      {
        name: 'getHSLFromHSLA',
        description: 'Return an HSL color string from the given HSLA color string.',
        arguments: [
          {
            name: 'color',
            type: TYPES.string
          }
        ],
        returns: {
          name: 'color',
          type: TYPES.string
        }
      },
      {
        name: 'getRGBFromRGBA',
        description: 'Return an RGB color string from the given RGBA color string.',
        arguments: [
          {
            name: 'color',
            type: TYPES.string
          }
        ],
        returns: {
          name: 'color',
          type: TYPES.string
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
            type: TYPES.number
          }
        ],
        returns: {
          name: 'fraction',
          type: TYPES.number
        }
      },
      {
        name: 'getPercentFromFraction',
        description: 'Get a percent from the provided fraction value e.g. 0.7 returns 70.',
        arguments: [
          {
            name: 'fraction',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'percent',
          type: TYPES.number
        }
      },
      {
        name: 'getFractionOfWidth',
        description: 'Returns the actual value of a fraction of the canvas width e.g. ' +
          'a canvas with a width of 200 returns 100 if the provided value is 0.5.',
        arguments: [
          {
            name: 'fraction',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'width',
          type: TYPES.number
        }
      },
      {
        name: 'getFractionOfHeight',
        description: 'Returns the actual value of a fraction of the canvas height e.g. ' +
          'a canvas with a height of 100 returns 20 if the provided value is 0.2.',
        arguments: [
          {
            name: 'fraction',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'height',
          type: TYPES.number
        }
      },
      {
        name: 'getPercentOfWidth',
        description: 'Returns the actual value of a percentage of the canvas width e.g. ' +
          'a canvas with a width of 200 returns 100 if the provided value is 50.',
        arguments: [
          {
            name: 'percent',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'width',
          type: TYPES.number
        }
      },
      {
        name: 'getPercentOfHeight',
        description: 'Returns the actual value of a percentage of the canvas height e.g. ' +
          'a canvas with a height of 100 returns 20 if the provided value is 20.',
        arguments: [
          {
            name: 'percent',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'height',
          type: TYPES.number
        }
      },
      {
        name: 'getDistance',
        description: 'Returns the distance between 2 points.',
        arguments: [
          {
            name: 'x1',
            type: TYPES.number
          },
          {
            name: 'y1',
            type: TYPES.number
          },
          {
            name: 'x2',
            type: TYPES.number
          },
          {
            name: 'y2',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'distance',
          type: TYPES.number
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
            type: TYPES.number
          }
        ],
        returns: {
          name: 'radians',
          type: TYPES.number
        }
      },
      {
        name: 'getDegreesFromRadians',
        description: 'Get a degree value from the provided radians e.g. 3.14159 returns 180.',
        arguments: [
          {
            name: 'radians',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'degrees',
          type: TYPES.number
        }
      },
      {
        name: 'getAngle',
        description: 'Get the angle (in radians) between 2 or 3 points.',
        arguments: [
          {
            name: 'x1',
            type: TYPES.number
          },
          {
            name: 'y1',
            type: TYPES.number
          },
          {
            name: 'x2',
            type: TYPES.number
          },
          {
            name: 'y2',
            type: TYPES.number
          },
          {
            name: 'x3',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'y3',
            type: TYPES.number,
            optional: true
          }
        ],
        returns: {
          name: 'angle',
          type: TYPES.number
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
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'lineTo',
        description: 'Connect the last point to the provided coordinates.',
        arguments: [
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'arcTo',
        description: 'Arc from one point to another.',
        arguments: [
          {
            name: 'x1',
            type: TYPES.number
          },
          {
            name: 'y1',
            type: TYPES.number
          },
          {
            name: 'x2',
            type: TYPES.number
          },
          {
            name: 'y2',
            type: TYPES.number
          },
          {
            name: 'radius',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'bezierCurveTo',
        description: 'Connect the last point to the provided coordinates with a bezier curve (2 control points).',
        arguments: [
          {
            name: 'controlPoint1X',
            type: TYPES.number
          },
          {
            name: 'controlPoint1Y',
            type: TYPES.number
          },
          {
            name: 'controlPoint2X',
            type: TYPES.number
          },
          {
            name: 'controlPoint2Y',
            type: TYPES.number
          },
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'quadraticCurveTo',
        description: 'Connect the last point to the provided coordinates with a quadratic curve (1 control point).',
        arguments: [
          {
            name: 'controlPointX',
            type: TYPES.number
          },
          {
            name: 'controlPointY',
            type: TYPES.number
          },
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
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
            type: TYPES.number
          }
        ]
      },
      {
        name: 'scale',
        description: 'Scale the transform matrix so that shapes can be drawn at the provided scale.',
        arguments: [
          {
            name: 'scale',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'translate',
        description: 'Move the canvas origin.',
        arguments: [
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'transform',
        description: 'Multiply the current transformation with the provided matrix.',
        arguments: [
          {
            name: 'horizontalScale',
            type: TYPES.number
          },
          {
            name: 'horizontalSkew',
            type: TYPES.number
          },
          {
            name: 'verticalSkew',
            type: TYPES.number
          },
          {
            name: 'verticalScale',
            type: TYPES.number
          },
          {
            name: 'horizontalMove',
            type: TYPES.number
          },
          {
            name: 'verticalMove',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'setTransform',
        description: 'Replace the current transformation with the provided matrix.',
        arguments: [
          {
            name: 'horizontalScale',
            type: TYPES.number
          },
          {
            name: 'horizontalSkew',
            type: TYPES.number
          },
          {
            name: 'verticalSkew',
            type: TYPES.number
          },
          {
            name: 'verticalScale',
            type: TYPES.number
          },
          {
            name: 'horizontalMove',
            type: TYPES.number
          },
          {
            name: 'verticalMove',
            type: TYPES.number
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
            type: TYPES.path,
            optional: true
          },
          {
            name: 'fillRule',
            type: TYPES.string,
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
            type: TYPES.number
          }
        ]
      },
      {
        name: 'getOpacity',
        alias: 'getGlobalAlpha',
        description: 'Get the opacity that is being used.',
        returns: {
          name: 'opacity',
          type: TYPES.number
        }
      },
      {
        name: 'setCompositeOperation',
        alias: 'setGlobalCompositeOperation',
        description: 'Set the composite operation to use for drawing.',
        arguments: [
          {
            name: 'compositeOperation',
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getCompositeOperation',
        alias: 'getGlobalCompositeOperation',
        description: 'Get the composite operation that is being used.',
        returns: {
          name: 'compositeOperation',
          type: TYPES.string
        }
      },
      {
        name: 'setImageSmoothingEnabled',
        description: 'Set whether image smoothing should be used.',
        arguments: [
          {
            name: 'imageSmoothingEnabled',
            type: TYPES.boolean
          }
        ]
      },
      {
        name: 'getImageSmoothingEnabled',
        description: 'Get whether image smoothing is being used.',
        returns: {
          name: 'imageSmoothingEnabled',
          type: TYPES.boolean
        }
      },
      {
        name: 'setShadowBlur',
        description: 'Set how blurry shadows are.',
        arguments: [
          {
            name: 'shadowBlur',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'getShadowBlur',
        description: 'Get the value of how blurry shadows are.',
        returns: {
          name: 'shadowBlur',
          type: TYPES.number
        }
      },
      {
        name: 'setShadowColor',
        description: 'Set the color to be used for shadows.',
        arguments: [
          {
            name: 'color',
            type: TYPES.string
          }
        ]
      },
      {
        name: 'getShadowColor',
        description: 'Get the color being used for shadows.',
        returns: {
          name: 'color',
          type: TYPES.string
        }
      },
      {
        name: 'setShadowOffsetX',
        description: 'Set how horizontally offset shadows should be.',
        arguments: [
          {
            name: 'offset',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'getShadowOffsetX',
        description: 'Get the value of how horizontally offset shadows should be.',
        returns: {
          name: 'offset',
          type: TYPES.number
        }
      },
      {
        name: 'setShadowOffsetY',
        description: 'Set how vertically offset shadows should be.',
        arguments: [
          {
            name: 'offset',
            type: TYPES.number
          }
        ]
      },
      {
        name: 'getShadowOffsetY',
        description: 'Get the value of how vertically offset shadows should be.',
        returns: {
          name: 'offset',
          type: TYPES.number
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
            type: TYPES.function
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
            type: TYPES.number,
            optional: true
          },
          {
            name: 'end',
            type: TYPES.number
          },
          {
            name: 'step',
            type: TYPES.number,
            optional: true
          },
          {
            name: 'callback',
            type: TYPES.function
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
            type: [TYPES.array, TYPES.object, TYPES.string]
          },
          {
            name: 'callback',
            type: TYPES.function
          }
        ]
      },
      {
        name: 'constrain',
        description: 'Constrain a number between a minimum and maximum value.',
        arguments: [
          {
            name: 'value',
            type: TYPES.number
          },
          {
            name: 'minimum',
            type: TYPES.number
          },
          {
            name: 'maximum',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'value',
          type: TYPES.number
        }
      },
      {
        name: 'map',
        description: 'Map a value from one range to another e.g. ' +
          'mapping 0.5 from 0-1 to 0-10 returns 5.',
        arguments: [
          {
            name: 'value',
            type: TYPES.number
          },
          {
            name: 'fromStart',
            type: TYPES.number
          },
          {
            name: 'fromEnd',
            type: TYPES.number
          },
          {
            name: 'toStart',
            type: TYPES.number
          },
          {
            name: 'toEnd',
            type: TYPES.number
          }
        ],
        returns: {
          name: 'value',
          type: TYPES.number
        }
      },
      {
        name: 'drawFocusIfNeeded',
        description: 'Draw a focus ring around the current path, or the path supplied, ' +
          'if the element supplied has focus.',
        arguments: [
          {
            name: 'path',
            type: TYPES.path,
            optional: true
          },
          {
            name: 'element',
            type: TYPES.htmlElement
          }
        ]
      },
      {
        name: 'isPointInPath',
        description: 'Returns whether the given point is within the current or given path.',
        arguments: [
          {
            name: 'path',
            type: TYPES.path,
            optional: true
          },
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          },
          {
            name: 'fillRule',
            type: TYPES.string,
            optional: true
          }
        ],
        returns: {
          name: 'isPointInPath',
          type: TYPES.boolean
        }
      },
      {
        name: 'isPointInStroke',
        description: 'Returns whether the given point is within the area contained by applying ' +
          'a stroke to the current or given path.',
        arguments: [
          {
            name: 'path',
            type: TYPES.path,
            optional: true
          },
          {
            name: 'x',
            type: TYPES.number
          },
          {
            name: 'y',
            type: TYPES.number
          }
        ]
      }
    ]
  },
];

export default DOCS;
