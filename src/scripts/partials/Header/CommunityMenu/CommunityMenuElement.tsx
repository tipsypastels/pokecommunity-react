import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export interface CommunityMenuElementProps {
  className: string;
  name: string;
  link: string;
  internal: boolean;
}

class CommunityMenuElement extends Component<CommunityMenuElementProps> {
  render() {
    if (this.props.internal) {
      return (
        <Link
          to={this.props.link}
          className={`${this.props.className} cm-element`}
        >
          {this.props.name}
        </Link>
      )
    } else {
      return (
        <a
          href={this.props.link}
          className={`${this.props.className} cm-element`}
        >
          {this.props.name}
        </a>
      )
    }
  }
}

export default CommunityMenuElement;