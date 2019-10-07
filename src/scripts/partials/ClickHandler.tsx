import React, { Component, ReactNode } from 'react';
import ClickNHold from 'react-click-n-hold';

interface IProps {
  children?: ReactNode;

  onClick?: (e) => void;
  onHoldClick?: (e) => void;
  onHoldRelease?: (e) => void;

  onHoverIn?: (e) => void;
  onHoverOut?: (e) => void;
}

const HOLD_MIN_DURATION_SECONDS = 0.25;

/**
 * A generic wrapper for components that need to access certain custom click listeners - for example, onHoldClick, which doesn't exist in HTML. See the Reactions menu in the Post Footer for an example.
 */
export default class ClickHandler extends Component<IProps> {
  render() {
    return (
      <div 
        onMouseOver={this.props.onHoverIn}
        onMouseOut={this.props.onHoverOut}
      >
        <ClickNHold
          time={HOLD_MIN_DURATION_SECONDS}
          onClickNHold={this.props.onHoldClick}
          onEnd={this.handleClickEnd}
        >
          {this.props.children}
        </ClickNHold>
      </div>
    )
  }

  handleClickEnd = (e, wasLong) => {
    if (!wasLong && this.props.onClick) {
      this.props.onClick(e);
    } else if (this.props.onHoldRelease) {
      this.props.onHoldRelease(e);
    }
  }
}
