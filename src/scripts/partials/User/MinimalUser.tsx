import React, { ReactNode } from 'react';
import MinimalUserInterface from '../../types/MinimalUserInterface';

interface IProps extends MinimalUserInterface { 
  children?: ReactNode;
  className?: string;
  wrapChildren?: boolean;
  childrenIf?: any;
}

export default function MinimalUser(props: IProps) {
  const username = (
    <a className="username" href={`/member.php?u=${props.id}`}>
      {props.username}
    </a>
  );

  let { children } = props;
  if (('childrenIf' in props) && !props.childrenIf) {
    children = null;
  }

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

      {props.wrapChildren ? (
        <div>
          {username}
          <div>
            {children}
          </div>
        </div>
      ) : (
        <React.Fragment>
          {username}
          <div className="flex-grows" />
          {children}
        </React.Fragment>
      )}
    </div>
  );
}
