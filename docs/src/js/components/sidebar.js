'use strict';

(function () {

  var _ = require('underscore');
  var React = require('react');
  var docs = require('../docs');
  var LinkHeader = require('./link-header');

  var Sidebar = React.createClass({
    getInitialState: function () {
      return {
        open: false,
        query: ''
      };
    },

    onSearchChange: function (event) {
      this.setState({
        query: event.target.value
      });
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

    onSidebarToggleClick: function () {
      this.toggleSidebar();
    },

    onSidebarOverlayClick: function () {
      this.toggleSidebar();
    },

    render: function () {
      var javascript = this.props.javascript;

      return (
        <span id="sidebar">
          {
            javascript && (
              <div className="sidebar-toggle" onClick={this.onSidebarToggleClick}>
                <span />
              </div>
            )
          }
          {
            javascript && (
              <div
                className={'sidebar-overlay' + (this.state.open ? ' open' : '')}
                onClick={this.onSidebarOverlayClick}
              />
            )
          }
          <div className={this.getClassName()}>
            {
              javascript && (
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Search for a method..."
                    value={this.state.query}
                    onChange={this.onSearchChange}
                  />
                </div>
              )
            }
            <ul className="scrollable">
              {
                _.map(docs, function (group) {
                  var methods = group.methods;

                  if (this.state.query) {
                    var parts = this.state.query.replace(/^\s+/, '').replace(/\s+$/, '').split(/\s+/g);
                    methods = _.filter(methods, function (method) {
                      return _.every(parts, function (part) {
                        return method.name.toLowerCase().indexOf(part.toLowerCase()) >= 0 ||
                          (method.alias && method.alias.toLowerCase().indexOf(part.toLowerCase()) >= 0);
                      }, this);
                    }, this);
                  }

                  if (!methods.length) {
                    return null;
                  }

                  return (
                    <LinkHeader
                      noId
                      type="li"
                      header={group.name}
                      key={group.name}
                    >
                      <ul>
                        {
                          _.map(methods, function (method) {
                            return (
                              <LinkHeader
                                noId
                                type="li"
                                header={method.name}
                                key={method.name}
                              />
                            );
                          }, this)
                        }
                      </ul>
                    </LinkHeader>
                  );
                }, this)
              }
            </ul>
          </div>
        </span>
      );
    }
  });

  module.exports = Sidebar;

})();
