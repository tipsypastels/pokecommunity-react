/** @jsx jsx */
import { jsx } from '@emotion/core';
import MinimalUserInterface from '../types/MinimalUserInterface'
import Avatar, { AvatarSize, AVATAR_SIZES } from './Avatar'
import { partitionThenMap } from '../helpers/ArrayHelpers';
import { Fragment } from 'react';
import SideBySide from './layout/SideBySide';

interface IProps {
  for: MinimalUserInterface[];
  maxCount: number;
  link?: boolean;
  layout: 'row' | 'grid';
  size?: AvatarSize;
  appearance?: 'circle' | 'square';
  onClick?: (e: React.FormEvent) => void;
}

export default function AvatarGroup(props: IProps) {
  const displayedAvatars: (MinimalUserInterface | number)[] 
    = props.for.slice(0, props.maxCount);

  if (displayedAvatars.length < props.for.length) {
    displayedAvatars.push(props.for.length - displayedAvatars.length);
  }

  function avatarRow(users: (MinimalUserInterface | number)[]) {
    return users.map(user => {
      if (typeof user === 'number') { // +7 marker
        return (
          <div css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#DFE1E6',
            color: '#777',
            width: AVATAR_SIZES[props.size],
            height: AVATAR_SIZES[props.size],
            fontWeight: 'bold',
            borderRadius: props.appearance === 'circle'
              ? '50%'
              : 'unset',
          }}>
            +{user}
          </div>
        );
      }

      return (
        <Avatar
          key={user.id}
          for={user}
          size={props.size}
          appearance={props.appearance}
          link={props.link}
          onClick={props.onClick}
        />
      );
    });
  }

  switch(props.layout) {
    case 'row': {
      return (
        <SideBySide>
          {avatarRow(displayedAvatars)}
        </SideBySide>
      );
    }

    case 'grid': {
      return (
        <Fragment>
          {partitionThenMap(displayedAvatars, 5, (users, i) => (
            <SideBySide key={i}>
              {avatarRow(users)}
            </SideBySide>
          ))}
        </Fragment>
      )
    };
  }
}

AvatarGroup.defaultProps = {
  size: 'smallish',
  appearance: 'circle',
};