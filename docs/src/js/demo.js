/* global Canvasimo */

'use strict';

(function () {

  function setupRequestAnimationFrame () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz', 'ms', 'o'];

    for (var i = 0; !window.requestAnimationFrame && i < vendors.length; i += 1) {
      var vendor = vendors[i];
      window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] ||
        window[vendor + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback) {
        var now = new Date().getTime();
        var nextTime = Math.max(0, 16 - (now - lastTime));

        var id = window.setTimeout(function () {
          callback(now + nextTime);
        }, nextTime);

        lastTime = now + nextTime;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  }

  setupRequestAnimationFrame();

  var element = document.getElementById('canvas');
  var parent = element.parentNode;
  var canvas = new Canvasimo(element);

  var raf;
  var lastPos;
  var velocity = 0;
  var tree, tree1, tree2;

  function createTree (length) {
    return {
      length: 0,
      targetLength: length + Math.random() * 5,
      angle: canvas.getRadiansFromDegrees(-90 + Math.random() * 10 - 5),
      children: null
    };
  }

  function drawBranch (branch, depth, maxBranchDepth) {
    var treeDone;
    var strokeWidth = Math.max(maxBranchDepth / (depth + 1) / 2, 0.1);

    if (branch.length < branch.targetLength) {
      branch.length = Math.min(branch.length + branch.targetLength / 20, branch.targetLength);
    } else if (!branch.children && depth === maxBranchDepth && branch.length === branch.targetLength) {
      treeDone = true;
    } else if (!branch.children && depth < maxBranchDepth) {
      branch.children = [];
      var childCount = 2 + Math.floor(Math.random() * 2);

      for (var c = 0; c < childCount; c += 1) {
        branch.children.push({
          length: 0,
          targetLength: branch.targetLength * 0.75 + Math.random() * branch.targetLength * 0.25,
          angle: canvas.getRadiansFromDegrees(Math.random() * 90 - 45),
          children: null
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
        0, strokeWidth / 4
      ])
      .fill('black')
      .stroke('black')
      .closePath()
      .translate(branch.length, 0);

    if (branch.children) {
      for (var i = 0; i < branch.children.length; i += 1) {
        var child = branch.children[i];

        var branchDone = drawBranch(child, depth + 1, maxBranchDepth);

        if (treeDone !== false || branchDone === false) {
          treeDone = branchDone;
        }
      }
    }

    canvas.restore();

    return treeDone;
  }

  function draw () {
    window.cancelAnimationFrame(raf);

    canvas
      .clearCanvas()
      .setStrokeCap('round')
      .setStrokeJoin('round')
      .translate(canvas.getWidth() / 2, canvas.getHeight());

    var treeDone = drawBranch(tree, 0, 7);
    canvas.translate(- canvas.getWidth() / 4, 0)
    var tree1Done = drawBranch(tree1, 0, 4);
    canvas.translate(canvas.getWidth() / 2, 0)
    var tree2Done = drawBranch(tree2, 0, 4);

    if (!treeDone || !tree1Done || !tree2Done || Math.abs(velocity) > 0.5) {
      raf = window.requestAnimationFrame(draw);
    }

    velocity *= 0.95;
  }

  function setCanvasSize () {
    canvas
      .setWidth(parent.clientWidth);

    window.requestAnimationFrame(draw);
  }

  function mouseMove (event) {
    var thisPos = event.clientX;

    if (typeof lastPos !== 'undefined') {
      velocity += (thisPos - lastPos) * (event.type.indexOf('touch') >= 0 ? 2 : 1);
    }

    lastPos = thisPos;

    raf = window.requestAnimationFrame(draw);
  }

  function touchMove (event) {
    if (event.touches[0]) {
      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;
      mouseMove(event);
    }
  }

  function touchEnd () {
    lastPos = undefined;
  }

  function reset () {
    tree = createTree(30);
    tree1 = createTree(20);
    tree2 = createTree(20);
    window.requestAnimationFrame(draw);
  }

  element.addEventListener('click', reset);
  element.addEventListener('mousemove', mouseMove);
  element.addEventListener('touchmove', touchMove);
  element.addEventListener('touchend', touchEnd);
  window.addEventListener('resize', setCanvasSize);

  tree = createTree(30);
  tree1 = createTree(20);
  tree2 = createTree(20);
  setCanvasSize();

})();
