'use strict';

(function () {

  var React = require('react');
  var docs = require('../docs');
  var LinkHeader = require('./link-header');

  var Sidebar = React.createClass({
    render: function () {
      return (
        <div className="sidebar">
          <ul>
            {
              docs.map(function (group) {
                return (
                  <LinkHeader
                    noId
                    type="li"
                    header={group.name}
                    key={group.name}
                  >
                    <ul>
                      {
                        group.methods.map(function (method) {
                          return (
                            <LinkHeader
                              noId
                              type="li"
                              header={method.name}
                              key={method.name}
                            />
                          );
                        })
                      }
                    </ul>
                  </LinkHeader>
                );
              })
            }
          </ul>
        </div>
      );
    }
  });

  module.exports = Sidebar;

})();
