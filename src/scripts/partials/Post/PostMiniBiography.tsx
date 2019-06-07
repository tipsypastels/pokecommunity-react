import React, { CSSProperties } from 'react';

import Icon, { ICON_GROUP } from '../Icon';

import MiniBiographyInterface from '../../types/MiniBiographyInterface';

import { lastActionHistory, yearsSince } from '../../helpers/DateHelpers';

const genderToIcon = (gender: string) => {
  gender = gender.toLowerCase();
  return gender === 'Other' ? 'genderless' : gender;
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
        <Icon name="calendar-alt" />
        Age {yearsSince(props.birthday)}
      </div>
    );
  }

  if (props.gender) {
    gender = (
      <div>
        <Icon name={genderToIcon(props.gender)} />
        {props.gender}
      </div>
    );
  }

  if (props.location) {
    location = (
      <div>
        <Icon name="globe" />
        {props.location}
      </div>
    );
  }

  if (props.lastOnline) {
    lastOnline = (
      <div>
        <Icon {...onlineToIcon(props.lastOnline)} />
        {lastActionHistory('Seen', props.lastOnline)}
      </div>
    );
  }

  if (props.lastPosted) {
    lastPosted = (
      <div>
        <Icon name="comment-lines" />
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