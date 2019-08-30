import React from 'react';

import MinimalUserInterface from '../../types/MinimalUserInterface';

interface IProps extends MinimalUserInterface {
  selected: boolean;
  completedPartOfName: string;
  hover: () => void;
  enter: () => void;
}

const MentionableUser = (props: IProps) => {
  // we don't use completedPartOfName directly because it might not have the same case as the real name. so instead we slice based on its length
  const completedPartOfName = props.username
    .slice(0, props.completedPartOfName.length);

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
          {completedPartOfName}
        </strong>

        <span>
          {autocompletablePartOfName}
        </span>
      </span>
    </div>
  );
}

export default MentionableUser;