'use strict';

(function () {

  var React = require('react');
  var docs = require('../docs');
  var Analytics = require('./analytics');
  var Sidebar = require('./sidebar');
  var Group = require('./group');
  var LinkHeader = require('./link-header');

  // ~55 Characters
  var title = 'Canvasimo | The fluent HTML5 canvas drawing library';

  // ~140 Characters
  var description = 'A HTML5 canvas drawing library, with 150+ useful methods, jQuery-like fluent interface, ' +
    'and cross-browser compatibility enhancements';

  var keywords = [
    'Canvasimo',
    'canvas',
    'HTML5',
    'fluent interface',
    'API',
    'jQuery',
    'cross browser',
    'compatibility'
  ].join(',');

  var Document = React.createClass({
    render: function () {
      return (
        <html>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

            <meta name="google-site-verification" content="v7dZv2Lwh9l9qnCqp1ZMPSKqSGV5MhSTtn7zh_Y-JkA" />

            <meta name="author" content="Jake 'Sid' Smith" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            <meta name="og:url" content="http://canvasimo.com" />
            <meta name="og:type" content="website" />
            <meta name="og:site_name" content="Canvasimo" />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={description + '.'} />
            <title>
              {title}
            </title>
            <link
              rel="stylesheet"
              href="build/css/styles.css"
              media="screen"
              title="no title"
              charSet="utf-8"
            />
          </head>
          <body>
            <div className="wrapper">

              <Sidebar />

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
                      {description}, and fixes cross browser issues, making it a lot easier to work with canvas.
                      You can think of Canvasimo as the jQuery of the canvas API.
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

                  <canvas id="canvas" width="400" height="200">
                    Looks like this browser doesn't support the canvas element, or you have javascript disabled.
                  </canvas>
                  <noscript>
                    You must have javascript enabled for this demo.
                  </noscript>
                  <script type="text/javascript" src="build/js/canvasimo.js" />
                  <script type="text/javascript" src="build/js/demo.js" />

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
                  </ul>

                  <LinkHeader type="h2" header="About" />

                  {/* eslint-disable max-len */}

                  <p>
                    Canvasimo (Canvas in my opinion) started off as a simple concept - create wrappers for the standard canvas API to create a fluent interface, and allow access to canvas attributes with getters and setters.
                  </p>

                  <p>
                    This quickly evolved into a project that not only wrapped the existing canvas API, but added some additional methods (e.g. for creating rounded rectangles), and ensured that experimental features (such as reset transform and ellipse) worked in all browsers.
                  </p>

                  <p>
                    Along the way, I realised that a lot of the canvas attributes & methods were not very idiomatic, and so I came up with some more suitable method / attribute names.
                  </p>

                  <p>
                    For example, shape drawing is broken into 3 types: <code>plotShape</code>, <code>fillShape</code>, and <code>strokeShape</code>.
                    You'll find these 3 methods for almost every shape, e.g. <code>plotRect</code>, <code>fillRect</code> and <code>strokeRect</code>.
                    All the original methods are still available as aliases, e.g. <code>rect</code>.
                  </p>

                  <p>
                    Similarly attributes regarding lines and strokes had a mixed set of names, so to simplify this, any style related attributes are referred to as stroke, and line is now a shape.
                    For example, where you previously had <code>strokeStyle</code> and <code>lineWidth</code>, you now have <code>stroke</code> and <code>strokeWidth</code>, both of which are available through getters and setters; <code>setStroke</code>, <code>setStrokeWidth</code>.
                    You can, however, still use their aliases; <code>setStrokeStyle</code>, <code>setLineWidth</code>.
                  </p>

                  <p>
                    Additionally, any methods that previously relied on setting the stroke or fill color before-hand, can now optionally have a color passed as their final argument, e.g. <code>fillRect(0, 0, 10, 10, 'black')</code>, <code>strokeLine(0, 0, 0, 20, 'red')</code>.
                    And similarly, the fill and stroke methods can now be passed a color; <code>fill('red')</code>, <code>stroke('green')</code>, <code>fillCanvas('blue')</code>.
                  </p>

                  {/* eslint-enable max-len */}

                  <LinkHeader type="h1" header="Documentation" className="main-header" />

                  {
                    docs.map(function (group) {
                      return (
                        <Group key={group.name} group={group} />
                      );
                    })
                  }
                </div>
              </div>

            </div>

            <Analytics />
            <script type="text/javascript" src="build/js/tracking.js" />
            <script type="text/javascript" src="build/js/sidebar.js" />
          </body>
        </html>
      );
    }
  });

  module.exports = Document;

})();
