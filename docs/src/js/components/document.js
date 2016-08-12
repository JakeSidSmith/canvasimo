'use strict';

(function () {

  var React = require('react');
  var docs = require('../docs');
  var Sidebar = require('./sidebar');
  var Group = require('./group');
  var LinkHeader = require('./link-header');

  var Document = React.createClass({
    render: function () {
      return (
        <html>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <title>
              Canvasimo
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

                  {
                    false && (
                      <div>
                        <canvas id="canvas" width="400" height="200" />
                        <script type="text/javascript" src="build/js/canvasimo.js" />
                        <script type="text/javascript" src="build/js/demo.js" />
                      </div>
                    )
                  }

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
          </body>
        </html>
      );
    }
  });

  module.exports = Document;

})();
