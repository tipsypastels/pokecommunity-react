import React, { Component, ReactNode } from 'react';

// can't be a function bc react is dumb
export default class DropdownTriggerWithoutFormatting extends Component<{
  onClick?: (e) => void;
  children: ReactNode;
}> {
  render() {
    return (
      <span onClick={this.props.onClick}>
        {this.props.children}
      </span>
    );
  }
}