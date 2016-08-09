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

      return (
        <Component className={this.props.className} id={slug}>
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
