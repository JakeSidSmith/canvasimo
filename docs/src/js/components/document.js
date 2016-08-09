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
            <link rel="stylesheet" href="src/css/styles.css" media="screen" title="no title" charSet="utf-8" />
          </head>
          <body>
            <div className="container">
              <div className="doc-container">
                {
                  docs.map(function (group) {
                    return (
                      <Group key={group.name} group={group} />
                    );
                  })
                }
              </div>
              Hello, World!
            </div>
          </body>
        </html>
      );
    }
  });

  module.exports = Document;

})();
