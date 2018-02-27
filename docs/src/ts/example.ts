import Canvasimo from '../../../src';

const element = document.getElementById('example-1');

if (!element) {
  throw new Error('Could not find canvas element for example');
}

const FONT_SIZE = 14;
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
    .setTextBaseline('top')
    .setFontFamily('arial')
    .setFontSize(FONT_SIZE)
    .fillText('Regular text', 10, 10, null, 'black')
    .fillTextMultiline(
      'Text with newline after this...\n...so this is on a newline',
      10,
      10 + FONT_SIZE * 2
    )
    .fillTextMultiline(
      'Text that automatically wraps and breaks words if necessary',
      10,
      10 + FONT_SIZE * 5,
      100,
      'break-word'
    )
    .save()
    .translate(width / 2, height / 2)
    .rotate(canvas.getRadiansFromDegrees(-90))
    .setOpacity(0.25)
    .fillStar(0, 0, 50, 5, false, 'red')
    .restore()
    .strokeCircle(width * 0.25, height / 2, 30, false, 'black')
    .strokeBurst(width * 0.25, height / 2, 40, 50, 8, false, 'black')
    .strokeRoundedRect(width * 0.75 - 20, height / 2 - 20, 40, 40, 10, 'black')
    .repeat(10, (index) => {
      const y = canvas.map(index, 0, 10, 0, height) + height / 10 / 2;

      canvas
        .beginPath()
        .strokeLine(10, y, width - 10, y, 'green');
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
