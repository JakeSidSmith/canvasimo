import * as React from 'react';
import { Component } from 'react';
import { GroupedMethod } from '../types';
import LinkHeader from './link-header';
import Signature from './signature';

interface Props {
  method: GroupedMethod;
}

export default class MethodComponent extends Component<Props, {}> {
  public render () {
    const method = this.props.method;
    const { signatures } = method;

    return (
      <div className="method" key={method.name}>
        <LinkHeader type="h3" header={method.name} />
        <p>
          {method.description}
        </p>
        <pre>
          {
            signatures.map((signature, index) => <Signature key={index} signature={signature} method={method} />)
          }
        </pre>
      </div>
    );
  }
}
