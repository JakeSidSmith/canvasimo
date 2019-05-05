import Canvasimo from '../../../src';

(window as any).canvasimo = {Canvasimo};
(window as any).Canvasimo = Canvasimo;

const element = document.getElementById('demo-1');

if (!element) {
  throw new Error('Could not find canvas element for demo');
}

const parentElement = element.parentElement;
const canvas = new Canvasimo(element as HTMLCanvasElement)
  .setDensity(2)
  .setStrokeCap('round')
  .setStrokeJoin('round');

canvas.version(true);

interface Tree {
  length: number;
  targetLength: number;
  angle: number;
  children: null | Tree[];
}

let raf: number;
let lastPos: undefined | number;
let velocity = 0;
let tree: Tree;
let tree1: Tree;
let tree2: Tree;

const createTree = (length: number): Tree => {
  return {
    length: 0,
    targetLength: length + Math.random() * 5,
    angle: canvas.getRadiansFromDegrees(-90 + Math.random() * 10 - 5),
    children: null,
  };
};

const drawBranch = (branch: Tree, depth: number, maxBranchDepth: number): boolean => {
  let treeDone;
  const strokeWidth = Math.max(maxBranchDepth / (depth + 1) / 2, 0.1);

  if (branch.length < branch.targetLength) {
    branch.length = Math.min(branch.length + branch.targetLength / 20, branch.targetLength);
  } else if (!branch.children && depth === maxBranchDepth && branch.length === branch.targetLength) {
    treeDone = true;
  } else if (!branch.children && depth < maxBranchDepth) {
    branch.children = [] as Tree[];
    const childCount = 2 + Math.floor(Math.random() * 2);

    const possibleRotation = depth < 1 ? 20 : 45;

    for (let c = 0; c < childCount; c += 1) {
      branch.children.push({
        length: 0,
        targetLength: branch.targetLength * 0.75 + Math.random() * branch.targetLength * 0.25,
        angle: canvas.getRadiansFromDegrees(Math.random() * possibleRotation * 2 - possibleRotation),
        children: null,
      });
    }
  }

  canvas
    .save()
    .rotate(branch.angle + canvas.getRadiansFromDegrees(velocity * 0.01))
    .setStrokeWidth(strokeWidth)
    .beginPath()
    .plotClosedPath([
      0, -strokeWidth / 4,
      branch.length, 0,
      branch.length, 0,
      0, strokeWidth / 4,
    ])
    .fill('black')
    .stroke('black')
    .closePath()
    .translate(branch.length, 0);

  if (branch.children) {
    for (const child of branch.children) {
      const branchDone = drawBranch(child, depth + 1, maxBranchDepth);

      if (treeDone !== false || branchDone === false) {
        treeDone = branchDone;
      }
    }
  }

  canvas.restore();

  return Boolean(treeDone);
};

const draw = () => {
  window.cancelAnimationFrame(raf);

  canvas
    .clearCanvas()
    .translate(canvas.getWidth() / 2, canvas.getHeight());

  const treeDone = drawBranch(tree, 0, 6);
  let tree1Done;
  let tree2Done;

  if (window.innerWidth >= 768) {
    canvas.translate(-canvas.getWidth() / 4, 0);
    tree1Done = drawBranch(tree1, 0, 4);
    canvas.translate(canvas.getWidth() / 2, 0);
    tree2Done = drawBranch(tree2, 0, 4);
  }

  if (!treeDone || (window.innerWidth >= 768 && (!tree1Done || !tree2Done)) || Math.abs(velocity) > 0.5) {
    raf = window.requestAnimationFrame(draw);
  }

  velocity *= 0.95;
};

const setCanvasSize = () => {
  canvas
    .setWidth((parentElement as HTMLElement).clientWidth);

  window.requestAnimationFrame(draw);
};

const mouseMove = (event: MouseEvent) => {
  const thisPos = event.clientX;

  if (typeof lastPos !== 'undefined') {
    velocity += (thisPos - lastPos) * (event.type.indexOf('touch') >= 0 ? 2 : 1);
  }

  lastPos = thisPos;

  raf = window.requestAnimationFrame(draw);
};

const touchMove = (event: TouchEvent) => {
  if (event.touches[0]) {
    (event as any).clientX = event.touches[0].clientX;
    (event as any).clientY = event.touches[0].clientY;
    mouseMove(event as any as MouseEvent);
  }
};

const touchEnd = () => {
  lastPos = undefined;
};

const reset = () => {
  tree = createTree(30);
  tree1 = createTree(20);
  tree2 = createTree(20);
  window.requestAnimationFrame(draw);
};

element.addEventListener('click', reset);
element.addEventListener('mousemove', mouseMove);
element.addEventListener('touchmove', touchMove);
element.addEventListener('touchend', touchEnd);
window.addEventListener('resize', setCanvasSize);

tree = createTree(30);
tree1 = createTree(20);
tree2 = createTree(20);
setCanvasSize();
