import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

import Icon, { IconProps } from './Icon';

import '../../styles/modules/Action.scss';

interface IProps {
  name?: string;
  icon?: string | IconProps;
  className?: string;

  active?: boolean;
  activate?: () => void;
  deactivate?: () => void;
}

export default class Action extends Component<IProps> {
  render() {
    return (
      <Button 
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
    if (this.props.name) {
      return (
        <span>
          {this.props.name}
        </span>
      );
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
