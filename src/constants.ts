export const PROPERTY_MAP = {
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
  textBaseline: 'textBaseline',
};

export const IMAGE_SMOOTHING_KEYS = [
  'imageSmoothingEnabled',
  'msImageSmoothingEnabled',
  'mozImageSmoothingEnabled',
  'webkitImageSmoothingEnabled',
];

export const CONTEXT_TYPE = '2d';

export const INCORRECT_POINT_FORMAT = `Path points must be an array of:\n
 numbers [x, y, x, y], pairs [[x, y], [x, y]], or objects [{x, y}, {x, y}].`;

export const DEFAULT_FONT = ['normal', 'normal', 'normal', '10px', 'sans-serif'];

export const MATCHES_SPECIAL_FILL = /^(nonzero|evenodd)$/i;
export const MATCHES_NORMAL = /^(normal)$/i;
export const MATCHES_FONT_STYLE = /^(italic|oblique)$/i;
export const MATCHES_FONT_VARIANT = /^(small-caps)$/i;
export const MATCHES_FONT_WEIGHT = /^(bold|bolder|lighter|\d00)$/i;
export const MATCHES_SPECIAL_FONT = /^(caption|icon|menu|message-box|small-caption|status-bar)$/i;
export const MATCHES_WHITESPACE = /\s+/g;
