import Canvasimo from '../../../../src';

const element = document.getElementById('example-multiline-text');

if (!element) {
  throw new Error('Could not find canvas element for multiline text example');
}

const MARGIN = 10;
const FONT_SIZE = 14;
const canvas = new Canvasimo(element as HTMLCanvasElement);
const rect = canvas.getBoundingClientRect();

canvas
  .setDensity(2)
  .setSize(rect.width, rect.height);

const draw = () => {
  const { width } = canvas.getBoundingClientRect();
  const height = canvas.getHeight();

  const multilineTextArea = Math.min(width / 3 * 2, 400);
  const multilineTextOffset = (width - multilineTextArea) / 2;
  const multilineTextWidth = (multilineTextArea - MARGIN * 6) / 3;

  canvas
    .clearCanvas()
    .setSize(width, height)
    .fillCanvas('#FFFFFF')
    .setTextBaseline('top')
    .setFontFamily('arial')
    .setFontSize(FONT_SIZE)
    .fillText(
      'Regular text that does not have newlines or automatic wrapping',
      MARGIN,
      MARGIN,
      null,
      'black'
    )
    .fillTextMultiline(
      'Text with newline after this...\n...so this is on a newline',
      MARGIN,
      FONT_SIZE * 2
    )
    .translate(multilineTextOffset, 0)
    .strokeLine(0, 0, 0, height, '#AAAAAA')
    .fillTextMultiline(
      'normal\nText that automatically wraps but never breaks words',
      MARGIN,
      MARGIN + FONT_SIZE * 5,
      multilineTextWidth,
      'normal'
    )
    .translate(MARGIN * 2 + multilineTextWidth, 0)
    .strokeLine(0, 0, 0, height, '#AAAAAA')
    .fillTextMultiline(
      'break-word\nText that automatically wraps and breaks words if necessary',
      MARGIN,
      MARGIN + FONT_SIZE * 5,
      multilineTextWidth,
      'break-word'
    )
    .translate(MARGIN * 2 + multilineTextWidth, 0)
    .strokeLine(0, 0, 0, height, '#AAAAAA')
    .fillTextMultiline(
      'break-all\nText that automatically wraps and always breaks words',
      MARGIN,
      MARGIN + FONT_SIZE * 5,
      multilineTextWidth,
      'break-all'
    )
    .translate(MARGIN * 2 + multilineTextWidth, 0)
    .strokeLine(0, 0, 0, height, '#AAAAAA');
};

draw();

window.addEventListener('resize', draw);
