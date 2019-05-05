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
] as Array<'imageSmoothingEnabled'>;

export const IMAGE_SMOOTHING_QUALITY_KEYS = [
  'imageSmoothingQuality',
  'msImageSmoothingQuality',
  'mozImageSmoothingQuality',
  'webkitImageSmoothingQuality',
] as Array<'imageSmoothingQuality'>;

export const CONTEXT_TYPE = '2d';

export const INCORRECT_POINT_FORMAT = `Path points must be an array of:\n
 numbers [x, y, x, y], pairs [[x, y], [x, y]], or objects [{x, y}, {x, y}].`;

export const INCORRECT_GET_ANGLE_ARGUMENTS = 'Incorrect number of arguments supplied for getAngle. ' +
 'Arguments must be [x1, y1, x2, y2] or [x1, y1, x2, y2, x3, y3].';

export const DEFAULT_FONT_PARTS = ['normal', 'normal', 'normal', '10px', 'sans-serif'];
export const DEFAULT_FONT = DEFAULT_FONT_PARTS.join(' ');
export const DEFAULT_DENSITY = 1;

export const MATCHES_SPECIAL_FILL = /^(nonzero|evenodd)$/i;
export const MATCHES_NORMAL = /^(normal)$/i;
export const MATCHES_FONT_STYLE = /^(italic|oblique)$/i;
export const MATCHES_FONT_VARIANT = /^(small-caps)$/i;
export const MATCHES_FONT_WEIGHT = /^(bold|bolder|lighter|\d00)$/i;
export const MATCHES_SPECIAL_FONT = /^(caption|icon|menu|message-box|small-caption|status-bar)$/i;
export const MATCHES_WHITESPACE = /\s+/g;
export const MATCHES_ALL_WHITESPACE = /^\s*$/;
export const MATCHES_FONT_SIZE = /(^|\s+)(\d*\.?\d+)([a-z]+|%)(\/\d*\.?\d+(?:[a-z]+|%)?)?\s/i;
export const MATCHES_WORD_BREAKS = /(?![^\w\s])\b/g;

export const DEFAULT_CONTEXT_VALUES: {[i: string]: string | number} = {
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  strokeStyle: '#000000',
  fillStyle: '#000000',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 0,
  shadowColor: 'rgba(0, 0, 0, 0)',
  lineWidth: 1,
  lineCap: 'butt',
  lineJoin: 'miter',
  miterLimit: 10,
  lineDashOffset: 0,
  font: DEFAULT_FONT,
  textAlign: 'start',
  textBaseline: 'alphabetic',
};

export const DEFAULT_IMAGE_SMOOTHING_VALUES = {
  imageSmoothingEnabled: true,
  imageSmoothingQuality: 'low' as ImageSmoothingQuality,
};

export const DEFAULT_LINE_DASH = [];
