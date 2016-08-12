'use strict';

(function () {

  var React = require('react');

  function createSlug (text) {
    return (text || '').toLowerCase().replace(/^\s+/, '').replace(/\s+$/, '').replace(/[\s_]/gi, '-');
  }

  var LinkHeader = React.createClass({
    render: function () {
      var Component = this.props.type;
      var slug = createSlug(this.props.header);
      var noId = this.props.noId;

      return (
        <Component className={this.props.className} id={noId ? null : slug}>
          <a href={'#' + slug}>
            {this.props.header}
          </a>
          {this.props.children}
        </Component>
      );
    }
  });

  module.exports = LinkHeader;

})();
