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
  // Set the canvas size
  .setSize(width, height)
  // Set some initial stroke styles
  .setStroke('black')
  .setStrokeWidth(1)
  // Setup fonts for the axis labels
  .setTextAlign('center')
  .setTextBaseline('middle')
  .setFontFamily('arial')
  .setFontSize(10)
  // Draw the axis lines
  .beginPath()
  .strokeLine(margin, margin, margin, height - margin)
  .beginPath()
  .strokeLine(margin, height - margin, width - margin, height - margin)
  // Draw the x axis labels
  .repeat(min, max + 1, function (index) {
    canvas
      .fillText(index, margin / 2, height - margin - (height - margin * 2) / 10 * index)
  })
  // Loop over our data
  .forEach(data, function (dataSet, index) {
    var verticalScale = (height - margin * 2) / max;
    var horizontalScale = (width - margin * 2) / (dataSet.length - 1);

    // Map our values to our canvas area
    var values = dataSet.map(function (value, index) {
      return [index * horizontalScale, -value * verticalScale];
    });

    canvas
      // Save the current canvas state
      .save()
      // Move to the bottom left corner of the chart area
      .translate(margin, height - margin)
      // Draw a data set as a path
      .beginPath()
      .strokePath(values, colors[index])
      // Restore canvas to its previous state
      .restore()
  });
```
