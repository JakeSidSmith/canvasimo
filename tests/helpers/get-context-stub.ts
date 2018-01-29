import ImageData from './image-data-stub';

const ctx = {
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
  getContextAttributes: () => undefined,
  getImageData: (x: number, y: number, width: number, height: number) => new ImageData(width, height),
  createLinearGradient: () => undefined,
  createRadialGradient: () => undefined,
  createPattern: () => undefined,
  createImageData: () => undefined,
  isPointInPath: () => undefined,
  isPointInStroke: () => undefined,
  measureText: () => undefined,
  getLineDash: () => undefined,
  save: () => undefined,
  restore: () => undefined,
  scale: () => undefined,
  rotate: () => undefined,
  translate: () => undefined,
  transform: () => undefined,
  setTransform: () => undefined,
  resetTransform: () => undefined,
  fill: () => undefined,
  stroke: () => undefined,
  drawFocusIfNeeded: () => undefined,
  clip: () => undefined,
  clearRect: () => undefined,
  moveTo: () => undefined,
  lineTo: () => undefined,
  quadraticCurveTo: () => undefined,
  bezierCurveTo: () => undefined,
  arcTo: () => undefined,
  beginPath: () => undefined,
  fillText: () => undefined,
  strokeText: () => undefined,
  drawImage: () => undefined,
  putImageData: () => undefined,
  closePath: () => undefined,
  rect: () => undefined,
  arc: () => undefined,
  ellipse: () => undefined,
  setLineDash: () => undefined,
  fillRect: () => undefined,
  strokeRect: () => undefined,
};

const getContext = (type: string) => {
  if (type === '2d') {
    return ctx;
  }

  return {};
};

export default getContext;
