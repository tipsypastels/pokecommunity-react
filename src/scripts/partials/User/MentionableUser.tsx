import React from 'react';

import MinimalUserInterface from '../../types/MinimalUserInterface';

import '../../../styles/modules/User/MentionableUser.scss';

interface IProps extends MinimalUserInterface {
  selected: boolean;
  completedPartOfName: string;
  hover: () => void;
  enter: () => void;
}

const MentionableUser = (props: IProps) => {
  const autocompletablePartOfName = props.username
    .slice(props.completedPartOfName.length);

  return (
    <div 
      className={`MentionableUser ${props.selected && 'selected'}`}
      onMouseOver={props.hover}
      onClick={props.enter}
    >
      <img 
        className="avatar" 
        src={props.avatar}
        alt={`${props.username}'s Avatar`}
      />
      
      <span className="username">
        <strong>
          {props.completedPartOfName}
        </strong>

        <span>
          {autocompletablePartOfName}
        </span>
      </span>
    </div>
  );
}

export default MentionableUser;