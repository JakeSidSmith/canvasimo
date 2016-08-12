'use strict';

(function () {

  var React = require('react');
  var docs = require('../docs');
  var LinkHeader = require('./link-header');

  var Sidebar = React.createClass({
    getInitialState: function() {
      return {
        open: false
      };
    },

    getClassName: function () {
      return 'sidebar' +
        (this.props.javascript ? ' with-search' : '') +
        (this.state.open ? ' open' : '');
    },

    toggleSidebar: function () {
      this.setState({
        open: !this.state.open
      });
    },

    render: function () {
      var javascript = this.props.javascript;

      return (
        <span id="sidebar">
          {
            javascript && (
              <div className="sidebar-toggle" onClick={this.toggleSidebar}>
                <span />
              </div>
            )
          }
          {
            javascript && (
              <div
                className={'sidebar-overlay' + (this.state.open ? ' open' : '')}
                onClick={this.toggleSidebar}
              />
            )
          }
          <div className={this.getClassName()}>
            {
              javascript && (
                <div className="input-wrapper">
                  <input type="text" placeholder="Search for a method..." />
                </div>
              )
            }
            <ul className="scrollable">
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
        </span>
      );
    }
  });

  module.exports = Sidebar;

})();
