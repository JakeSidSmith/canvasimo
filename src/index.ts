import {
  CONTEXT_TYPE,
  DEFAULT_FONT,
  IMAGE_SMOOTHING_KEYS,
  INCORRECT_GET_ANGLE_ARGUMENTS,
} from './constants';
import {
  BooleanFalsy,
  CanvasContext,
  CanvasContextAttributes,
  CreateImageData,
  DrawImage,
  Fill,
  FillOrStrokeStyle,
  FillRule,
  ForEach,
  GetAngle,
  GlobalCompositeOperation,
  LineCap,
  LineJoin,
  Points,
  Repeat,
  Segments,
  SetSize,
  Size,
  Stroke,
  TextAlign,
  TextBaseline,
} from './types';
import {
  formatFont,
  forPoints,
  getFontParts,
  isFillRule,
} from './utils';

const unsupportedMethodErrors: string[] = [];

const logUnsupportedMethodError = (method: string) => {
  if (unsupportedMethodErrors.indexOf(method) < 0) {
    unsupportedMethodErrors.push(method);
    // tslint:disable-next-line:no-console
    console.warn(`${method} is not supported by this browser`);
  }
};

export default class Canvasimo {
  private element: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private ctxType: typeof CONTEXT_TYPE = CONTEXT_TYPE;
  private density: number = 1;

  public constructor (element: HTMLCanvasElement) {
    this.element = element;
    const ctx = this.element.getContext(CONTEXT_TYPE);

    if (!ctx) {
      throw new Error('Could not get a CanvasRenderingContext from the provided element');
    }

    this.ctx = ctx;
    this.ctx.font = formatFont(ctx.font, this.density);
  }

  /**
   * @group Canvas element
   * @description A collection of methods for getting and setting various properties of the canvas element.
   */

  /**
   * Get the canvas element.
   * @alias getElement
   */
  public getCanvas = (): HTMLCanvasElement => this.element;
  public getElement = (): HTMLCanvasElement => this.getCanvas();
  /**
   * Set the canvas pixel density.
   */
  public setDensity = (density: number): Canvasimo => {
    const prevDensity = this.density;
    const multiplier = density / prevDensity;
    const prevFontSize = this.getFontSize();
    const prevLineDash = this.getLineDash();

    this.density = density;

    if (prevDensity !== density) {
      this.setSize(this.element.width, this.element.height);

      if (typeof prevFontSize === 'number') {
        this.setFontSize(prevFontSize);
      }

      this.setLineDash(prevLineDash);

      this.ctx.lineDashOffset *= multiplier;
      this.ctx.lineWidth *= multiplier;
      this.ctx.miterLimit *= multiplier;
      this.ctx.shadowBlur *= multiplier;
      this.ctx.shadowOffsetX *= multiplier;
      this.ctx.shadowOffsetY *= multiplier;
    }

    return this;
  }
  /**
   * Get the canvas pixel density.
   */
  public getDensity = (): number => this.density;
  /**
   * Set the canvas dimensions.
   */
  public setSize: SetSize = (width: number | Size, height?: number): Canvasimo => {
    if (typeof width === 'object') {
      this.element.width = width.width * this.density;
      this.element.height = width.height * this.density;
    } else if (typeof height === 'number') {
      this.element.width = width * this.density;
      this.element.height = height * this.density;
    }

    return this;
  }
  /**
   * Get the canvas dimensions.
   */
  public getSize = (): Size => ({
    width: this.element.width / this.density,
    height: this.element.height / this.density,
  })
  /**
   * Set the canvas width.
   */
  public setWidth = (width: number): Canvasimo => {
    this.element.width = width * this.density;
    return this;
  }
  /**
   * Get the canvas width.
   */
  public getWidth = (): number => this.element.width / this.density;
  /**
   * Set the canvas height.
   */
  public setHeight = (height: number): Canvasimo => {
    this.element.height = height * this.density;
    return this;
  }
  /**
   * Get the canvas height.
   */
  public getHeight = (): number => this.element.height / this.density;
  /**
   * Get the canvas size & position on screen.
   */
  public getBoundingClientRect = (): ClientRect => this.element.getBoundingClientRect();

  /**
   * @group Context
   * @description 'A collection of methods for retrieving a canvas context or information about the context.
   */

  /**
   * Get the standard canvas context (used for drawing).
   */
  public getContext = (type: string, contextAttributes?: CanvasContextAttributes): CanvasContext => {
    return this.element.getContext(type, contextAttributes);
  }
  /**
   * Get canvas context used by Canvasimo (2d).
   */
  public getCurrentContext = (): CanvasRenderingContext2D => this.ctx;
  /**
   * Get the context type used by Canvasimo ('2d', 'webgl', etc).
   */
  public getCurrentContextType = (): typeof CONTEXT_TYPE => this.ctxType;
  /**
   * Get the context attributes used.
   */
  public getContextAttributes = (): CanvasContextAttributes | null => {
    if (typeof (this.ctx as any).getContextAttributes !== 'function') {
      logUnsupportedMethodError('getContextAttributes');
      return null;
    }

    return (this.ctx as any).getContextAttributes();
  }

  /**
   * @group Solid Shapes
   * @description A collection of methods for plotting or drawing solid shapes -
   * those that create a new shape when invoked, and are self closing.
   */

