import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import { Component } from 'react';
import { Docs } from '../types';
import Analytics from './analytics';
import Group from './group';
import LinkHeader from './link-header';
import Sidebar from './sidebar';

const MATCHES_CANVASIMO_IMPORT = /import\s+Canvasimo\s+from\s+'.+'/;
const MATCHES_CANVASIMO_PATH = /'.+'/;

// tslint:disable-next-line:no-var-requires
const docs: Docs = require('../../../build/json/docs.json');

const getExampleCode = (code: string) => {
  return code.replace(MATCHES_CANVASIMO_IMPORT, (subString: string) => {
      return subString.replace(MATCHES_CANVASIMO_PATH, '\'canvasimo\'');
    });
};

const exampleBasicShapes = getExampleCode(
  fs.readFileSync(path.join(__dirname, '../examples/basic-shapes.ts'), 'utf8')
);
const exampleMultilineText = getExampleCode(
  fs.readFileSync(path.join(__dirname, '../examples/multiline-text.ts'), 'utf8')
);

const TITLE = 'Canvasimo | The fluent HTML5 canvas drawing library';

const KEYWORDS = [
  'jquery',
  'canvas',
  'html5',
  'drawing',
  'fluent',
  'api',
  'cross-browser',
  'compatibility',
  'compatible',
  'javascript',
  'documentation',
  'docs',
  'canvasimo',
].join(',');

interface Props {
  description: string;
  version: string;
}

