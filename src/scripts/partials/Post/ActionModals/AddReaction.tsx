import React, { Component } from 'react';
import { reactionOptions } from '../../../../configs/config.json';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { capitalize } from '../../../helpers/StringHelpers';

export default class AddReaction extends Component {
  render() {
    return (
      <div className="AddReaction action-menu-context action-like">
        {reactionOptions.map(reaction => {
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
      </div>
    );
  }

  add = (reaction) => {
    return () => {
      // TODO do the ajax request
    }
  }
}
