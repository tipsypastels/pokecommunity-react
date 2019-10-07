import React from 'react';
import { reactionOptions } from '../../../../configs/config.json';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { capitalize } from '../../../helpers/StringHelpers';

interface IProps {
  showReset?: boolean;
}

// TODO actually submitting
export default function AddReaction({ showReset }: IProps) {
  return (
    <div className="AddReaction action-menu-context action-like">
      {Object.keys(reactionOptions).map(reaction => {
        return (
          <OverlayTrigger
            key={reaction}
            placement="top"
            overlay={
              <Tooltip id={`reaction-tooltip-${reaction}`}>
                {capitalize(reaction)}
              </Tooltip>
            }
          >
            <div className="reaction-wrapper">
              <div className={`reaction reaction-${reaction}`} />
            </div>
          </OverlayTrigger>
        );
      })}

      {showReset && (
        <OverlayTrigger 
          key="reset"
          placement="top"
          overlay={
            <Tooltip id={`reaction-tooltip-reset`}>
              Remove your reaction
            </Tooltip>
          }
        >
          <div className="reaction-wrapper">
            <div className="reaction reaction-reset" />
          </div>
        </OverlayTrigger>
      )}
    </div>
  );
}