export default class Document extends Component<Props, {}> {
  public render () {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

          <meta name="google-site-verification" content="v7dZv2Lwh9l9qnCqp1ZMPSKqSGV5MhSTtn7zh_Y-JkA" />

          <meta name="author" content="Jake 'Sid' Smith" />
          <meta name="description" content={this.props.description} />
          <meta name="keywords" content={KEYWORDS} />

          <meta name="og:url" content="http://canvasimo.com" />
          <meta name="og:type" content="website" />
          <meta name="og:site_name" content="Canvasimo" />
          <meta name="og:title" content={TITLE} />
          <meta name="og:description" content={this.props.description} />
          <title>
            {TITLE}
          </title>
          <link
            rel="stylesheet"
            href="build/css/styles.css"
            media="screen"
            title="no title"
          />
        </head>
        <body>
          <div className="wrapper">

            <Sidebar docs={docs} />

            <div className="container">
              <div className="doc-container">
                <h1 className="main-header">
                  <a href="#">
                    Canvasimo
                  </a>
                  <span className="version">
                    (Version: {this.props.version})
                  </span>
                </h1>

                <p>
                  <strong>
                    {this.props.description.replace(/\.$/, ' to make your life easier. ')}
                    Includes methods for drawing shapes not supported by the standard canvas API,
                    loops, intuitive font control,
                    and a host of helper methods for creating colors, calculating distances,
                    converting angles, and much more.
                  </strong>
                </p>

                <p className="badges">
                  <a
                    className="badge circleci"
                    href="https://circleci.com/gh/JakeSidSmith/canvasimo"
                    target="_blank"
                  >
                    <img
                      src="https://circleci.com/gh/JakeSidSmith/canvasimo.svg?style=svg"
                      alt="Circle CI Status Badge"
                    />
                  </a>
                  <a
                    className="badge npm"
                    href="https://www.npmjs.com/package/canvasimo"
                    target="_blank"
                  >
                    NPM
                  </a>
                  <a
                    className="badge github"
                    href="https://github.com/jakesidsmith/canvasimo"
                    target="_blank"
                  >
                    GitHub
                  </a>
                  <a
                    className="badge github"
                    href="https://github.com/jakesidsmith/canvasimo/issues"
                    target="_blank"
                  >
                    Issues
                  </a>
                </p>

                <LinkHeader type="h2" header="Demo" />

                <div className="demo-container">
                  <canvas id="demo-1" width="400" height="200">
                    Looks like this browser doesn't support the canvas element, or you have javascript disabled.
                  </canvas>
                </div>
                <noscript>
                  You must have javascript enabled for this demo.
                </noscript>

                <LinkHeader type="h2" header="Features" />

                <ul>
                  <li>
                    Fluent interface
                  </li>
                  <li>
                    Idiomatic method names
                  </li>
                  <li>
                    Alias original canvas methods
                  </li>
                  <li>
                    Improved browser compatibility
                  </li>
                  <li>
                    Additional drawing methods
                  </li>
                  <li>
                    Useful helper functions
                  </li>
                  <li>
                    Retain context state when resizing / clearing the canvas
                  </li>
                </ul>

                <LinkHeader type="h2" header="About" />

                <p>
                  Canvasimo (canvas in my opinion) started off as a simple concept - create wrappers for the standard
                  canvas API to create a fluent interface, and allow access to canvas attributes with getters and
                  setters.
                </p>

                <p>
                  This quickly evolved into a project that not only wrapped the existing canvas API, but added some
                  additional methods (e.g. for creating rounded rectangles), and ensured that experimental features
                  (such as reset transform and ellipse) worked in all browsers.
                </p>

                <p>
                  Along the way, I realised that a lot of the canvas attributes & methods were not very idiomatic,
                  and so I came up with some more suitable method / attribute names.
                </p>

                <p>
                  For example, shape drawing is broken into 3 types: <code>plotShape</code>, <code>fillShape</code>,
                  and <code>strokeShape</code>.
                  You'll find these 3 methods for almost every shape,
                  e.g. <code>plotRect</code>, <code>fillRect</code> and <code>strokeRect</code>.
                  All the original methods are still available as aliases, e.g. <code>rect</code>.
                </p>

                <p>
                  Similarly attributes regarding lines and strokes had a mixed set of names, so to simplify this, any
                  style related attributes are referred to as stroke, and line is now a shape.
                  For example, where you previously had <code>strokeStyle</code> and <code>lineWidth</code>, you now
                  have <code>stroke</code> and <code>strokeWidth</code>, both of which are available through getters
                  and setters; <code>setStroke</code>, <code>setStrokeWidth</code>.
                  You can, however, still use their aliases; <code>setStrokeStyle</code>, <code>setLineWidth</code>.
                </p>

                <p>
                  Additionally, any methods that previously relied on setting the stroke or fill color before-hand,
                  can now optionally have a color passed as their final argument,
                  e.g. <code>fillRect(0, 0, 10, 10, 'black')</code>, <code>strokeLine(0, 0, 0, 20, 'red')</code>.
                  And similarly, the fill and stroke methods can now be passed a color; <code>fill('red')</code>, <code>
                    stroke('green')</code>, <code>fillCanvas('blue')</code>.
                </p>

                <LinkHeader type="h2" header="Examples" />

                <LinkHeader type="h3" header="Basic shapes" />

                <div className="demo-container">
                  <canvas id="example-basic-shapes" width="400" height="200">
                    Looks like this browser doesn't support the canvas element, or you have javascript disabled.
                  </canvas>
                </div>
                <noscript>
                  You must have javascript enabled for this example.
                </noscript>

                <pre>{exampleBasicShapes}</pre>

                <LinkHeader type="h3" header="Multiline text" />

                <div className="demo-container">
                  <canvas id="example-multiline-text" width="400" height="200">
                    Looks like this browser doesn't support the canvas element, or you have javascript disabled.
                  </canvas>
                </div>
                <noscript>
                  You must have javascript enabled for this example.
                </noscript>

                <pre>{exampleMultilineText}</pre>

                <LinkHeader type="h1" header="Documentation" className="main-header" />

                {
                  docs.map((group) => {
                    return (
                      <Group key={group.name} group={group} />
                    );
                  })
                }
              </div>
            </div>

          </div>

          <Analytics />

          <script type="text/javascript" src="build/js/bundle.js" />
        </body>
      </html>
    );
  }
}
