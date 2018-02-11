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
    const { method, method: { name, alias } } = this.props;
    const { signatures, typeAliases } = method;

    return (
      <div className="method" key={name}>
        <LinkHeader type="h3" header={name}>
          {
            Boolean(alias) && (
              <span className="alias">
                <span className="alias-word">Alias: </span>
                <strong className="alias-method">{alias}</strong>
              </span>
            )
          }
        </LinkHeader>
        <p>
          {method.description}
        </p>
        <pre>
          {
            signatures.map((signature, index) => <Signature key={index} signature={signature} method={method} />)
          }
        </pre>
        {
          Boolean(typeAliases.length) && (
            <pre>
              {
                typeAliases.map((typeAlias) => (
                  <div key={typeAlias.name}>
                    type <span className="code-type">{typeAlias.name}</span>
                    {' = '}
                    <span className="code-type">{typeAlias.alias}</span>;
                  </div>
                ))
              }
            </pre>
          )
        }
      </div>
    );
  }
}
