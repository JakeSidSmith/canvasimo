'use strict';

(function () {

  var React = require('react');

  var Method = React.createClass({
    render: function () {
      var method = this.props.method;

      return (
        <pre>

          <span className="code-object">canvas</span>
          <span>.</span>
          <span className="code-property">{method.name}</span>
          <span>(</span>
          {
            method.arguments && method.arguments.map(function (arg, index) {
              var isLastArgument = index === method.arguments.length - 1;

              return (
                <span key={arg.name}>
                  <span className="code-argument">{arg.name}</span>
                  <span className="code-type">
                    {' <' + (Array.isArray(arg.type) ? arg.type.join(', ') : arg.type) + '>'}
                  </span>
                  {
                    arg.optional && (
                      <span className="code-optional"> (Optional)</span>
                    )
                  }
                  {
                    !isLastArgument && (
                      <span>, </span>
                    )
                  }
                </span>
              );
            })
          }
          <span>);</span>
          {
            method.returns && (
              <span>
                <br />
                <span>Returns </span>
                <span className="code-return">{method.returns.name}</span>
                <span className="code-type">{' <' + method.returns.type + '>'}</span>
              </span>
            )
          }
        </pre>
      );
    }
  });

  module.exports = Method;

})();
