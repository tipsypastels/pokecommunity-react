import React from 'react';

import MinimalUserInterface from '../../types/MinimalUserInterface';

import '../../../styles/modules/User/MentionableUser.scss';

interface IProps extends MinimalUserInterface {
  selected: boolean;
}

const MentionableUser = (props: IProps) => (
  <div className={`MentionableUser ${props.selected && 'selected'}`}>
    <img 
      className="avatar" 
      src={props.avatar}
      alt={`${props.username}'s Avatar`}
    />
    <span className="username">
      {props.username}
    </span>
  </div>
);

export default MentionableUser;