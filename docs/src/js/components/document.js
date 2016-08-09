'use strict';

(function () {

  var React = require('react');
  var docs = require('../docs');
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
            <link rel="stylesheet" href="src/css/styles.css" media="screen" title="no title" charSet="utf-8" />
          </head>
          <body>
            <div className="container">
              <div className="doc-container">
                {
                  docs.map(function (group) {
                    return (
                      <div className="group" key={group.name}>
                        <LinkHeader type="h2" header={group.name} className="group-header" />
                        {
                          group.methods.map(function (method) {
                            return (
                              <div className="method" key={method.name}>
                                <LinkHeader type="h3" header={method.name}>
                                  {
                                    method.alias && (
                                      <span className="alias">
                                        <span className="alias-word">Alias: </span>
                                        <strong className="alias-method">{method.alias}</strong>
                                      </span>
                                    )
                                  }
                                </LinkHeader>
                                <p>
                                  {method.description}
                                </p>
                              </div>
                            );
                          })
                        }
                      </div>
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
