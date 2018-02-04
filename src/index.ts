import {
  CONTEXT_TYPE,
  DEFAULT_FONT,
  IMAGE_SMOOTHING_KEYS,
  INCORRECT_GET_ANGLE_ARGUMENTS,
} from './constants';
import {
  AnyCanvasContext,
  AnyCanvasContextAttributes,
  Color,
  CreateImageData,
  DrawImage,
  Fill,
  FillAndStrokeStyles,
  FillRules,
  ForEach,
  GlobalCompositeOperations,
  LineCaps,
  LineJoins,
  Points,
  Repeat,
  Segments,
  SetSize,
  Size,
  Stroke,
  TextAligns,
  TextBaselines,
} from './types';
import {
  formatFont,
  forPoints,
  getFontParts,
  isFillRule,
} from './utils';

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
   * Returns the canvas size & position on screen.
   */
  public getBoundingClientRect = (): ClientRect => this.element.getBoundingClientRect();
  public getContext = (type: string, contextAttributes?: AnyCanvasContextAttributes): AnyCanvasContext => {
    return this.element.getContext(type, contextAttributes);
  }
  public getCurrentContext = (): CanvasRenderingContext2D => this.ctx;
  public getCurrentContextType = (): typeof CONTEXT_TYPE => this.ctxType;
  public getDataURL = (type?: string, ...args: any[]): string => this.element.toDataURL(type, ...args);

  // Canvas size
  public setDensity = (density: number): Canvasimo => {
    this.density = density;
    // FIXME: Setting the density should update all existing context attributes
    return this.setSize(this.element.width, this.element.height);
  }
  public getDensity = (): number => this.density;
  public setWidth = (width: number): Canvasimo => {
    this.element.width = width * this.density;
    return this;
  }
  public getWidth = (): number => this.element.width / this.density;
  public setHeight = (height: number): Canvasimo => {
    this.element.height = height * this.density;
    return this;
  }
  public getHeight = (): number => this.element.height / this.density;
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
  public getSize = (): Size => ({
    width: this.element.width / this.density,
    height: this.element.height / this.density,
  })

  // Image smoothing
  public setImageSmoothingEnabled = (value: boolean): Canvasimo => {
    for (const key of IMAGE_SMOOTHING_KEYS) {
      if (Object.prototype.hasOwnProperty.call(this.ctx, key)) {
        this.ctx[key] = value;
        return this;
      }
    }

    return this;
  }
  public getImageSmoothingEnabled = (): boolean => {
    for (const key of IMAGE_SMOOTHING_KEYS) {
      if (Object.prototype.hasOwnProperty.call(this.ctx, key)) {
        return this.ctx[key];
      }
    }

    return false;
  }

  // Context property getter and setters
  public setGlobalAlpha = (value: number): Canvasimo => this.setCanvasProperty('globalAlpha', value);
  public getGlobalAlpha = (): number => this.getCanvasProperty('globalAlpha');
  public setGlobalCompositeOperation = (value: GlobalCompositeOperations): Canvasimo => {
    return this.setCanvasProperty('globalCompositeOperation', value);
  }
  public getGlobalCompositeOperation = (): GlobalCompositeOperations => {
    return this.getCanvasProperty('globalCompositeOperation');
  }
  public setFillStyle = (value: FillAndStrokeStyles): Canvasimo => this.setCanvasProperty('fillStyle', value);
  public getFillStyle = (): FillAndStrokeStyles => this.getCanvasProperty('fillStyle');
  public setStrokeStyle = (value: FillAndStrokeStyles): Canvasimo => this.setCanvasProperty('strokeStyle', value);
  public getStrokeStyle = (): string => this.getCanvasProperty('strokeStyle');
  public setLineWidth = (value: number): Canvasimo => this.setCanvasProperty('lineWidth', value * this.density);
  public getLineWidth = (): number => this.getCanvasProperty('lineWidth') / this.density;
  public setLineCap = (value: LineCaps): Canvasimo => this.setCanvasProperty('lineCap', value);
  public getLineCap = (): LineCaps => this.getCanvasProperty('lineCap');
  public setLineJoin = (value: LineJoins): Canvasimo => this.setCanvasProperty('lineJoin', value);
  public getLineJoin = (): LineJoins => this.getCanvasProperty('lineJoin');
  public setLineDashOffset = (value: number): Canvasimo => {
    return this.setCanvasProperty('lineDashOffset', value * this.density);
  }
  public getLineDashOffset = (): number => this.getCanvasProperty('lineDashOffset') / this.density;
  public setMiterLimit = (value: number): Canvasimo => this.setCanvasProperty('miterLimit', value * this.density);
  public getMiterLimit = (): number => this.getCanvasProperty('miterLimit') / this.density;
  public setShadowColor = (value: Color): Canvasimo => this.setCanvasProperty('shadowColor', value);
  public getShadowColor = (): Color => this.getCanvasProperty('shadowColor');
  public setShadowBlur = (value: number): Canvasimo => this.setCanvasProperty('shadowBlur', value * this.density);
  public getShadowBlur = (): number => this.getCanvasProperty('shadowBlur') / this.density;
  public setShadowOffsetX = (value: number): Canvasimo => this.setCanvasProperty('shadowOffsetX', value * this.density);
  public getShadowOffsetX = (): number => this.getCanvasProperty('shadowOffsetX') / this.density;
  public setShadowOffsetY = (value: number): Canvasimo => this.setCanvasProperty('shadowOffsetY', value * this.density);
  public getShadowOffsetY = (): number => this.getCanvasProperty('shadowOffsetY') / this.density;
  public setTextAlign = (value: TextAligns): Canvasimo => this.setCanvasProperty('textAlign', value);
  public getTextAlign = (): TextAligns => this.getCanvasProperty('textAlign');
  public setTextBaseline = (value: TextBaselines): Canvasimo => this.setCanvasProperty('textBaseline', value);
  public getTextBaseline = (): TextBaselines => this.getCanvasProperty('textBaseline');

  // Renamed property getter and setters
  public setOpacity = (value: number): Canvasimo => this.setGlobalAlpha(value);
  public getOpacity = (): number => this.getGlobalAlpha();
  public setCompositeOperation = (value: GlobalCompositeOperations): Canvasimo => {
    return this.setGlobalCompositeOperation(value);
  }
  public getCompositeOperation = (): GlobalCompositeOperations => this.getGlobalCompositeOperation();
  public setFill = (value: FillAndStrokeStyles): Canvasimo => this.setFillStyle(value);
  public getFill = (): FillAndStrokeStyles => this.getFillStyle();
  public setStroke = (value: FillAndStrokeStyles): Canvasimo => this.setStrokeStyle(value);
  public getStroke = (): FillAndStrokeStyles => this.getStrokeStyle();
  public setStrokeWidth = (value: number): Canvasimo => this.setLineWidth(value);
  public getStrokeWidth = (): number => this.getLineWidth();
  public setStrokeCap = (value: LineCaps): Canvasimo => this.setLineCap(value);
  public getStrokeCap = (): LineCaps => this.getLineCap();
  public setStrokeJoin = (value: LineJoins): Canvasimo => this.setLineJoin(value);
  public getStrokeJoin = (): LineJoins => this.getLineJoin();
  public setStrokeDashOffset = (value: number): Canvasimo => this.setLineDashOffset(value);
  public getStrokeDashOffset = (): number => this.getLineDashOffset();

  // Standard context methods
  public save = (): Canvasimo => {
    this.ctx.save();
    return this;
  }
  public restore = (): Canvasimo => {
    this.ctx.restore();
    return this;
  }
  public scale = (x: number, y: number): Canvasimo => {
    this.ctx.scale(x, y);
    return this;
  }
  public rotate = (angle: number): Canvasimo => {
    this.ctx.rotate(angle);
    return this;
  }
  public translate = (x: number, y: number): Canvasimo => {
    this.ctx.translate(x * this.density, y * this.density);
    return this;
  }
  public transform = (m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): Canvasimo => {
    this.ctx.transform(m11, m12, m21, m22, dx, dy);
    return this;
  }
  public setTransform = (m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): Canvasimo => {
    this.ctx.setTransform(m11, m12, m21, m22, dx, dy);
    return this;
  }
  public drawFocusIfNeeded = (element: Element): Canvasimo => {
    this.ctx.drawFocusIfNeeded(element);
    return this;
  }
  public clip = (fillRules?: FillRules): Canvasimo => {
    this.ctx.clip(fillRules);
    return this;
  }
  public clearRect = (x: number, y: number, width: number, height: number): Canvasimo => {
    this.ctx.clearRect(x * this.density, y * this.density, width * this.density, height * this.density);
    return this;
  }
  public moveTo = (x: number, y: number): Canvasimo => {
    this.ctx.moveTo(x * this.density, y * this.density);
    return this;
  }
  public lineTo = (x: number, y: number): Canvasimo => {
    this.ctx.lineTo(x * this.density, y * this.density);
    return this;
  }
  public quadraticCurveTo = (cpx: number, cpy: number, x: number, y: number): Canvasimo => {
    this.ctx.quadraticCurveTo(cpx * this.density, cpy * this.density, x * this.density, y * this.density);
    return this;
  }
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
  public arcTo = (x1: number, y1: number, x2: number, y2: number, radius: number): Canvasimo => {
    this.ctx.arcTo(x1 * this.density, y1 * this.density, x2 * this.density, y2 * this.density, radius * this.density);
    return this;
  }
  public beginPath = (): Canvasimo => {
    this.ctx.beginPath();
    return this;
  }
  public closePath = (): Canvasimo => {
    this.ctx.closePath();
    return this;
  }
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
  public rect = (x: number, y: number, width: number, height: number): Canvasimo => {
    this.ctx.rect(x * this.density, y * this.density, width * this.density, height * this.density);
    return this;
  }
  public arc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean
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
  public setLineDash = (segments: Segments): Canvasimo => {
    this.ctx.setLineDash(segments.map((segment) => segment * this.density));
    return this;
  }

  // Renamed context methods
  public plotRect = (x: number, y: number, width: number, height: number): Canvasimo => this.rect(x, y, width, height);
  public plotArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean
  ): Canvasimo => {
    return this.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  }
  public setStrokeDash = (segments: Segments): Canvasimo => this.setLineDash(segments);

  // Expanded context methods
  public fill: Fill = (color?: string, fillRule?: FillRules): Canvasimo => {
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
  public stroke: Stroke = (color?: string | Path2D, path?: Path2D): Canvasimo => {
    if (typeof color === 'string') {
      this.setStroke(color);
      if (path) {
        this.ctx.stroke(path);
      } else {
        this.ctx.stroke();
      }
    } else if (typeof color === 'object') {
      this.ctx.stroke(color);
    } else {
      this.ctx.stroke(path);
    }

    return this;
  }

  // Cross compatibility methods
  public resetTransform = (): Canvasimo => {
    if (typeof (this.ctx as any).resetTransform === 'function') {
      (this.ctx as any).resetTransform();
      return this;
    }

    return this.setTransform(1, 0, 0, 1, 0, 0);
  }
  public ellipse = (
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean
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

  // Renamed compatibility methods
  public plotEllipse = (
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean
  ): Canvasimo => {
    return this.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
  }

  // Standard context getters
  public getImageData = (sx: number, sy: number, sw: number, sh: number): ImageData => {
    return this.ctx.getImageData(sx * this.density, sy * this.density, sw * this.density, sh * this.density);
  }
  public createLinearGradient = (x0: number, y0: number, x1: number, y1: number): CanvasGradient => {
    return this.ctx.createLinearGradient(x0 * this.density, y0 * this.density, x1 * this.density, y1 * this.density);
  }
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
  public createPattern = (
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    repetition: string
  ): CanvasPattern => {
    return this.ctx.createPattern(image, repetition);
  }
  public createImageData: CreateImageData = (width: number | ImageData, height?: number): ImageData => {
    if (typeof width === 'number' && typeof height === 'number') {
      return this.ctx.createImageData(width * this.density, height * this.density);
    }

    return this.ctx.createImageData(width, height);
  }
  public isPointInPath = (x: number, y: number, fillRule?: FillRules): boolean => {
    if (fillRule) {
      return this.ctx.isPointInPath(x * this.density, y * this.density, fillRule);
    }

    return this.ctx.isPointInPath(x * this.density, y * this.density);
  }
  // FIXME: Needs implementation for IE
  // public isPointInStroke = (): boolean => this.ctx.isPointInStroke();
  public measureText = (text: string): TextMetrics => this.ctx.measureText(text);
  public getLineDash = (): Segments => (this.ctx.getLineDash() || []).map((value) => value / this.density);

  // Renamed context getters
  public getTextSize = (text: string): TextMetrics => this.measureText(text);
  public getStrokeDash = (): Segments => this.getLineDash();

  // Additional methods
  public clearCanvas = (): Canvasimo => {
    return this
      .setWidth(this.getWidth());
  }

  public fillCanvas = (color: Color): Canvasimo => {
    return this
      .resetTransform()
      .fillRect(0, 0, this.getWidth(), this.getHeight(), color);
  }

  public plotLine = (x1: number, y1: number, x2: number, y2: number): Canvasimo => {
    return this
      .moveTo(x1, y1)
      .lineTo(x2, y2);
  }

  public strokeLine = (x1: number, y1: number, x2: number, y2: number, color?: Color): Canvasimo => {
    return this
      .plotLine(x1, y1, x2, y2)
      .stroke(color);
  }

  public plotLength = (x1: number, y1: number, length: number, angle: number): Canvasimo => {
    const x2 = x1 + length * Math.cos(angle);
    const y2 = y1 + length * Math.sin(angle);

    return this
      .moveTo(x1, y1)
      .lineTo(x2, y2);
  }

  public strokeLength = (x1: number, y1: number, length: number, angle: number, color?: Color): Canvasimo => {
    return this
      .plotLength(x1, y1, length, angle)
      .stroke(color);
  }

  public plotPoly = (x: number, y: number, radius: number, sides: number, anticlockwise?: boolean): Canvasimo => {
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

  public strokePoly = (
    x: number,
    y: number,
    radius: number,
    sides: number,
    anticlockwise?: boolean,
    color?: Color
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotPoly(x, y, radius, sides, anticlockwise)
      .stroke(color);
  }

  public fillPoly = (
    x: number,
    y: number,
    radius: number,
    sides: number,
    anticlockwise?: boolean,
    color?: Color
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotPoly(x, y, radius, sides, anticlockwise)
      .fill(color);
  }

  public plotStar = (x: number, y: number, radius1: number, sides: number, anticlockwise?: boolean): Canvasimo => {
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

  public strokeStar = (
    x: number,
    y: number,
    radius1: number,
    sides: number,
    anticlockwise?: boolean,
    color?: Color
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotStar(x, y, radius1, sides, anticlockwise)
      .stroke(color);
  }

  public fillStar = (
    x: number,
    y: number,
    radius1: number,
    sides: number,
    anticlockwise?: boolean,
    color?: Color
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotStar(x, y, radius1, sides, anticlockwise)
      .fill(color);
  }

  public plotBurst = (
    x: number,
    y: number,
    radius1: number,
    radius2: number,
    sides: number,
    anticlockwise?: boolean
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

  public strokeBurst = (
    x: number,
    y: number,
    radius1: number,
    radius2: number,
    sides: number,
    anticlockwise?: boolean,
    color?: Color
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotBurst(x, y, radius1, radius2, sides, anticlockwise)
      .stroke(color);
  }

  public fillBurst = (
    x: number,
    y: number,
    radius1: number,
    radius2: number,
    sides: number,
    anticlockwise?: boolean,
    color?: Color
  ): Canvasimo => {
    sides = Math.round(sides);

    if (!sides || sides < 3) {
      return this;
    }

    return this
      .plotBurst(x, y, radius1, radius2, sides, anticlockwise)
      .fill(color);
  }

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

  public fillPath = (points: Points, color?: Color): Canvasimo => {
    return this
      .plotPath(points)
      .fill(color);
  }

  public strokePath = (points: Points, color?: Color): Canvasimo => {
    return this
      .plotPath(points)
      .stroke(color);
  }

  public plotClosedPath = (points: Points): Canvasimo => {
    return this
      .beginPath()
      .plotPath(points)
      .closePath();
  }

  public fillClosedPath = (points: Points, color?: Color): Canvasimo => {
    return this
      .plotClosedPath(points)
      .fill(color);
  }

  public strokeClosedPath = (points: Points, color?: Color): Canvasimo => {
    return this
      .plotClosedPath(points)
      .stroke(color);
  }

  public fillText = (text: string, x: number, y: number, maxWidth?: number, color?: Color): Canvasimo => {
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

  public strokeText = (text: string, x: number, y: number, maxWidth?: number, color?: Color): Canvasimo => {
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

  public fillRect = (x: number, y: number, width: number, height: number, color?: Color): Canvasimo => {
    if (typeof color !== 'undefined') {
      this.setFill(color);
    }
    this.ctx.fillRect(x * this.density, y * this.density, width * this.density, height * this.density);
    return this;
  }

  public strokeRect = (x: number, y: number, width: number, height: number, color?: Color): Canvasimo => {
    if (typeof color !== 'undefined') {
      this.setStroke(color);
    }
    this.ctx.strokeRect(x * this.density, y * this.density, width * this.density, height * this.density);
    return this;
  }

  public fillArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean,
    color?: Color
  ): Canvasimo => {
    return this
      .plotArc(x, y, radius, startAngle, endAngle, anticlockwise)
      .fill(color);
  }

  public strokeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean,
    color?: Color
  ): Canvasimo => {
    return this
      .plotArc(x, y, radius, startAngle, endAngle, anticlockwise)
      .stroke(color);
  }

  public fillEllipse = (
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean,
    color?: Color
  ): Canvasimo => {
    return this
      .plotEllipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
      .fill(color);
  }

  public strokeEllipse = (
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean,
    color?: Color
  ): Canvasimo => {
    return this
      .plotEllipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
      .stroke(color);
  }

  public plotCircle = (x: number, y: number, radius: number, anticlockwise?: boolean): Canvasimo => {
    return this
      .beginPath()
      .plotArc(x, y, radius, 0, Math.PI * 2, anticlockwise)
      .closePath();
  }

  public fillCircle = (x: number, y: number, radius: number, anticlockwise?: boolean, color?: Color): Canvasimo => {
    return this
      .plotCircle(x, y, radius, anticlockwise)
      .fill(color);
  }

  public strokeCircle = (x: number, y: number, radius: number, anticlockwise?: boolean, color?: Color): Canvasimo => {
    return this
      .plotCircle(x, y, radius, anticlockwise)
      .stroke(color);
  }

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

  public fillRoundedRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    color?: Color
  ): Canvasimo => {
    return this
      .plotRoundedRect(x, y, width, height, radius)
      .fill(color);
  }

  public strokeRoundedRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    color?: Color
  ): Canvasimo => {
    return this
      .plotRoundedRect(x, y, width, height, radius)
      .stroke(color);
  }

  public plotPixel = (x: number, y: number): Canvasimo => {
    return this
      .plotRect(x, y, 1, 1);
  }

  public fillPixel = (x: number, y: number, color?: Color): Canvasimo => {
    return this
      .fillRect(x, y, 1, 1, color);
  }

  public strokePixel = (x: number, y: number, color?: Color): Canvasimo => {
    return this
      .strokeRect(x, y, 1, 1, color);
  }

  // Font methods
  public setFont = (font: string): Canvasimo => {
    this.ctx.font = formatFont(font, this.density);
    return this;
  }

  public getFont = (): string => {
    return formatFont(this.ctx.font, this.density);
  }

  // Font property setters
  public setFontStyle = (style: string): Canvasimo => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return this.setFont('');
    }
    parts[0] = style || DEFAULT_FONT[0];
    this.ctx.font = formatFont(parts.join(' '), this.density);
    return this;
  }

  public setFontVariant = (variant: string): Canvasimo => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return this.setFont('');
    }
    parts[1] = variant || DEFAULT_FONT[1];
    this.ctx.font = formatFont(parts.join(' '), this.density);
    return this;
  }

  public setFontWeight = (weight: string | number): Canvasimo => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return this.setFont('');
    }
    parts[2] = weight.toString() || DEFAULT_FONT[2];
    this.ctx.font = formatFont(parts.join(' '), this.density);
    return this;
  }

  public setFontSize = (size: string | number): Canvasimo => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return this.setFont('');
    }
    parts[3] = (typeof size === 'number' ? size + 'px' : size) || DEFAULT_FONT[3];
    this.ctx.font = formatFont(parts.join(' '), this.density);
    return this;
  }

  public setFontFamily = (family: string): Canvasimo => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return this.setFont('');
    }
    parts[4] = family || DEFAULT_FONT[4];
    this.ctx.font = formatFont(parts.join(' '), this.density);
    return this;
  }

  // Font property getters
  public getFontStyle = (): string | null => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return null;
    }
    return parts[0];
  }

  public getFontVariant = (): string | null => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return null;
    }
    return parts[1];
  }

  public getFontWeight = (): string | number | null => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return null;
    }
    return parts[2];
  }

  public getFontSize = (): number | null => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return null;
    }
    return parseFloat(parts[3]);
  }

  public getFontFamily = (): string | null => {
    const parts = getFontParts(this.ctx.font, this.density);
    if (parts.length < 5) {
      return null;
    }
    return parts[4];
  }

  // Helper methods
  public createHSL = (h: number, s: number, l: number): Color => {
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
  }

  public createHSLA = (h: number, s: number, l: number, a: number): Color => {
    return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
  }

  public createRGB = (r: number, g: number, b: number): Color => {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  public createRGBA = (r: number, g: number, b: number, a: number): Color => {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  public getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  public getAngle = (...args: number[]): number => {
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

  public getRGBFromRGBA = (color: Color): Color => {
    const lastCommaIndex = color.lastIndexOf(',');
    return color.replace(/^(\w{3})a/, '$1').substring(0, lastCommaIndex - 1) + ')';
  }

  public getHSLFromHSLA = (color: Color): Color => this.getRGBFromRGBA(color);

  public getRadiansFromDegrees = (degrees: number): number => {
    return degrees * Math.PI / 180;
  }

  public getDegreesFromRadians = (radians: number): number => {
    return radians * 180 / Math.PI;
  }

  public getPercentFromFraction = (fraction: number): number => {
    return (fraction * 100);
  }

  public getFractionFromPercent = (percent: number): number => {
    return (percent / 100);
  }

  public getPercentOfWidth = (percent: number): number => {
    return this.getWidth() / 100 * percent;
  }

  public getFractionOfWidth = (fraction: number): number => {
    return this.getWidth() * fraction;
  }

  public getPercentOfHeight = (percent: number): number => {
    return this.getHeight() / 100 * percent;
  }

  public getFractionOfHeight = (fraction: number): number => {
    return this.getHeight() * fraction;
  }

  public getPixelColor = (x: number, y: number): Color => {
    const data = this.getImageData(x, y, 1, 1).data;
    return this.createRGBA(data[0], data[1], data[2], data[3]);
  }

  public getPixelData = (x: number, y: number): Uint8ClampedArray => {
    return this.getImageData(x, y, 1, 1).data;
  }

  public tap = (callback: () => any): Canvasimo => {
    callback.call(this);
    return this;
  }

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

  public forEach: ForEach = (
    obj: any[] | string | {[i: string]: any},
    callback: (value: any, key: string | number) => any
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

  public constrain = (value: number, min: number, max: number): number => {
    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }

    return Math.max(Math.min(value, max), min);
  }

  public map = (value: number, fromStart: number, fromEnd: number, toStart: number, toEnd: number): number => {
    const fromDiff = fromEnd - fromStart;
    const toDiff = toEnd - toStart;
    return toStart + toDiff * (value - fromStart) / fromDiff;
  }

  // Set and get context properties
  private setCanvasProperty = (attribute: string, value: any): Canvasimo => {
    (this.ctx as any)[attribute] = value;
    return this;
  }
  private getCanvasProperty = (attribute: string) => (this.ctx as any)[attribute];
}
