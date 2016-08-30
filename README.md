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
