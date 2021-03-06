import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';

import PostMiniBiography from './PostMiniBiography';
import Stat from '../Stat';
import UserModal from '../User/UserModal';

import PostUserInterface from '../../types/PostUserInterface';

import SmartLink from '../SmartLink';

import { yearsSince, userIsNew } from '../../helpers/DateHelpers';
import Parser from '../../parser/Parser';

interface IProps {
  user: PostUserInterface;
  forumid: number;
}

interface IState {
  userModalOpen: boolean;
}

export default class PostHeader extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      userModalOpen: false,
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div className="PostHeader" style={user.textFields.flair.userinfo}>
        {this.getUserModal()}
        {this.getAvatar()}
        {this.getUsernameAndUsertitle()}
        {this.getNewUserBadge()}
        {this.getStatistics()}
        {this.getMinibio()}
      </div>
    )
  }

  getUserModal() {
    return (
      <UserModal
        user={this.props.user}
        show={this.state.userModalOpen}
        closeModal={this.closeUserModal}
        forumid={this.props.forumid}
      />
    )
  }

  getAvatar() {
    const { user } = this.props;
    if (!user.avatar) {
      return null;
    }

    return (
      <div className="avatar-container">
        <SmartLink to={`/member.php?u=${user.id}`} onClick={this.openUserModal}>
          <img
            src={user.avatar}
            alt={`${user.username}'s Avatar`}
            className="avatar"
            style={user.textFields.flair.avatar}
          />
        </SmartLink>
      </div>
    );
  }

  getUsernameAndUsertitle() {
    const { user } = this.props;

    let usertitle = null;
    if (user.usertitle) {
      usertitle = (
        <Parser 
          bbcode={user.usertitle} 
          className="usertitle" 
        />
      );
    }

    return (
      <div className="username-usertitle">
        <h1 style={user.textFields.flair.username}>
          <SmartLink to={`/member.php?u=${user.id}`} onClick={this.openUserModal}>
            {user.username}
          </SmartLink>
        </h1>

        {usertitle}

      </div>
    )
  }

  getNewUserBadge() {
    if (!userIsNew(this.props.user)) {
      return;
    }

    return (
      <Badge
        variant="secondary"
        title="Be sure to say hello :]"
        className="newmember"
      >
        New Member!
      </Badge>
    )
  }

  getStatistics() {
    const { user } = this.props;

    return (
      <div className="statistics" style={user.textFields.flair.statistics}>
        <Stat name="posts" number={user.postCount} />
        <Stat name="years" number={yearsSince(user.created)} />
      </div>
    );
  }

  getMinibio() {
    const { user } = this.props;

    return (
      <PostMiniBiography
        birthday={user.birthday}
        gender={user.profileFields.gender}
        location={user.profileFields.location}
        lastOnline={user.lastOnline}
        lastPosted={user.lastPosted}
        style={user.textFields.flair.minibio}
      />
    );
  }

  openUserModal = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({ userModalOpen: true });
  }

  closeUserModal = () => {
    this.setState({ userModalOpen: false });
  }
}