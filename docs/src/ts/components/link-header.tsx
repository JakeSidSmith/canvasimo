import * as React from 'react';
import { Component } from 'react';

const createSlug = (text?: string) => {
  return (text || '').toLowerCase().replace(/^\s+/, '').replace(/\s+$/, '').replace(/[\s_]/gi, '-');
};

interface Props {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li';
  header: string;
  className?: string;
  noId?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => any;
}

export default class LinkHeader extends Component<Props, {}> {
  public render () {
    const ComponentType = this.props.type;
    const slug = createSlug(this.props.header);

    return (
      <ComponentType
        className={this.props.className}
        id={this.props.noId ? undefined : slug}
      >
        <a
          href={'#' + slug}
          onClick={this.props.onClick}
        >
          {this.props.header}
        </a>
        {this.props.children}
      </ComponentType>
    );
  }
}
