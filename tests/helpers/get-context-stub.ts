import ImageData from './image-data-stub';

const ctx: Record<string, any> = {
  imageSmoothingEnabled: true,
  webkitImageSmoothingEnabled: false,
  globalAlpha: 1, // number
  globalCompositeOperation: 'source-over', // string
  fillStyle: '#000000', // string
  strokeStyle: '#000000', // string
  lineWidth: 1, // number
  lineCap: 'butt', // string
  lineJoin: 'miter', // string
  lineDashOffset: 0, // number
  miterLimit: 10, // number
  shadowColor: 'rgba(0, 0, 0, 0)', // string
  shadowBlur: 0, // number
  shadowOffsetX: 0, // number
  shadowOffsetY: 0, // number
  font: '10px sans-serif', // string
  textAlign: 'start', // string
  textBaseline: 'alphabetic', // string
  getContextAttributes: jest.fn(),
  getImageData: jest.fn((_x: number, _y: number, width: number, height: number) => {
    return new ImageData(width, height);
  }),
  createLinearGradient: jest.fn(),
  createRadialGradient: jest.fn(),
  createPattern: jest.fn(),
  createImageData: jest.fn(),
  isPointInPath: jest.fn(),
  isPointInStroke: jest.fn(),
  measureText: jest.fn(),
  getLineDash: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  translate: jest.fn(),
  transform: jest.fn(),
  setTransform: jest.fn(),
  resetTransform: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  drawFocusIfNeeded: jest.fn(),
  clip: jest.fn(),
  clearRect: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  quadraticCurveTo: jest.fn(),
  bezierCurveTo: jest.fn(),
  arcTo: jest.fn(),
  beginPath: jest.fn(),
  fillText: jest.fn(),
  strokeText: jest.fn(),
  drawImage: jest.fn(),
  putImageData: jest.fn(),
  closePath: jest.fn(),
  rect: jest.fn(),
  arc: jest.fn(),
  ellipse: jest.fn(),
  setLineDash: jest.fn(),
  fillRect: jest.fn(),
  strokeRect: jest.fn(),
};

export const mockClearAll = () => {
  for (const key in ctx) {
    if (Object.prototype.hasOwnProperty.call(ctx, key)) {
      const prop = ctx[key];

      if (typeof prop === 'function') {
        (prop as jest.Mock<any>).mockClear();
      }
    }
  }
};

const getContext = (type: string): CanvasRenderingContext2D => {
  if (type === '2d') {
    return ctx as any;
  }

  throw new Error('Cannot get a context that is not "2d"');
};

export default getContext;
