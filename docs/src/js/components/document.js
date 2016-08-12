'use strict';

(function () {

  var React = require('react');
  var docs = require('../docs');
  var Group = require('./group');

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
            <div className="container">
              <div className="doc-container">
                <h1>
                  <a href="#">
                    Canvasimo
                  </a>
                  <span className="version">
                    (Version: {this.props.version})
                  </span>
                </h1>

                {
                  false && (
                    <div>
                      <canvas id="canvas" width="400" height="200" />
                      <script type="text/javascript" src="build/js/canvasimo.js" />
                      <script type="text/javascript" src="build/js/demo.js" />
                    </div>
                  )
                }

                {
                  docs.map(function (group) {
                    return (
                      <Group key={group.name} group={group} />
                    );
                  })
                }
              </div>
            </div>
          </body>
        </html>
      );
    }
  });

  module.exports = Document;

})();
