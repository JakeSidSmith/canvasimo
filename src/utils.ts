import {
  DEFAULT_FONT,
  INCORRECT_POINT_FORMAT,
  MATCHES_FONT_SIZE,
  MATCHES_FONT_STYLE,
  MATCHES_FONT_VARIANT,
  MATCHES_FONT_WEIGHT,
  MATCHES_NORMAL,
  MATCHES_SPECIAL_FILL,
  MATCHES_SPECIAL_FONT,
  MATCHES_WHITESPACE,
} from './constants';
import {
  FillRule,
  Points,
} from './types';

export const isPoint = (point?: {x: number, y: number} | [number, number] | number):
  point is {x: number, y: number} => {
  return typeof point === 'object' && 'x' in point && 'y' in point;
};

export const isTuplePoint = (point?: {x: number, y: number} | [number, number] | number):
  point is [number, number] => {
  return typeof point === 'object' && Array.isArray(point) && point.length === 2;
};

export const getFontParts = (input: string | undefined, density: number) => {
  if (!input) {
    return DEFAULT_FONT;
  }

  const font = input.trim();

  if (MATCHES_SPECIAL_FONT.test(font)) {
    return [font];
  }

  const matchFontSize = MATCHES_FONT_SIZE.exec(font);

  if (!matchFontSize) {
    return DEFAULT_FONT;
  }

  const leadingSpaces = matchFontSize[1].length;
  const size = matchFontSize[2];
  const unit = matchFontSize[3];

  const fontSize = (unit !== '%' ? parseFloat(size) * density : size) + unit;

  const parts = font.substring(matchFontSize.index + leadingSpaces).split(MATCHES_WHITESPACE);
  const fontFamily = parts[parts.length - 1];

  const optional = font.substring(0, matchFontSize.index);
  const optionalParts = optional ? optional.split(MATCHES_WHITESPACE) : null;

  let fontStyle;
  let fontVariant;
  let fontWeight;

  if (optionalParts) {
    while (optionalParts.length) {
      if (MATCHES_FONT_STYLE.test(optionalParts[0])) {
        fontStyle = optionalParts.splice(0, 1)[0];
      } else if (MATCHES_FONT_VARIANT.test(optionalParts[0])) {
        fontVariant = optionalParts.splice(0, 1)[0];
      } else if (MATCHES_FONT_WEIGHT.test(optionalParts[0])) {
        fontWeight = optionalParts.splice(0, 1)[0];
      } else if (MATCHES_NORMAL.test(optionalParts[0])) {
        optionalParts.splice(0, 1);
      } else {
        return DEFAULT_FONT;
      }
    }
  }

  return [
    fontStyle || DEFAULT_FONT[0],
    fontVariant || DEFAULT_FONT[1],
    fontWeight || DEFAULT_FONT[2],
    fontSize,
    fontFamily,
  ];
};

export const formatFont = (input: string, density: number): string => getFontParts(input, density).join(' ');

export const forPoints = (points: Points, callback: (x: number, y: number, index: number) => any): void => {
  if (!Array.isArray(points) || (typeof points[0] === 'number' && (points.length % 2) !== 0)) {
    throw new Error(INCORRECT_POINT_FORMAT);
  }

  if (!points.length || points.length === 1 || (typeof points[0] === 'number' && points.length < 4)) {
    return;
  }

  const firstPoint = points[0];
  const secondPoint = points[1];

  if (isPoint(firstPoint)) {
    (points as Array<{x: number, y: number}>).forEach((point, index) => {
      if (!isPoint(point)) {
        throw new Error(`Expected point with format {x, y} but got ${point}`);
      }

      callback(point.x, point.y, index);
    });
  } else if (isTuplePoint(firstPoint)) {
    (points as Array<[number, number]>).forEach((point, index) => {
      if (!isTuplePoint(point)) {
        throw new Error(`Expected point with format [x, y] but got ${point}`);
      }

      callback(point[0], point[1], index);
    });
  } else if (typeof secondPoint === 'number') {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < points.length; i += 2) {
      const pointX = points[i];
      const pointY = points[i + 1];

      if (typeof pointX !== 'number' || typeof pointY !== 'number') {
        throw new Error(`Expected points to be an array of numbers but got ${pointX}, ${pointY}`);
      }

      callback(pointX, pointY, i / 2);
    }
  } else {
    throw new Error(INCORRECT_POINT_FORMAT);
  }
};

export const isFillRule = (value: any): value is FillRule => typeof value === 'string' &&
  MATCHES_SPECIAL_FILL.test(value);
