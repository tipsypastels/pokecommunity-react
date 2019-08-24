import React from 'react'
import SmartLink from '../SmartLink';
import MinimalUserInterface from '../../types/MinimalUserInterface';

interface IProps {
  user: MinimalUserInterface;
}

export default function PreviewUser({ user }: IProps) {
  return (
    <SmartLink to={`/member.php?u=${user.id}`} className="PreviewUser">
      <div className="avatar-area">
        <img src={user.avatar} alt={`${user.username}'s Avatar`}/>
      </div>

      <div className="username">
        {user.username}
      </div>
    </SmartLink>
  )
}
