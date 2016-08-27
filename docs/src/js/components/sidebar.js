/* global ga */

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

    onSidebarToggleClick: function () {
      if (typeof ga === 'function') {
        ga('send', {
          hitType: 'event',
          eventCategory: 'sidebar',
          eventAction: 'click',
          eventLabel: 'Sidebar toggled',
          eventValue: 'opened'
        });
      }

      this.setState({
        open: true
      });
    },

    onSidebarOverlayClick: function () {
      if (typeof ga === 'function') {
        ga('send', {
          hitType: 'event',
          eventCategory: 'sidebar',
          eventAction: 'click',
          eventLabel: 'Sidebar toggled',
          eventValue: 'closed'
        });
      }

      this.setState({
        open: false
      });
    },

    onMethodOrGroupClick: function (event) {
      if (typeof ga === 'function') {
        var href = event.target && event.target.getAttribute('href') || 'unknown';

        ga('send', {
          hitType: 'event',
          eventCategory: 'link',
          eventAction: 'click',
          eventLabel: 'Sidebar link clicked',
          eventValue: href
        });
      }

      this.setState({
        open: false
      });
    },

    render: function () {
      var javascript = this.props.javascript;

      return (
        <span id="sidebar">
          {
            javascript && (
              <div
                className={'sidebar-overlay' + (this.state.open ? ' open' : '')}
                onClick={this.onSidebarOverlayClick}
              />
            )
          }
          {
            javascript && (
              <div className="sidebar-toggle" onClick={this.onSidebarToggleClick}>
                <span />
              </div>
            )
          }
          <a href="#" className="back-to-top">
            <span />
          </a>
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
                      onClick={this.onMethodOrGroupClick}
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
                                onClick={this.onMethodOrGroupClick}
                              >
                              {method.alias && (' / ' + method.alias)}
                              </LinkHeader>
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
