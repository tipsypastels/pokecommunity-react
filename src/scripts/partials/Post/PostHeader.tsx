import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import { When } from 'react-if';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';

import PostMiniBiography from './PostMiniBiography';
import Stat from '../Stat';

import PostUserInterface from '../../types/PostUserInterface';

import vBRoute from '../../bridge/vBRoute';

import { yearsSince } from '../../helpers/DateHelpers';

import '../../../styles/modules/Post/PostHeader.scss';
import UserModal from '../User/UserModal';

interface IProps {
  user: PostUserInterface;
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
        <a onClick={this.openUserModal} href={vBRoute('profile', user.id)}>
          <img
            src={user.avatar}
            alt={`${user.username}'s Avatar`}
            className="avatar"
            style={user.textFields.flair.avatar}
          />
        </a>
      </div>
    );
  }

  getUsernameAndUsertitle() {
    const { user } = this.props;

    let usertitle = null;
    if (user.usertitle) {
      usertitle = (
        <h2 dangerouslySetInnerHTML={{ __html: user.usertitle }} />
      );
    }

    return (
      <div className="username-usertitle">
        <h1 style={user.textFields.flair.username}>
          <a onClick={this.openUserModal} href={vBRoute('profile', user.id)}>
            {user.username}
          </a>
        </h1>

        {usertitle}

      </div>
    )
  }

  getNewUserBadge() {
    return null; // TODO

    // return (
    //   <Badge
    //     variant="secondary"
    //     title="Be sure to say hello :]"
    //     className="newmember"
    //   >
    //     New Member!
    //     <FontAwesomeIcon className="fa-fw" icon={faHeart} />
    //   </Badge>
    // )
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