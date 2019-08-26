import React, { CSSProperties } from 'react';

import Icon, { ICON_GROUP } from '../Icon';

import MiniBiographyInterface from '../../types/MiniBiographyInterface';

import { lastActionHistory, yearsSince } from '../../helpers/DateHelpers';

const genderToIcon = (gender: string) => {
  return gender === 'other' ? 'genderless' : gender;
}

const onlineToIcon = (lastOnline) => {
  const group: ICON_GROUP = lastOnline === 'Online now'
    ? 'far'
    : 'fas';

  return { name: 'circle', group };
};

interface IProps extends MiniBiographyInterface {
  style?: CSSProperties; // post flair
}

const PostMiniBiography = (props: IProps) => {
  let birthday    = null;
  let gender      = null; 
  let location    = null;
  let lastOnline  = null; 
  let lastPosted  = null;;

  if (props.birthday) {
    birthday = (
      <div>
        <Icon fw name="calendar-alt" mr={1} />
        Age {yearsSince(props.birthday)}
      </div>
    );
  }

  if (props.gender) {
    gender = (
      <div>
        <Icon fw name={genderToIcon(props.gender)} mr={1} />
        {props.gender}
      </div>
    );
  }

  if (props.location) {
    location = (
      <div>
        <Icon fw name="globe" mr={1} />
        {props.location}
      </div>
    );
  }

  if (props.lastOnline) {
    lastOnline = (
      <div>
        <Icon fw {...onlineToIcon(props.lastOnline)} mr={1} />
        {lastActionHistory('Seen', props.lastOnline)}
      </div>
    );
  }

  if (props.lastPosted) {
    lastPosted = (
      <div>
        <Icon fw name="comment-lines" mr={1} />
        {lastActionHistory('Posted', props.lastPosted)}
      </div>
    );
  }

  return (
    <div className="minibio" style={props.style}>
      {birthday}
      {gender}
      {location}
      {lastOnline}
      {lastPosted}  
    </div>
  );
};

export default PostMiniBiography;