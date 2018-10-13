declare function ga(event: string, options: {[i: string]: string}): void;

import * as React from 'react';
import { Component } from 'react';
import { Docs } from '../types';
import LinkHeader from './link-header';

interface Props {
  javascript?: boolean;
  docs: Docs;
}

interface State {
  open: boolean;
  query: string;
}

function every<T> (iterable: T[], callback: (item: T, index: number) => boolean) {
  for (let i = 0; i < iterable.length; i += 1) {
    if (!callback(iterable[i], i)) {
      return false;
    }
  }

  return true;
}

export default class Sidebar extends Component<Props, State> {
  public constructor (props: Props) {
    super(props);

    this.state = {
      open: false,
      query: '',
    };
  }

  public onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value,
    });
  }

  public getClassName () {
    return 'sidebar' +
      (this.props.javascript ? ' with-search' : '') +
      (this.state.open ? ' open' : '');
  }

  public onSidebarToggleClick = () => {
    // tslint:disable-next-line:strict-type-predicates
    if (typeof ga === 'function') {
      ga('send', {
        hitType: 'event',
        eventCategory: 'sidebar',
        eventAction: 'click',
        eventLabel: 'Sidebar toggled',
        eventValue: 'opened',
      });
    }

    this.setState({
      open: true,
    });
  }

  public onSidebarOverlayClick = () => {
    // tslint:disable-next-line:strict-type-predicates
    if (typeof ga === 'function') {
      ga('send', {
        hitType: 'event',
        eventCategory: 'sidebar',
        eventAction: 'click',
        eventLabel: 'Sidebar toggled',
        eventValue: 'closed',
      });
    }

    this.setState({
      open: false,
    });
  }

  public onMethodOrGroupClick = (event: React.MouseEvent<HTMLElement>) => {
    // tslint:disable-next-line:strict-type-predicates
    if (typeof ga === 'function') {
      const searchTerm = (this.refs.search as HTMLInputElement).value;
      const href = (event.target instanceof HTMLAnchorElement ?
        event.target.getAttribute('href') : 'unknown') || 'unknown';

      ga('send', {
        hitType: 'event',
        eventCategory: 'link',
        eventAction: 'click',
        eventLabel: 'Sidebar link clicked',
        eventValue: href,
      });

      if (searchTerm) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'search',
          eventAction: 'click',
          eventLabel: 'Sidebar link clicked with search term',
          eventValue: searchTerm,
        });
      }
    }

    this.setState({
      open: false,
    });
  }

  public render () {
    const { docs, javascript } = this.props;

    return (
      <span id="sidebar">
        {
          javascript && (
            <div
              className={'sidebar-overlay' + (this.state.open ? ' open' : '')}
              onClick={this.onSidebarOverlayClick}
            />
          )
        }
        {
          javascript && (
            <div className="sidebar-toggle" onClick={this.onSidebarToggleClick}>
              <span />
            </div>
          )
        }
        <a href="#" className="back-to-top">
          <span />
        </a>
        <div className={this.getClassName()}>
          {
            javascript && (
              <div className="input-wrapper">
                <input
                  ref="search"
                  type="text"
                  placeholder="Search for a method..."
                  value={this.state.query}
                  onChange={this.onSearchChange}
                />
              </div>
            )
          }
          <ul className="scrollable">
            {
              docs.map((group) => {
                let methods = group.methods;

                if (this.state.query) {
                  const parts = this.state.query.replace(/^\s+/, '').replace(/\s+$/, '').split(/\s+/g);
                  methods = methods.filter(({name, alias}) => {
                    return every(parts, (part) => {
                      return name.toLowerCase().indexOf(part.toLowerCase()) >= 0 ||
                        Boolean(alias && alias.toLowerCase().indexOf(part.toLowerCase()) >= 0);
                    });
                  });
                }

                if (!methods.length) {
                  return null;
                }

                return (
                  <LinkHeader
                    noId
                    type="li"
                    header={group.name}
                    key={group.name}
                    onClick={this.onMethodOrGroupClick}
                  >
                    <ul>
                      {
                        methods.map(({name, alias}) => {
                          return (
                            <LinkHeader
                              noId
                              type="li"
                              header={name}
                              key={name}
                              onClick={this.onMethodOrGroupClick}
                            >
                              {Boolean(alias) && ` / ${alias}`}
                            </LinkHeader>
                          );
                        })
                      }
                    </ul>
                  </LinkHeader>
                );
              })
            }
          </ul>
        </div>
      </span>
    );
  }
}
