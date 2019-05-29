import React from 'react';
import { Badge } from 'react-bootstrap';
import { When } from 'react-if';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';

import PostMiniBiography from './PostMiniBiography';
import Stat from '../Stat';

import MiniBiographyInterface from '../../types/MiniBiographyInterface';
import PostFlairInterface from '../../types/PostFlairInterface';

import vBRoute from '../../bridge/vBRoute';

import '../../../styles/modules/Post/PostHeader.scss';

interface IProps {
  userid: number;
  username: string;
  avatarURL?: string;
  usertitleHTML?: string;
  postCount: number;
  yearCount: number;
  miniBiography: MiniBiographyInterface;
  postFlair: PostFlairInterface;
  isNewMember?: boolean;
}

const PostHeader = (props: IProps) => (
  <div className="PostHeader" style={props.postFlair.main}>
    <When condition={typeof props.avatarURL !== 'undefined'}>
      <div className="avatar-container">
        <a href={vBRoute('profile', props.userid)}>
          <img
            src={props.avatarURL} 
            alt={`${props.username}'s Avatar`}
            className="avatar"
            style={props.postFlair.avatar}
          />
        </a>
      </div>
    </When>

    <div className="username-usertitle">
      <h1 style={props.postFlair.username}>
        <a href={vBRoute('profile', props.userid)}>
          {props.username}
        </a>
      </h1>

      {(() => {
        if (typeof props.usertitleHTML !== 'undefined') {
          return (
            <h2 dangerouslySetInnerHTML={{ __html: props.usertitleHTML }} />
          )
        }
      })()}
    
    </div>

    <When condition={
      typeof props.isNewMember !== 'undefined' && props.isNewMember
    }>
      <Badge 
        variant="secondary" 
        title="Be sure to say hello :]" 
        className="newmember"
      >
        New Member!
        <FontAwesomeIcon className="fa-fw" icon={faHeart} />
      </Badge>
    </When>

    <div className="statistics" style={props.postFlair.statistics}>
      <Stat name="posts" number={props.postCount} />
      <Stat name="years" number={props.yearCount} />
    </div>

    <PostMiniBiography 
      style={props.postFlair.miniBiography} 
      {...props.miniBiography} 
    />
  </div>
);

export default PostHeader;