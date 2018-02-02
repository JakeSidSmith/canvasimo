import * as React from 'react';
import { Component } from 'react';
import { Group } from '../types';
import LinkHeader from './link-header';
import Method from './method';

interface Props {
  group: Group;
}

export default class GroupComponent extends Component<Props, {}> {
  public render () {
    const group = this.props.group;

    return (
      <div className="group">
        <LinkHeader type="h2" header={group.name} className="group-header" />
        <p>
          {group.description}
        </p>
        {
          group.methods.map((method) => {
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
                <Method method={method} />
              </div>
            );
          })
        }
      </div>
    );
  }
}
