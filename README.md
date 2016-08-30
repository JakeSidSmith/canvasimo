# Canvasimo [![CircleCI](https://circleci.com/gh/JakeSidSmith/canvasimo/tree/master.svg?style=svg)](https://circleci.com/gh/JakeSidSmith/canvasimo/tree/master)

A HTML5 canvas drawing library, with 150+ useful methods, jQuery-like fluent interface, and cross-browser compatibility enhancements.

**Full documentation and examples available on [canvasimo.com](http://canvasimo.com)**

## Installation

Install Canvasimo with npm (add `--save` to add to your package.json)

```shell
npm install canvasimo
```

...or download the source from [GitHub](https://github.com/JakeSidSmith/canvasimo)

## Getting started

### Load Canvasimo

Canvasimo can be bundled with all major build tools, or loaded with a script tag and used as a global

#### As a global

```html
<script type="text/javascript" src="path/to/canvasimo.js">
```

Now Canvasimo is accessible globally

#### With a bundler (commonjs example)

```javascript
var Canvasimo = require('canvasimo');
```

## Creating a Canvasimo instance

```javascript
// Get your canvas element
var element = document.getElementById('canvas');

// Create Canvasimo instance
var canvas = new Canvasimo(element);
```

## Begin drawing

Here's a simple chart example

```javascript
var margin = 20;
var width = 600;
var height = 200;
var min = 0;
var max = 10;
var colors = ['red', 'green', 'blue'];
var data = [
  [3, 7, 2, 8, 3, 8, 5, 4, 4, 7],
  [7, 5, 6, 7, 8, 4, 5, 3, 2, 3],
  [9, 8, 7, 5, 3, 6, 4, 5, 2, 5]
];

canvas
  .setSize(width, height)
  .tap(function () {
    canvas
      .beginPath()
      .strokeLine(margin, margin, margin, height - margin)
      .beginPath()
      .strokeLine(margin, height - margin, width - margin, height - margin)
  })
  .setTextAlign('center')
  .setTextBaseline('middle')
  .repeat(min, max + 1, function (index) {
    canvas
      .fillText(index, margin / 2, height - margin - (height - margin * 2) / 10 * index)
  })
  .forEach(data, function (dataSet, index) {

    var verticalScale = (canvas.getHeight() - margin * 2) / max;
    var horizontalScale = (canvas.getWidth() - margin * 2) / (dataSet.length - 1);

    var values = dataSet.map(function (value, index) {
      return [index * horizontalScale, -value * verticalScale];
    });

    canvas
      .save()
      .translate(margin, height - margin)
      .beginPath()
      .strokePath(values, colors[index])
      .restore()
  });
```
