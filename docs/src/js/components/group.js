'use strict';

(function () {

  var React = require('react');
  var LinkHeader = require('./link-header');
  var Method = require('./method');

  var Group = React.createClass({
    render: function () {
      var group = this.props.group;

      return (
        <div className="group">
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
                  <Method />
                </div>
              );
            })
          }
        </div>
      );
    }
  });

  module.exports = Group;

})();
