import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

import Icon, { IconProps } from './Icon';

import '../../styles/modules/Action.scss';

interface IProps {
  name: string;
  icon: string | IconProps;

  active: boolean;
  activate: () => void;
  deactivate: () => void;
}

export default class Action extends Component<IProps> {
  render() {
    return (
      <Button 
        className={`Action ${this.props.active && 'active-action'}`}
        variant="link" 
        onClick={this.onClick}
      >
        {this.getIcon()}

        <span>
          {this.props.name}
        </span>
      </Button>
    )
  }

  getIcon() {
    const { icon } = this.props;

    if (typeof icon === 'string') {
      return <Icon name={icon} />;
    }

    return <Icon {...icon} />;
  }

  onClick() {
    const { active, activate, deactivate } = this.props;
    return active ? deactivate : activate;
  }
}
