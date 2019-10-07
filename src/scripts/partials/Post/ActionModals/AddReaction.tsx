import React from 'react';
import { reactionOptions } from '../../../../configs/config.json';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { capitalize } from '../../../helpers/StringHelpers';
import { Dropdown } from 'react-bootstrap';
import ClickableReaction from './ClickableReaction';

interface IProps {
  showReset?: boolean;
}

// TODO actually submitting
export default function AddReaction({ showReset }: IProps) {
  return (
    <Dropdown.Menu className="AddReaction action-menu-context action-like">
      {Object.keys(reactionOptions).map(reaction => (
        <ClickableReaction
          key={reaction}
          reaction={reaction}
        />
      ))}

      {showReset && (
        <ClickableReaction 
          reaction="reset" 
          tooltip="Remove your reaction"
          title="Remove"
        />
      )}
    </Dropdown.Menu>
  );
}