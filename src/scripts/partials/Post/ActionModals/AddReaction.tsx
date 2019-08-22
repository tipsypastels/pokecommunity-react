import React, { Component } from 'react';
import { reactionOptions } from '../../../../configs/config.json';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { capitalize } from '../../../helpers/StringHelpers';

// auto compile all reactions in that list from their files
const REACTION_IMAGES: any = (function() {
  const list = {};

  for (let reaction of reactionOptions) {
    list[reaction] = require(`../../../../images/reactions/${reaction}.png`);
  }

  return list;
})();

export default class AddReaction extends Component {
  render() {
    return (
      <div className="AddReaction action-menu-context action-like">
        {Object.keys(REACTION_IMAGES).map(reaction => {
          const img = REACTION_IMAGES[reaction];

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
                <img
                  alt={`React with ${reaction}`}
                  className={`reaction ${reaction}`}
                  src={img}
                  onClick={this.add(reaction)}
                />
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