  // plotRect',
  /**
   * Plot a rectangle that can then have a fill or stroke applied to it.
   * @alias rect
   */
  public plotRect = (x: number, y: number, width: number, height: number): Canvasimo => this.rect(x, y, width, height);
  public rect = (x: number, y: number, width: number, height: number): Canvasimo => {
    this.ctx.rect(x * this.density, y * this.density, width * this.density, height * this.density);
    return this;
  }
  /**
   * Plot a rectangle and apply a stroke to it.
   */
  public strokeRect = (x: number, y: number, width: number, height: number, color?: string): Canvasimo => {
    if (typeof color !== 'undefined') {
      this.setStroke(color);
    }
    this.ctx.strokeRect(x * this.density, y * this.density, width * this.density, height * this.density);
    return this;
  }
  /**
   *  Plot a rectangle and apply a fill to it.
   */
  public fillRect = (x: number, y: number, width: number, height: number, color?: string): Canvasimo => {
    if (typeof color !== 'undefined') {
      this.setFill(color);
    }
    this.ctx.fillRect(x * this.density, y * this.density, width * this.density, height * this.density);
    return this;
  }
  /**
   *  Plot a rounded rectangle that can then have a fill or stroke applied to it.
   */
  public plotRoundedRect = (x: number, y: number, width: number, height: number, radius: number): Canvasimo => {
    const minRadius = Math.min(width / 2, height / 2, radius);

    return this
      .beginPath()
      .moveTo(x + minRadius, y)
      .lineTo(x + width - minRadius, y)
      .arcTo(x + width, y, x + width, y + minRadius, minRadius)
      .lineTo(x + width, y + height - minRadius)
      .arcTo(x + width, y + height, x + width - minRadius, y + height, minRadius)
      .lineTo(x + minRadius, y + height)
      .arcTo(x, y + height, x, y + height - minRadius, minRadius)
      .lineTo(x, y + minRadius)
      .arcTo(x, y, x + minRadius, y, minRadius)
      .closePath();
  }
  /**
   *  Plot a rounded rectangle and apply a stroke to it.
   */
  public strokeRoundedRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    color?: string
  ): Canvasimo => {
    return this
      .plotRoundedRect(x, y, width, height, radius)
      .stroke(color);
  }
  /**
   *  Plot a rounded rectangle and apply a fill to it.
   */
  public fillRoundedRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    color?: string
  ): Canvasimo => {
    return this
      .plotRoundedRect(x, y, width, height, radius)
      .fill(color);
  }
  /**
   * Plot a circle that can then have a stroke or fill applied to it.
   */
  public plotCircle = (x: number, y: number, radius: number, anticlockwise?: BooleanFalsy): Canvasimo => {
    return this
      .beginPath()
      .plotArc(x, y, radius, 0, Math.PI * 2, anticlockwise)
      .closePath();
  }
  /**
   * Plot a circle and apply a stroke to it.
   */
  public strokeCircle = (
    x: number,
    y: number,
    radius: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    return this
      .plotCircle(x, y, radius, anticlockwise)
      .stroke(color);
  }
  /**
   * Plot a circle and apply a fill to it.
   */
  public fillCircle = (
    x: number,
    y: number,
    radius: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    return this
      .plotCircle(x, y, radius, anticlockwise)
      .fill(color);
  }
  /**
   * Plot a polygon that can then have a stroke or fill applied to it.
   */
  public plotPoly = (x: number, y: number, radius: number, sides: number, anticlockwise?: BooleanFalsy): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    const direction = anticlockwise ? -1 : 1;

    const beforeEnd = (i: number) => anticlockwise ? i > -sides : i < sides;

    this
      .beginPath()
      .moveTo(x + radius, y);

    for (let i = 0; beforeEnd(i); i += direction) {
      const angle = Math.PI * 2 / sides * i;
      this.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
    }

    return this.closePath();
  }
  /**
   * Plot a polygon and apply a stoke to it.
   */
  public strokePoly = (
    x: number,
    y: number,
    radius: number,
    sides: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotPoly(x, y, radius, sides, anticlockwise)
      .stroke(color);
  }
  /**
   * Plot a polygon and apply a fill to it.
   */
  public fillPoly = (
    x: number,
    y: number,
    radius: number,
    sides: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotPoly(x, y, radius, sides, anticlockwise)
      .fill(color);
  }
  /**
   * Plot a star that can then have a stroke or fill applied to it.
   */
  public plotStar = (x: number, y: number, radius1: number, sides: number, anticlockwise?: BooleanFalsy): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    } else if (sides === 3 || sides === 4) {
      return this.plotPoly(x, y, radius1, sides);
    }

    sides = sides * 2;

    const direction = anticlockwise ? -1 : 1;
    const offset = Math.PI * 2 / sides;
    const cross = Math.cos(offset * 2) * radius1;
    const radius2 = cross / Math.cos(offset);

    const beforeEnd = (i: number) => anticlockwise ? i > -sides : i < sides;

    this
      .beginPath()
      .moveTo(x + radius1, y);

    for (let i = 0; beforeEnd(i); i += direction) {
      const angle = offset * i;
      const radius = i % 2 ? radius2 : radius1;
      this.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
    }

    return this.closePath();
  }
  /**
   * Plot a star and apply a stoke to it.
   */
  public strokeStar = (
    x: number,
    y: number,
    radius1: number,
    sides: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotStar(x, y, radius1, sides, anticlockwise)
      .stroke(color);
  }
  /**
   * Plot a star and apply a fill to it.
   */
  public fillStar = (
    x: number,
    y: number,
    radius1: number,
    sides: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotStar(x, y, radius1, sides, anticlockwise)
      .fill(color);
  }
  /**
   * Plot a burst that can then have a stroke or fill applied to it.
   */
  public plotBurst = (
    x: number,
    y: number,
    radius1: number,
    radius2: number,
    sides: number,
    anticlockwise?: BooleanFalsy
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    sides = sides * 2;

    const direction = anticlockwise ? -1 : 1;
    const offset = Math.PI * 2 / sides;

    const beforeEnd = (i: number) => anticlockwise ? i > -sides : i < sides;

    this
      .beginPath()
      .moveTo(x + radius1, y);

    for (let i = 0; beforeEnd(i); i += direction) {
      const angle = offset * i;
      const radius = i % 2 ? radius2 : radius1;
      this.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
    }

    return this
      .closePath();
  }
  /**
   * Plot a burst and apply a stoke to it.
   */
  public strokeBurst = (
    x: number,
    y: number,
    radius1: number,
    radius2: number,
    sides: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotBurst(x, y, radius1, radius2, sides, anticlockwise)
      .stroke(color);
  }
  /**
   * Plot a burst and apply a fill to it.
   */
  public fillBurst = (
    x: number,
    y: number,
    radius1: number,
    radius2: number,
    sides: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotBurst(x, y, radius1, radius2, sides, anticlockwise)
      .fill(color);
  }
  /**
   * Plot a single pixel that can then have a stroke or fill applied to it.
   */
  public plotPixel = (x: number, y: number): Canvasimo => {
    return this
      .plotRect(x, y, 1, 1);
  }
  /**
   * Plot a single pixel and apply a stroke to it.
   */
  public strokePixel = (x: number, y: number, color?: string): Canvasimo => {
    return this
      .strokeRect(x, y, 1, 1, color);
  }
  /**
   * Plot a single pixel and apply a fill to it.
   */
  public fillPixel = (x: number, y: number, color?: string): Canvasimo => {
    return this
      .fillRect(x, y, 1, 1, color);
  }
  /**
   * Plot a closed path that can then have a stroke or fill applied to it.
   */
  public plotClosedPath = (points: Points): Canvasimo => {
    return this
      .beginPath()
      .plotPath(points)
      .closePath();
  }
  /**
   * Plot a closed path and apply a stroke to it.
   */
  public strokeClosedPath = (points: Points, color?: string): Canvasimo => {
    return this
      .plotClosedPath(points)
      .stroke(color);
  }
  /**
   * Plot a closed path and apply a fill to it.
   */
  public fillClosedPath = (points: Points, color?: string): Canvasimo => {
    return this
      .plotClosedPath(points)
      .fill(color);
  }

  /**
   * @group Open Shapes
   * @description A collection of methods for plotting or drawing open shapes -
   * those that create a new shape when invoked, but are not self closing.
   */

  /**
   *  Plot a line that can then have a stroke or fill applied to it.
   */
  public plotLine = (x1: number, y1: number, x2: number, y2: number): Canvasimo => {
    return this
      .moveTo(x1, y1)
      .lineTo(x2, y2);
  }
  /**
   *  Plot a line and apply a stroke to it.
   */
  public strokeLine = (x1: number, y1: number, x2: number, y2: number, color?: string): Canvasimo => {
    return this
      .plotLine(x1, y1, x2, y2)
      .stroke(color);
  }
  /**
   *  Plot a line, by length & angle, that can then have a stroke or fill applied to it.
   */
  public plotLength = (x1: number, y1: number, length: number, angle: number): Canvasimo => {
    const x2 = x1 + length * Math.cos(angle);
    const y2 = y1 + length * Math.sin(angle);

    return this
      .moveTo(x1, y1)
      .lineTo(x2, y2);
  }
  /**
   *  Plot a line, by length & angle, and apply a stroke to it.
   */
  public strokeLength = (x1: number, y1: number, length: number, angle: number, color?: string): Canvasimo => {
    return this
      .plotLength(x1, y1, length, angle)
      .stroke(color);
  }
  /**
   *  Plot a path, that is not self closing, that can have a stroke or fill applied to it.
   */
  public plotPath = (points: Points): Canvasimo => {
    forPoints(points, (x: number, y: number, i: number) => {
      if (i === 0) {
        this.moveTo(x, y);
      } else {
        this.lineTo(x, y);
      }
    });

    return this;
  }
  /**
   *  Plot a path, that is not self closing, and apply a stroke to it.
   */
  public strokePath = (points: Points, color?: string): Canvasimo => {
    return this
      .plotPath(points)
      .stroke(color);
  }
  /**
   *  Plot a path, that is not self closing, and apply a fill to it.
   */
  public fillPath = (points: Points, color?: string): Canvasimo => {
    return this
      .plotPath(points)
      .fill(color);
  }

  /**
   * @group Paths
   * @description A collection of methods for plotting or drawing paths -
   * shapes that can be connected to create more complex shapes.
   */

  /**
   * Plot an arc that can have a stroke or fill applied to it.
   * @alias arc
   */
  public plotArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: BooleanFalsy
  ): Canvasimo => {
    return this.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  }
  public arc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: BooleanFalsy
  ): Canvasimo => {
    this.ctx.arc(
      x * this.density,
      y * this.density,
      radius * this.density,
      startAngle,
      endAngle,
      anticlockwise || false
    );
    return this;
  }

  /**
   * Plot an arc and apply a stroke to it.
   */
  public strokeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    return this
      .plotArc(x, y, radius, startAngle, endAngle, anticlockwise)
      .stroke(color);
  }
  /**
   * Plot an arc and apply a fill to it.
   */
  public fillArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    return this
      .plotArc(x, y, radius, startAngle, endAngle, anticlockwise)
      .fill(color);
  }

  /**
   * Plot an ellipse that can then have a stroke or fill applied to it.
   * @alias ellipse
   */
  public plotEllipse = (
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: BooleanFalsy
  ): Canvasimo => {
    return this.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
  }
  public ellipse = (
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: BooleanFalsy
  ): Canvasimo => {
    // tslint:disable-next-line:strict-type-predicates
    if (typeof this.ctx.ellipse === 'function') {
      this.ctx.ellipse(
        x * this.density,
        y * this.density,
        radiusX * this.density,
        radiusY * this.density,
        rotation,
        startAngle,
        endAngle,
        anticlockwise || false
      );
      return this;
    }

    return this
      .save()
      .translate(x, y)
      .rotate(rotation)
      .scale(1, radiusY / radiusX)
      .plotArc(0, 0, radiusX, startAngle, endAngle, anticlockwise)
      .restore();
  }
  /**
   * Plot an ellipse and apply a stroke to it.
   */
  public strokeEllipse = (
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    return this
      .plotEllipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
      .stroke(color);
  }
  /**
   * Plot an ellipse and apply a fill to it.
   */
  public fillEllipse = (
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: BooleanFalsy,
    color?: string
  ): Canvasimo => {
    return this
      .plotEllipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
      .fill(color);
  }

  /**
   * @group Text
   * @description A collection of methods for drawing text,
   * and getting and setting properties related to text rendering.
   */

  /**
   * Draw a text with a stroke.
   */
  public strokeText = (text: string, x: number, y: number, maxWidth?: number, color?: string): Canvasimo => {
    if (typeof color !== 'undefined') {
      this.setStroke(color);
    }
    if (typeof maxWidth !== 'number') {
      this.ctx.strokeText(text, x * this.density, y * this.density);
    } else {
      this.ctx.strokeText(text, x * this.density, y * this.density, maxWidth * this.density);
    }
    return this;
  }
  /**
   * Draw a text with a fill.
   */
  public fillText = (text: string, x: number, y: number, maxWidth?: number, color?: string): Canvasimo => {
    if (typeof color !== 'undefined') {
      this.setFill(color);
    }
    // If max width is not a number (e.g. undefined) then iOS does not draw anything
    if (typeof maxWidth !== 'number') {
      this.ctx.fillText(text, x * this.density, y * this.density);
    } else {
      this.ctx.fillText(text, x * this.density, y * this.density, maxWidth * this.density);
    }
    return this;
  }
  /**
   * Get information about the size text will be drawn.
   * @alias measureText
   */
  public getTextSize = (text: string): TextMetrics => this.measureText(text);
  public measureText = (text: string): TextMetrics => ({
    width: (this.ctx.measureText(text).width || 0) / this.density,
  })
  /**
   * Set the horizontal text alignment.
   */
  public setTextAlign = (value: TextAlign): Canvasimo => this.setCanvasProperty('textAlign', value);
  /**
   * Get the horizontal text alignment.
   */
  public getTextAlign = (): TextAlign => this.getCanvasProperty('textAlign');
  /**
   * Set the vertical text alignment.
   */
  public setTextBaseline = (value: TextBaseline): Canvasimo => this.setCanvasProperty('textBaseline', value);
  /**
   * Get the vertical text alignment.
   */
  public getTextBaseline = (): TextBaseline => this.getCanvasProperty('textBaseline');

  /**
   * @group Fonts
   * @description A collection of methods for getting and setting font styles and variations.
   */

  /**
   * Set the font to use.
   */
  public setFont = (font: string): Canvasimo => {
    this.ctx.font = formatFont(font, this.density);
    return this;
  }
  /**
   * Get the font that is being used.
   */
  public getFont = (): string => {
    return formatFont(this.ctx.font, this.density);
  }
  /**
   * Set the font family to use.
   */
  public setFontFamily = (family: string): Canvasimo => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return this.setFont('');
    }
    parts[4] = family || DEFAULT_FONT[4];
    this.ctx.font = formatFont(parts.join(' '), this.density);
    return this;
  }
  /**
   * Get the font that is being used.
   */
  public getFontFamily = (): string | null => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return null;
    }
    return parts[4];
  }
  /**
   * Set the font size to use.
   */
  public setFontSize = (size: string | number): Canvasimo => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return this.setFont('');
    }
    parts[3] = (typeof size === 'number' ? size + 'px' : size) || DEFAULT_FONT[3];
    this.ctx.font = formatFont(parts.join(' '), this.density);
    return this;
  }
  /**
   * Get the font size that is being used.
   */
  public getFontSize = (): number | null => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return null;
    }
    return parseFloat(parts[3]);
  }
  /**
   * Set the font style to use.
   */
  public setFontStyle = (style: string): Canvasimo => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return this.setFont('');
    }
    parts[0] = style || DEFAULT_FONT[0];
    this.ctx.font = formatFont(parts.join(' '), this.density);
    return this;
  }
  /**
   * Get the font style that is being used.
   */
  public getFontStyle = (): string | null => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return null;
    }
    return parts[0];
  }
  /**
   * Set the font variant to use.
   */
  public setFontVariant = (variant: string): Canvasimo => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return this.setFont('');
    }
    parts[1] = variant || DEFAULT_FONT[1];
    this.ctx.font = formatFont(parts.join(' '), this.density);
    return this;
  }
  /**
   * Get the font variant that is being used.
   */
  public getFontVariant = (): string | null => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return null;
    }
    return parts[1];
  }
  /**
   * Set the font weight to use.
   */
  public setFontWeight = (weight: string | number): Canvasimo => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return this.setFont('');
    }
    parts[2] = weight.toString() || DEFAULT_FONT[2];
    this.ctx.font = formatFont(parts.join(' '), this.density);
    return this;
  }
  /**
   * Get the font weight that is being used.
   */
  public getFontWeight = (): string | number | null => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return null;
    }
    return parts[2];
  }

  /**
   * @group Stroke Styles
   * @description A collection of methods for getting and setting stroke styles,
   * and applying strokes to existing shapes.
   */

  /**
   * Apply a stroke to the current shape.
   */
  public stroke: Stroke = (color?: string | Path2D, path?: Path2D): Canvasimo => {
    if (typeof color === 'string') {
      this.setStroke(color);
      // tslint:disable-next-line:strict-type-predicates
      if (path && typeof path === 'object') {
        this.ctx.stroke(path);
      } else {
        this.ctx.stroke();
      }
    // tslint:disable-next-line:strict-type-predicates
    } else if (color && typeof color === 'object') {
      this.ctx.stroke(color);
    // tslint:disable-next-line:strict-type-predicates
    } else if (path && typeof path === 'object') {
      this.ctx.stroke(path);
    } else {
      this.ctx.stroke();
    }

    return this;
  }
  /**
   * Set the stroke style to use.
   * @alias setStrokeStyle
   */
  public setStroke = (value: FillOrStrokeStyle): Canvasimo => this.setStrokeStyle(value);
  public setStrokeStyle = (value: FillOrStrokeStyle): Canvasimo => this.setCanvasProperty('strokeStyle', value);
  /**
   * Get the stroke style that is being used.
   * @alias getStrokeStyle
   */
  public getStroke = (): FillOrStrokeStyle => this.getStrokeStyle();
  public getStrokeStyle = (): string => this.getCanvasProperty('strokeStyle');
  /**
   * Set the stroke cap to use.
   * @alias setLineCap
   */
  public setStrokeCap = (value: LineCap): Canvasimo => this.setLineCap(value);
  public setLineCap = (value: LineCap): Canvasimo => this.setCanvasProperty('lineCap', value);
  /**
   * Get the stroke cap that is being used.
   * @alias getLineCap
   */
  public getStrokeCap = (): LineCap => this.getLineCap();
  public getLineCap = (): LineCap => this.getCanvasProperty('lineCap');
  /**
   * Set the stroke dash to use.
   * @alias setLineDash
   */
  public setStrokeDash = (segments: Segments): Canvasimo => this.setLineDash(segments);
  public setLineDash = (segments: Segments): Canvasimo => {
    // tslint:disable-next-line:strict-type-predicates
    if (typeof this.ctx.setLineDash !== 'function') {
      logUnsupportedMethodError('setLineDash');
      return this;
    }

    this.ctx.setLineDash(segments.map((segment) => segment * this.density));
    return this;
  }
  /**
   * Get the stroke dash that is being used.
   * @alias getLineDash
   */
  public getStrokeDash = (): Segments => this.getLineDash();
  public getLineDash = (): Segments => {
    // tslint:disable-next-line:strict-type-predicates
    if (typeof this.ctx.getLineDash !== 'function') {
      logUnsupportedMethodError('getLineDash');
      return [];
    }

    return (this.ctx.getLineDash() || []).map((value) => value / this.density);
  }
  /**
   * Set the stroke dash offset to use.
   * @alias setLineDashOffset
   */
  public setStrokeDashOffset = (value: number): Canvasimo => this.setLineDashOffset(value);
  public setLineDashOffset = (value: number): Canvasimo => {
    return this.setCanvasProperty('lineDashOffset', value * this.density);
  }
  /**
   * Get the stroke dash offset that is being used.
   * @alias getLineDashOffset
   */
  public getStrokeDashOffset = (): number => this.getLineDashOffset();
  public getLineDashOffset = (): number => this.getCanvasProperty('lineDashOffset') / this.density;
  /**
   * Set the stroke join to use.
   * @alias setLineJoin
   */
  public setStrokeJoin = (value: LineJoin): Canvasimo => this.setLineJoin(value);
  public setLineJoin = (value: LineJoin): Canvasimo => this.setCanvasProperty('lineJoin', value);
  /**
   * Get the stroke join that is being used.
   * @alias getLineJoin
   */
  public getStrokeJoin = (): LineJoin => this.getLineJoin();
  public getLineJoin = (): LineJoin => this.getCanvasProperty('lineJoin');
  /**
   * Set the stroke width to use.
   * @alias setLineWidth
   */
  public setStrokeWidth = (value: number): Canvasimo => this.setLineWidth(value);
  public setLineWidth = (value: number): Canvasimo => this.setCanvasProperty('lineWidth', value * this.density);
  /**
   * Get the stroke width that is being used.
   * @alias getLineWidth
   */
  public getStrokeWidth = (): number => this.getLineWidth();
  public getLineWidth = (): number => this.getCanvasProperty('lineWidth') / this.density;
  /**
   * Set the miter limit to use.
   */
  public setMiterLimit = (value: number): Canvasimo => this.setCanvasProperty('miterLimit', value * this.density);
  /**
   * Get the miter limit that is being used.
   */
  public getMiterLimit = (): number => this.getCanvasProperty('miterLimit') / this.density;

  /**
   * @group Fill styles
   * @description A collection of methods for getting and setting fill styles,
   * and applying fills to existing shapes.
   */

  /**
   * Apply a fill to the current shape.
   */
  public fill: Fill = (color?: string | FillRule, fillRule?: FillRule): Canvasimo => {
    if (isFillRule(color)) {
      this.ctx.fill(color);
    } else if (typeof color === 'string') {
      this.setFill(color);
      if (fillRule) {
        this.ctx.fill(fillRule);
      } else {
        this.ctx.fill();
      }
    } else {
      this.ctx.fill(fillRule);
    }

    return this;
  }
  /**
   * Apply a fill to the entire canvas area.
   */
  public fillCanvas = (color?: string): Canvasimo => {
    return this
      .resetTransform()
      .fillRect(0, 0, this.getWidth(), this.getHeight(), color);
  }
  /**
   * Clear the entire canvas area
   */
  public clearCanvas = (): Canvasimo => {
    return this
      .setWidth(this.getWidth());
  }
  /**
   * Clear a rectangular area of the canvas.
   */
  public clearRect = (x: number, y: number, width: number, height: number): Canvasimo => {
    this.ctx.clearRect(x * this.density, y * this.density, width * this.density, height * this.density);
    return this;
  }
  /**
   * Set the fill to use.
   * @alias setFillStyle
   */
  public setFill = (value: FillOrStrokeStyle): Canvasimo => this.setFillStyle(value);
  public setFillStyle = (value: FillOrStrokeStyle): Canvasimo => this.setCanvasProperty('fillStyle', value);
  /**
   * Get the fill that is being used.
   * @alias getFillStyle
   */
  public getFill = (): FillOrStrokeStyle => this.getFillStyle();
  public getFillStyle = (): FillOrStrokeStyle => this.getCanvasProperty('fillStyle');
  /**
   * Create a linear gradient to use as a fill.
   */
  public createLinearGradient = (x0: number, y0: number, x1: number, y1: number): CanvasGradient => {
    return this.ctx.createLinearGradient(x0 * this.density, y0 * this.density, x1 * this.density, y1 * this.density);
  }
  /**
   * Create a radial gradient to use as a fill.
   */
  public createRadialGradient = (
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number
  ): CanvasGradient => {
    return this.ctx.createRadialGradient(
      x0 * this.density,
      y0 * this.density,
      r0 * this.density,
      x1 * this.density,
      y1 * this.density,
      r1 * this.density
    );
  }
  /**
   * Create a pattern to be used as a fill.
   */
  public createPattern = (
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    repetition: string
  ): CanvasPattern => {
    return this.ctx.createPattern(image, repetition);
  }
  /**
   * Draw an image to the canvas.
   * If the second position / size arguments are supplied, the first will be used for cropping the image,
   * and the second for the position and size it will be drawn.
   */
  public drawImage: DrawImage = (
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap,
    srcX: number,
    srcY: number,
    srcW?: number,
    srcH?: number,
    dstX?: number,
    dstY?: number,
    dstW?: number,
    dstH?: number
  ): Canvasimo => {
    if (
      typeof srcW !== 'undefined' &&
      typeof srcH !== 'undefined'
    ) {
      if (
        typeof dstX !== 'undefined' &&
        typeof dstY !== 'undefined' &&
        typeof dstW !== 'undefined' &&
        typeof dstH !== 'undefined'
      ) {
        this.ctx.drawImage(
          image,
          srcX * this.density,
          srcY * this.density,
          srcW * this.density,
          srcH * this.density,
          dstX * this.density,
          dstY * this.density,
          dstW * this.density,
          dstH * this.density
        );
      } else {
        this.ctx.drawImage(image, srcX * this.density, srcY * this.density, srcW * this.density, srcH * this.density);
      }
    } else {
      this.ctx.drawImage(image, srcX * this.density, srcY * this.density);
    }
    return this;
  }

  /**
   * @group Image Data
   * @description A collection of methods for creating, putting, or getting image data about the canvas.
   */

  /**
   * Get a data URL of the current canvas state.
   */
  public getDataURL = (type?: string, ...args: any[]): string => this.element.toDataURL(type, ...args);
  /**
   * Create image data with either the width and height specified,
   * or with the width and height of a the image data supplied.
   */
  public createImageData: CreateImageData = (width: number | ImageData, height?: number): ImageData => {
    if (typeof width === 'number' && typeof height === 'number') {
      return this.ctx.createImageData(width * this.density, height * this.density);
    }

    return this.ctx.createImageData(width, height);
  }
  /**
   * Get the image data from an area of the canvas.
   */
  public getImageData = (sx: number, sy: number, sw: number, sh: number): ImageData => {
    return this.ctx.getImageData(sx * this.density, sy * this.density, sw * this.density, sh * this.density);
  }
  /**
   * Draw image data onto the canvas.
   */
  public putImageData = (
    imagedata: ImageData,
    dx: number,
    dy: number,
    dirtyX?: number,
    dirtyY?: number,
    dirtyWidth?: number,
    dirtyHeight?: number
  ): Canvasimo => {
    this.ctx.putImageData(
      imagedata,
      dx * this.density,
      dy * this.density,
      typeof dirtyX === 'number' ? dirtyX * this.density : dirtyX,
      typeof dirtyY === 'number' ? dirtyY * this.density : dirtyY,
      typeof dirtyWidth === 'number' ? dirtyWidth * this.density : dirtyWidth,
      typeof dirtyHeight === 'number' ? dirtyHeight * this.density : dirtyHeight
    );
    return this;
  }
  /**
   * Get image data about a specific pixel.
   */
  public getPixelData = (x: number, y: number): Uint8ClampedArray => {
    return this.getImageData(x, y, 1, 1).data;
  }
  /**
   * Get the color of a specific pixel.
   */
  public getPixelColor = (x: number, y: number): string => {
    const data = this.getImageData(x, y, 1, 1).data;
    return this.createRGBA(data[0], data[1], data[2], data[3]);
  }

  /**
   * @group Color Helpers
   * @description A collection of methods to help with creating color strings.
   */

  /**
   * Create an HSL color string from the given values.
   */
  public createHSL = (h: number, s: number, l: number): string => {
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
  }
  /**
   * Create an HSLA color string from the given values.
   */
  public createHSLA = (h: number, s: number, l: number, a: number): string => {
    return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
  }
  /**
   * Create an RGB color string from the given values.
   */
  public createRGB = (r: number, g: number, b: number): string => {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  /**
   * Create an RGBA color string from the given values.
   */
  public createRGBA = (r: number, g: number, b: number, a: number): string => {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
  /**
   * Return an HSL color string from the given HSLA color string.
   */
  public getHSLFromHSLA = (color: string): string => this.getRGBFromRGBA(color);
  /**
   * Return an RGB color string from the given RGBA color string.
   */
  public getRGBFromRGBA = (color: string): string => {
    const lastCommaIndex = color.lastIndexOf(',');
    return color.replace(/^(\w{3})a/, '$1').substring(0, lastCommaIndex - 1) + ')';
  }

  /**
   * @group Converting Sizes
   * @description A collection of methods to help with calculating and converting sizes, and distances.
   */

  /**
   * Get a fraction from the provided percent value e.g. 80 returns 0.8.
   */
  public getFractionFromPercent = (percent: number): number => {
    return (percent / 100);
  }
  /**
   * Get a percent from the provided fraction value e.g. 0.7 returns 70.
   */
  public getPercentFromFraction = (fraction: number): number => {
    return (fraction * 100);
  }
  /**
   * Returns the actual value of a fraction of the canvas width e.g.
   * a canvas with a width of 200 returns 100 if the provided value is 0.5.
   */
  public getFractionOfWidth = (fraction: number): number => {
    return this.getWidth() * fraction;
  }
  /**
   * Returns the actual value of a fraction of the canvas height e.g.
   * a canvas with a height of 100 returns 20 if the provided value is 0.2.
   */
  public getFractionOfHeight = (fraction: number): number => {
    return this.getHeight() * fraction;
  }
  /**
   * Returns the actual value of a percentage of the canvas width e.g.
   * a canvas with a width of 200 returns 100 if the provided value is 50.
   */
  public getPercentOfWidth = (percent: number): number => {
    return this.getWidth() / 100 * percent;
  }
  /**
   * Returns the actual value of a percentage of the canvas height e.g.
   * a canvas with a height of 100 returns 20 if the provided value is 20.
   */
  public getPercentOfHeight = (percent: number): number => {
    return this.getHeight() / 100 * percent;
  }
  /**
   * Returns the distance between 2 points.
   */
  public getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  /**
   * @group Converting Angles
   * @description A collection of methods to help with calculating and converting angles.
   */

  /**
   * Get a radian value from the provided degrees e.g. 90 returns 1.5708.
   */
  public getRadiansFromDegrees = (degrees: number): number => {
    return degrees * Math.PI / 180;
  }

  /**
   * Get a degree value from the provided radians e.g. 3.14159 returns 180.
   */
  public getDegreesFromRadians = (radians: number): number => {
    return radians * 180 / Math.PI;
  }
  /**
   * Get the angle (in radians) between 2 or 3 points.
   */
  public getAngle: GetAngle = (...args: number[]): number => {
    if (!args.length || !(args.length === 4 || args.length === 6)) {
      throw new Error(INCORRECT_GET_ANGLE_ARGUMENTS);
    }

    const x1 = args[0];
    const y1 = args[1];
    const x2 = args[2];
    const y2 = args[3];

    if (args.length === 4) {
      return Math.atan2(y2 - y1, x2 - x1);
    }

    const x3 = args[4];
    const y3 = args[5];

    const a = this.getAngle(x1, y1, x2, y2);
    const b = this.getAngle(x2, y2, x3, y3);
    const c = b - a;

    if (c >= 0) {
      return Math.PI - c;
    }

    return -Math.PI - c;
  }

  /**
   * @group Path Plotting
   * @description A collection of methods for path drawing.
   */

  /**
   * Begin a new path (shape).
   */
  public beginPath = (): Canvasimo => {
    this.ctx.beginPath();
    return this;
  }
  /**
   * Close the current path (shape).
   */
  public closePath = (): Canvasimo => {
    this.ctx.closePath();
    return this;
  }
  /**
   * Move the starting point of a the next sub-path.
   */
  public moveTo = (x: number, y: number): Canvasimo => {
    this.ctx.moveTo(x * this.density, y * this.density);
    return this;
  }
  /**
   * Connect the last point to the provided coordinates.
   */
  public lineTo = (x: number, y: number): Canvasimo => {
    this.ctx.lineTo(x * this.density, y * this.density);
    return this;
  }
  /**
   * Arc from one point to another.
   */
  public arcTo = (x1: number, y1: number, x2: number, y2: number, radius: number): Canvasimo => {
    this.ctx.arcTo(x1 * this.density, y1 * this.density, x2 * this.density, y2 * this.density, radius * this.density);
    return this;
  }
  /**
   * Connect the last point to the provided coordinates with a bezier curve (2 control points).
   */
  public bezierCurveTo = (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): Canvasimo => {
    this.ctx.bezierCurveTo(
      cp1x * this.density,
      cp1y * this.density,
      cp2x * this.density,
      cp2y * this.density,
      x * this.density,
      y * this.density
    );
    return this;
  }
  /**
   * Connect the last point to the provided coordinates with a quadratic curve (1 control point).
   */
  public quadraticCurveTo = (cpx: number, cpy: number, x: number, y: number): Canvasimo => {
    this.ctx.quadraticCurveTo(cpx * this.density, cpy * this.density, x * this.density, y * this.density);
    return this;
  }

  /**
   * @group Canvas State
   * @description A collection of methods to save, restore, or transform the canvas state.
   */

  /**
   * Push the current state of the canvas into a stack that can later be restored.
   */
  public save = (): Canvasimo => {
    this.ctx.save();
    return this;
  }
  /**
   * Restore the most recent state of the canvas that was saved.
   */
  public restore = (): Canvasimo => {
    this.ctx.restore();
    return this;
  }
  /**
   * Add rotation (in radians) to the transform matrix so that shapes can be drawn at an angle.
   */
  public rotate = (angle: number): Canvasimo => {
    this.ctx.rotate(angle);
    return this;
  }
  /**
   * Scale the transform matrix so that shapes can be drawn at the provided scale.
   */
  public scale = (x: number, y: number): Canvasimo => {
    this.ctx.scale(x, y);
    return this;
  }
  /**
   * Move the canvas origin.
   */
  public translate = (x: number, y: number): Canvasimo => {
    this.ctx.translate(x * this.density, y * this.density);
    return this;
  }
  /**
   * Multiply the current transformation with the provided matrix.
   */
  public transform = (m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): Canvasimo => {
    this.ctx.transform(m11, m12, m21, m22, dx, dy);
    return this;
  }
  /**
   * Replace the current transformation with the provided matrix.
   */
  public setTransform = (m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): Canvasimo => {
    this.ctx.setTransform(m11, m12, m21, m22, dx, dy);
    return this;
  }
  /**
   * Replace the current transformation with the default matrix: [1, 0, 0, 1, 0, 0].
   */
  public resetTransform = (): Canvasimo => {
    if (typeof (this.ctx as any).resetTransform === 'function') {
      (this.ctx as any).resetTransform();
      return this;
    }

    return this.setTransform(1, 0, 0, 1, 0, 0);
  }
  /**
   * Use the current path as a clipping path.
   */
  public clip = (fillRules?: FillRule): Canvasimo => {
    this.ctx.clip(fillRules);
    return this;
  }
  /**
   * Set the opacity to use for drawing.
   * @alias setGlobalAlpha
   */
  public setOpacity = (value: number): Canvasimo => this.setGlobalAlpha(value);
  public setGlobalAlpha = (value: number): Canvasimo => this.setCanvasProperty('globalAlpha', value);
  /**
   * Get the opacity that is being used.
   * @alias getGlobalAlpha
   */
  public getOpacity = (): number => this.getGlobalAlpha();
  public getGlobalAlpha = (): number => this.getCanvasProperty('globalAlpha');
  /**
   * Set the composite operation to use for drawing.
   * @alias setGlobalCompositeOperation
   */
  public setCompositeOperation = (value: GlobalCompositeOperation): Canvasimo => {
    return this.setGlobalCompositeOperation(value);
  }
  public setGlobalCompositeOperation = (value: GlobalCompositeOperation): Canvasimo => {
    return this.setCanvasProperty('globalCompositeOperation', value);
  }
  /**
   * Get the composite operation that is being used.
   * @alias getGlobalCompositeOperation
   */
  public getCompositeOperation = (): GlobalCompositeOperation => this.getGlobalCompositeOperation();
  public getGlobalCompositeOperation = (): GlobalCompositeOperation => {
    return this.getCanvasProperty('globalCompositeOperation');
  }
  /**
   * Set whether image smoothing should be used.
   */
  public setImageSmoothingEnabled = (value: BooleanFalsy): Canvasimo => {
    for (const key of IMAGE_SMOOTHING_KEYS) {
      if (Object.prototype.hasOwnProperty.call(this.ctx, key)) {
        this.ctx[key] = value || false;
        return this;
      }
    }

    return this;
  }
  /**
   * Get whether image smoothing is being used.
   */
  public getImageSmoothingEnabled = (): boolean => {
    for (const key of IMAGE_SMOOTHING_KEYS) {
      if (Object.prototype.hasOwnProperty.call(this.ctx, key)) {
        return this.ctx[key];
      }
    }

    return false;
  }
  /**
   * Set how blurry shadows are.
   */
  public setShadowBlur = (value: number): Canvasimo => this.setCanvasProperty('shadowBlur', value * this.density);
  /**
   * Get the value of how blurry shadows are.
   */
  public getShadowBlur = (): number => this.getCanvasProperty('shadowBlur') / this.density;
  /**
   * Set the color to be used for shadows.
   */
  public setShadowColor = (value: string): Canvasimo => this.setCanvasProperty('shadowColor', value);
  /**
   * Get the color being used for shadows.
   */
  public getShadowColor = (): string => this.getCanvasProperty('shadowColor');
  /**
   * Set how horizontally offset shadows should be.
   */
  public setShadowOffsetX = (value: number): Canvasimo => this.setCanvasProperty('shadowOffsetX', value * this.density);
  /**
   * Get the value of how horizontally offset shadows should be.
   */
  public getShadowOffsetX = (): number => this.getCanvasProperty('shadowOffsetX') / this.density;
  /**
   * Set how vertically offset shadows should be.
   */
  public setShadowOffsetY = (value: number): Canvasimo => this.setCanvasProperty('shadowOffsetY', value * this.density);
  /**
   * Get the value of how vertically offset shadows should be.
   */
  public getShadowOffsetY = (): number => this.getCanvasProperty('shadowOffsetY') / this.density;

  /**
   * @group Misc
   * @description Miscellaneous methods.
   */

  /**
   * Break out of the method chain and execute a callback.
   */
  public tap = (callback: () => any): Canvasimo => {
    callback.call(this);
    return this;
  }
  /**
   * Break out of the method chain and execute a callback with values between start and end,
   * increasing / decreasing by step (start defaults to 0, step defaults to 1).
   * You may return false from the callback at any point to stop at the current iteration.
   */
  public repeat: Repeat = (...args: Array<number | ((i: number) => any)>): Canvasimo => {
    let start: number;
    let end: number;
    let step: number;
    let callback: undefined | ((i: number) => any);

    const [first, second, third, fourth] = args;

    switch (args.length) {
      case 2:
        start = 0;
        end = (typeof first === 'number' ? first || 0 : 0);
        step = 1;
        callback = typeof second === 'function' ? second : undefined;
        break;
      case 3:
        start = (typeof first === 'number' ? first || 0 : 0);
        end = (typeof second === 'number' ? second || 0 : 0);
        step = 1;
        callback = typeof third === 'function' ? third : undefined;
        break;
      case 4:
        start = (typeof first === 'number' ? first || 0 : 0);
        end = (typeof second === 'number' ? second || 0 : 0);
        step = Math.abs(typeof third === 'number' ? third || 0 : 0);
        callback = typeof fourth === 'function' ? fourth : undefined;
        break;
      default:
        throw new Error(
          'Incorrect number of arguments supplied for repeat. ' +
          'Arguments must be [end, callback], [start, end, callback], ' +
          'or [start, end, step, callback].'
        );
    }

    if (step === 0) {
      return this;
    }

    if (typeof callback !== 'function') {
      return this;
    }

    const positive = end > start;
    step = positive ? step : -step;

    for (let i = start; (positive ? i < end : i > end); i += step) {
      if (callback(i) === false) {
        return this;
      }
    }

    return this;
  }
  /**
   * Break out of the method chain and loop over the given array, object or string,
   * calling the callback with the value & key / index.
   * You may return false from the callback at any point to stop at the current iteration.
   */
  public forEach: ForEach = (
    obj: any[] | string | {[i: string]: any},
    callback: (value: any, key: any) => any
  ): Canvasimo => {
    if (Array.isArray(obj) || typeof obj === 'string') {
      for (let i = 0; i < obj.length; i += 1) {
        if (callback(obj[i], i) === false) {
          return this;
        }
      }
    } else {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (callback(obj[key], key) === false) {
            return this;
          }
        }
      }
    }

    return this;
  }
  /**
   * Constrain a number between a minimum and maximum value.
   */
  public constrain = (value: number, min: number, max: number): number => {
    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }

    return Math.max(Math.min(value, max), min);
  }
  /**
   * Map a value from one range to another e.g. mapping 0.5 from 0-1 to 0-10 returns 5.
   */
  public map = (value: number, fromStart: number, fromEnd: number, toStart: number, toEnd: number): number => {
    const fromDiff = fromEnd - fromStart;
    const toDiff = toEnd - toStart;
    return toStart + toDiff * (value - fromStart) / fromDiff;
  }
  /**
   * Draw a focus ring around the current path, or the path supplied,
   * if the element supplied has focus.
   */
  public drawFocusIfNeeded = (element: Element): Canvasimo => {
    this.ctx.drawFocusIfNeeded(element);
    return this;
  }
  /**
   * Returns whether the given point is within the current or given path.
   */
  public isPointInPath = (x: number, y: number, fillRule?: FillRule): boolean => {
    if (fillRule) {
      return this.ctx.isPointInPath(x * this.density, y * this.density, fillRule);
    }

    return this.ctx.isPointInPath(x * this.density, y * this.density);
  }
  /**
   * Returns whether the given point is within the area contained by applying
   * a stroke to the current or given path.
   */
  public isPointInStroke = (): boolean | null => {
    if (typeof (this.ctx as any).isPointInStroke !== 'function') {
      logUnsupportedMethodError('isPointInStroke');
      return null;
    }

    return (this.ctx as any).isPointInStroke();
  }

  // Set and get context properties
  private setCanvasProperty = (attribute: string, value: any): Canvasimo => {
    (this.ctx as any)[attribute] = value;
    return this;
  }
  private getCanvasProperty = (attribute: string) => (this.ctx as any)[attribute];
}
