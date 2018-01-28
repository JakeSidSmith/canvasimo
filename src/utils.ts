import {
  DEFAULT_FONT,
  INCORRECT_POINT_FORMAT,
  MATCHES_FILL_RULE,
  MATCHES_FONT_STYLE,
  MATCHES_FONT_VARIANT,
  MATCHES_FONT_WEIGHT,
  MATCHES_NORMAL,
  MATCHES_SPECIAL_FONT,
  MATCHES_WHITESPACE,
} from './constants';
import {
  AnyPoint,
  FillRules,
  Point,
  PointArray,
  Points,
  TuplePoint,
  TuplePointArray,
} from './types';

export const isPoint = (point?: AnyPoint): point is Point => {
  return typeof point === 'object' && 'x' in point && 'y' in point;
};

export const isTuplePoint = (point?: AnyPoint): point is TuplePoint => {
  return typeof point === 'object' && Array.isArray(point) && point.length === 2;
};

export const getFontParts = (input?: string) => {
  if (!input) {
    return DEFAULT_FONT;
  }

  const font = input.trim();

  if (MATCHES_SPECIAL_FONT.test(font)) {
    return [font];
  }

  const matchFontSize = /(^|\s+)\d*\.?\d+([a-z]+|%)\s/i.exec(font);

  if (!matchFontSize) {
    return DEFAULT_FONT;
  }

  const numberOfLeadingSpaces = matchFontSize[1].length;
  const indexOfFontSize = matchFontSize.index;

  const requiredParts = font.substring(indexOfFontSize + numberOfLeadingSpaces).split(MATCHES_WHITESPACE);

  const optional = font.substring(0, indexOfFontSize);
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
    requiredParts.splice(0, 1)[0],
    requiredParts.join(' '),
  ];
};

export const formatFont = (input?: string): string => getFontParts(input).join(' ');

export const titleCase = (text?: string): string => text && text.charAt(0).toUpperCase() + text.substring(1) || '';

export const forPoints = (points: Points, callback: (x: number, y: number, index: number) => any): void => {
  if (!points || !points.length || (typeof points[0] === 'number' && points.length < 2)) {
    return;
  }

  const firstPoint = points[0];
  const secondPoint = points[1];

  if (isPoint(firstPoint)) {
    (points as PointArray).forEach((point, index) => {
      if (!isPoint(point)) {
        throw new Error(`Expected point with format {x, y} but got ${point}`);
      }

      callback(point.x, point.y, index);
    });
  } else if (isTuplePoint(firstPoint)) {
    (points as TuplePointArray).forEach((point, index) => {
      if (!isTuplePoint(point)) {
        throw new Error(`Expected point with format [x, y] but got ${point}`);
      }

      callback(point[0], point[1], index);
    });
  } else if (typeof firstPoint === 'number' && typeof secondPoint === 'number') {
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

export const isFillRule = (value: any): value is FillRules => typeof value === 'string' && MATCHES_FILL_RULE.test(value);
