import React from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { capitalize } from '../../../helpers/StringHelpers';

interface IProps {
  reaction: string;
  title?: string;
  tooltip?: string;
}

export default function ClickableReaction(props: IProps) {
  const tooltip = props.tooltip || capitalize(props.reaction);
  const title = props.title || capitalize(props.reaction);

  return (
    <Dropdown.Item className="ClickableReaction">
      <OverlayTrigger
        key={props.reaction}
        placement="top"
        overlay={
          <Tooltip id={`reaction-tooltip-${props.reaction}`}>
            {tooltip}
          </Tooltip>
        }
      >
        <div className="reaction-wrapper">
          <div className={`reaction reaction-${props.reaction}`} />

          <div className="reaction-text">
            {title}
          </div>
        </div>
      </OverlayTrigger>
    </Dropdown.Item>
  )
}
