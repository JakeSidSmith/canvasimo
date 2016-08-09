'use strict';

(function () {

  var React = require('react');
  var docs = require('../docs');

  var DocsContainer = React.createClass({
    render: function () {
      return (
        <div className="container">
          <div className="doc-container">
            {
              docs.map(function (group) {
                return (
                  <div className="group" key={group.name}>
                    <h2>
                      {group.name}
                    </h2>
                  </div>
                );
              })
            }
          </div>
          Hello, World!
        </div>
      );
    }
  });

  module.exports = DocsContainer;

})();
