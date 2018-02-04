import * as React from 'react';
import { GroupedMethod, Signature as SignatureShape } from '../types';

interface Props {
  signature: SignatureShape;
  method: GroupedMethod;
}

const Signature = ({method, signature: { parameters, returns }}: Props) => (
  <div>
    <span className="code-object">canvas</span>
    <span>.</span>
    <span className="code-property">{method.name}</span>
    <span>(</span>
    {
      parameters.map(({name, type, optional}, index) => {
        const isLastArgument = index === parameters.length - 1;

        return (
          <span key={name}>
            <span className="code-argument">{name}</span>
            {optional && '?'}
            {': '}
            <span className="code-type">
              {type}
            </span>
            {
              !isLastArgument && (
                <span>, </span>
              )
            }
          </span>
        );
      })
    }
    <span>) => <span className="code-type">{returns}</span>;</span>
  </div>
);

export default Signature;
