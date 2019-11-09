import React from 'react'
import SmartLink from '../SmartLink';
import MinimalUserInterface from '../../types/MinimalUserInterface';
import SideBySide from '../../designs/layout/SideBySide';
import Avatar from '../../designs/Avatar';
import Spacing from '../../designs/layout/Spacing';

interface IProps {
  user: MinimalUserInterface;
}

export default function PreviewUser({ user }: IProps) {
  return (
    <Spacing margin={{ bottom: 'small' }}>
      <SideBySide>
        <Avatar for={user} size="xsmall" />

        <strong>
          {user.username}
        </strong>
      </SideBySide>
    </Spacing>
  );
}
