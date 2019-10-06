import React, { ReactNode } from 'react';
import MinimalUserInterface from '../../types/MinimalUserInterface';

interface IProps extends MinimalUserInterface { 
  children?: ReactNode;
  className?: string;
}

export default function MinimalUser(props: IProps) {
  return (
    <div
      className={`MinimalUser ${props.className}`} 
    >
      <a
        className="avatar-url" 
        href={`/member.php?u=${props.id}`}>
        <img
          className="avatar"
          src={props.avatar}
          alt={`${props.username}'s Avatar`}
        />
      </a>

      <a className="username" href={`/member.php?u=${props.id}`}>
        {props.username}
      </a>

      <div className="flex-grows" />

      {props.children}
    </div>
  );
}
