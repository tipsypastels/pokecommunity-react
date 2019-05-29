import React from 'react';
import { Badge } from 'react-bootstrap';
import { When } from 'react-if';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';

import PostMiniBiography from './PostMiniBiography';
import Stat from '../Stat';

import PostUserInterface from '../../types/PostUserInterface';

import vBRoute from '../../bridge/vBRoute';

import '../../../styles/modules/Post/PostHeader.scss';

interface IProps {
  user: PostUserInterface;
}

function getYearCount(userCreated: number) {
  return (new Date()).getFullYear() 
    - (new Date(userCreated * 1000)).getFullYear();
} 

const PostHeader = ({ user }: IProps) => (
  <div className="PostHeader" style={user.textFields.flair.userinfo}>
    <When condition={typeof user.avatar !== 'undefined'}>
      <div className="avatar-container">
        <a href={vBRoute('profile', user.id)}>
          <img
            src={user.avatar} 
            alt={`${user.username}'s Avatar`}
            className="avatar"
            style={user.textFields.flair.avatar}
          />
        </a>
      </div>
    </When>

    <div className="username-usertitle">
      <h1 style={user.textFields.flair.username}>
        <a href={vBRoute('profile', user.id)}>
          {user.username}
        </a>
      </h1>

      {(() => {
        if (typeof user.usertitle !== 'undefined') {
          return (
            <h2 dangerouslySetInnerHTML={{ __html: user.usertitle }} />
          )
        }
      })()}
    
    </div>

    <When condition={false}>
      <Badge 
        variant="secondary" 
        title="Be sure to say hello :]" 
        className="newmember"
      >
        New Member!
        <FontAwesomeIcon className="fa-fw" icon={faHeart} />
      </Badge>
    </When>

    <div className="statistics" style={user.textFields.flair.statistics}>
      <Stat name="posts" number={user.postCount} />
      <Stat name="years" number={getYearCount(user.created)} />
    </div>

    <PostMiniBiography
      birthday={user.birthday}
      gender={user.profileFields.gender}
      location={user.profileFields.location}
      lastOnline={user.lastOnline}
      lastPosted={user.lastPosted}
      style={user.textFields.flair.minibio}
    />
  </div>
);

export default PostHeader;