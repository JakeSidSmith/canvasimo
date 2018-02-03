import * as React from 'react';
import { Component } from 'react';
import { Method } from '../types';

interface Props {
  method: Method;
}

export default class MethodComponent extends Component<Props, {}> {
  public render () {
    const method = this.props.method;
    const { parameters } = method;

    return (
      <pre>

        <span className="code-object">canvas</span>
        <span>.</span>
        <span className="code-property">{method.name}</span>
        <span>(</span>
        {
          parameters && parameters.map((parameter, index) => {
            const isLastArgument = index === parameters.length - 1;

            return (
              <span key={parameter.name}>
                <span className="code-argument">{parameter.name}</span>
                <span className="code-type">
                  {' <' + (Array.isArray(parameter.type) ? parameter.type.join(', ') : parameter.type) + '>'}
                </span>
                {
                  parameter.optional && (
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
