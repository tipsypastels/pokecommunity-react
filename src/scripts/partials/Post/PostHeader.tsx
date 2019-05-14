import React from 'react';
import { When } from 'react-if';

import PostMiniBiography from './PostMiniBiography';
import Stat from '../Stat';

import MiniBiographyInterface from '../../types/MiniBiographyInterface';

import '../../../styles/modules/Post/PostHeader.scss';

interface IProps {
  username: string;
  avatarURL?: string;
  usertitleHTML?: string;
  postCount: number;
  yearCount: number;
  miniBiography: MiniBiographyInterface;
}

const PostHeader = (props: IProps) => (
  <div className="PostHeader">
    <When condition={typeof props.avatarURL !== 'undefined'}>
      <div className="avatar-container">
        <img
          src={props.avatarURL} 
          alt={`${props.username}'s Avatar`}
          className="avatar"
        />
      </div>
    </When>

    <div className="username-usertitle">
      <h1>
        {props.username}
      </h1>

      {(() => {
        if (typeof props.usertitleHTML !== 'undefined') {
          return (
            <h2 dangerouslySetInnerHTML={{ __html: props.usertitleHTML }} />
          )
        }
      })()}
    
    </div>

    <div className="statistics">
      <Stat name="posts" number={props.postCount} />
      <Stat name="years" number={props.yearCount} />
    </div>

    <PostMiniBiography {...props.miniBiography} />
  </div>
);

export default PostHeader;