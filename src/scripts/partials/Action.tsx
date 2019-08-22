import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

import Icon, { IconProps } from './Icon';

import SmartLink from './SmartLink';
import ClickHandler from './ClickHandler';
import { nodeOrParentMatching } from '../helpers/DOMHelpers';

interface IProps {
  internalName?: string;

  name?: string;
  activeName?: string;
  icon?: string | IconProps;
  className?: string;

  active?: boolean;
  activate?: () => void;
  deactivate?: () => void;
  href?: string;

  contextActive?: boolean;
  openContext?: () => void;
  closeContext?: () => void;
}

function callFirstThatIsFunction(...funcs) {
  for (let func of funcs) {
    if (typeof func === 'function') {
      func();
      return;
    }
  }
}

export default class Action extends Component<IProps> {
  render() {
    return (
      <ClickHandler 
        onClick={this.onClickCb('short')} 
        onHoldClick={this.onClickCb('long')}
      >
        <Button
          {...SmartLink.shim(this.props.href)}
          className={
            `Action
            action-${this.props.internalName} 
            ${this.props.active && 'active-action'} 
            ${this.props.className}`
          }
          variant="link" 
        >
          {this.getIcon()}
          {this.getName()}
        </Button>
      </ClickHandler>
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

  onClickCb = (click: 'short' | 'long') => {
    const { 
      active, 
      activate, 
      deactivate, 
      contextActive, 
    } = this.props;    
    
    return () => {
      if (click === 'short') {
        if (active) {
          callFirstThatIsFunction(deactivate, this.closeContextAndRemoveBind());
        } else {
          callFirstThatIsFunction(activate, this.openContextAndBindToCloseCb());
        }
      } else {
        const regularFallback = active ? deactivate : activate;
        if (contextActive) {
          callFirstThatIsFunction(this.closeContextAndRemoveBind(), regularFallback);
        } else {
          callFirstThatIsFunction(this.openContextAndBindToCloseCb(), regularFallback);
        }
      }
    }
  }

  openContextAndBindToCloseCb() {
    const { openContext } = this.props;
    if (!openContext) {
      return;
    }

    return () => {
      openContext();
      document.addEventListener('click', this.clickedOutsideContext)
    }
  }

  closeContextAndRemoveBind() {
    const { closeContext } = this.props;
    if (!closeContext) {
      return;
    }

    return () => {
      closeContext();
      document.removeEventListener('click', this.clickedOutsideContext);
    }
  }

  clickedOutsideContext = ({ target }) => {
    const { internalName, closeContext } = this.props;

    if (!this.props.contextActive || nodeOrParentMatching(target, 
      ({ classList }) => classList.contains(`action-${internalName}`) 
    )) {
      return;
    }

    if (typeof closeContext === 'function') {
      closeContext();
    }
  }
}
