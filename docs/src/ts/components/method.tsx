import * as React from 'react';
import { Component } from 'react';
import { Method } from '../types';

interface Props {
  method: Method;
}

export default class MethodComponent extends Component<Props, {}> {
  public render () {
    const method = this.props.method;
    const { arguments: args } = method;

    return (
      <pre>

        <span className="code-object">canvas</span>
        <span>.</span>
        <span className="code-property">{method.name}</span>
        <span>(</span>
        {
          args && args.map((arg, index) => {
            const isLastArgument = index === args.length - 1;

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
}
