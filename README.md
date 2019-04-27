# Canvasimo [![CircleCI](https://circleci.com/gh/JakeSidSmith/canvasimo/tree/master.svg?style=svg)](https://circleci.com/gh/JakeSidSmith/canvasimo/tree/master)

An HTML5 canvas drawing library, with 150+ useful methods, jQuery-like fluent interface, and cross-browser compatibility enhancements.

**Full documentation and examples available on [canvasimo.com](http://canvasimo.com)**

## Installation

Install Canvasimo with npm (add `--save` to add to your package.json)

```shell
npm install canvasimo
```

...or download from [GitHub](https://github.com/JakeSidSmith/canvasimo)

## Getting started

### Load Canvasimo

Canvasimo can be bundled with all major build tools, or loaded with a script tag and used as a global

#### With an ES6 bundler / TypeScript (recommended)

```typescript
import Canvasimo from 'canvasimo';
// Or
import { Canvasimo } from 'canvasimo';
```

Both of these will import the Canvasimo class as it is both a default and named export.

#### With an ES5 bundler / commonjs

```javascript
var canvasimo = require('canvasimo');
var Canvasimo = canvasimo.Canvasimo;
```

#### As a global

```html
<script type="text/javascript" src="path/to/canvasimo.js">
```

Now Canvasimo is accessible globally like so (to allow for ES6 and TypeScript default imports)

```typescript
const Canvasimo = canvasimo.Canvasimo;
```

## Create a Canvasimo instance

```typescript
// Get your canvas element
const element = document.getElementById('canvas');

// Create Canvasimo instance
const canvas = new Canvasimo(element);
```

## Begin drawing

Here's a simple chart example

```typescript
const margin = 20;
const width = 600;
const height = 200;
const start = 0;
const end = 11;
const colors = ['red', 'green', 'blue'];
const data = [
  [3, 7, 2, 8, 3, 8, 5, 4, 4, 7],
  [7, 5, 6, 7, 8, 4, 5, 3, 2, 3],
  [9, 8, 7, 5, 3, 6, 4, 5, 2, 5]
];

canvas
  // Set the canvas size
  .setSize(width, height)
  // Set some initial fill and stroke styles
  .setFill('black')
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
  .repeat(start, end, (index) => {
    canvas
      .fillText(index, margin / 2, height - margin - (height - margin * 2) / 10 * index)
  })
  // Loop over our data
  .forEach(data, (dataSet, index) => {
    const verticalScale = (height - margin * 2) / (end - 1);
    const horizontalScale = (width - margin * 2) / (dataSet.length - 1);

    // Map our values to our chart area
    const values = dataSet.map((value, index) => [index * horizontalScale, -value * verticalScale]);

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

## TypeScript support

As of version `0.7.0` Canvasimo only officially supports TypeScript `3.1.6` and upwards.

Canvasimo _may_ work with older versions of TypeScript, but due to a change in TypeScript's native lib types you will need to create a global type alias:

```ts
type Canvas2DContextAttributes = CanvasRenderingContext2DSettings;
```
