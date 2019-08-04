import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

import Icon, { IconProps } from './Icon';

import SmartLink from './SmartLink';

interface IProps {
  name?: string;
  activeName?: string;
  icon?: string | IconProps;
  className?: string;

  active?: boolean;
  activate?: () => void;
  deactivate?: () => void;
  href?: string;
}

export default class Action extends Component<IProps> {
  render() {
    return (
      <Button
        {...SmartLink.shim(this.props.href)}
        className={
          `Action 
          ${this.props.active && 'active-action'} 
          ${this.props.className}`
        }
        variant="link" 
        onClick={this.onClick}
      >
        {this.getIcon()}
        {this.getName()}
      </Button>
    )
  }

  getIcon() {
    if (this.props.icon) {
      return (
        <Icon.Maybe from={this.props.icon} />
      );
    }
  }

  getName() {
    const { active, name, activeName } = this.props;
    let relevantName;

    if (active) {
      relevantName = activeName || name;
    } else {
      relevantName = name;
    }

    if (relevantName) {
      return <span>{relevantName}</span>
    }
  }

  onClick = () => {
    const { active, activate, deactivate } = this.props;
    const handler = active ? deactivate : activate;

    if (typeof handler === 'function') {
      handler();
    }
  }
}
