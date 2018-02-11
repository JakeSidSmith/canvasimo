import Canvasimo from '../../../src';

const element = document.getElementById('example-1');

if (!element) {
  throw new Error('Could not find canvas element for example');
}

const canvas = new Canvasimo(element as HTMLCanvasElement);
const rect = canvas.getBoundingClientRect();

const randoms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => Math.random());

canvas
  .setDensity(2)
  .setSize(rect.width, rect.height);

const draw = () => {
  const { width } = canvas.getBoundingClientRect();
  const height = canvas.getHeight();

  canvas
    .clearCanvas()
    .setSize(width, height)
    .fillCanvas('#EEEEEE')
    .fillCircle(width / 2, height / 2, 20, false, 'red')
    .repeat(10, (index) => {
      const y = canvas.map(index, 0, 10, 0, height) + height / 10 / 2;

      canvas.strokeLine(10, y, width - 10, y, 'green');
    })
    .tap(() => {
      const path = randoms.map((value, index) => ({
        x: canvas.getFractionOfWidth(1 / (randoms.length - 1)) * index,
        y: canvas.map(value, 0, 1, 0, height),
      }));

      canvas
        .beginPath()
        .setStrokeWidth(2)
        .strokePath(path, 'blue');
    });
};

draw();

window.addEventListener('resize', draw);
