import React, { Component, ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

import PostUserInterface from '../../types/PostUserInterface';

import Usergroup from './Usergroup';
import vBRoute from '../../bridge/vBRoute';
import Action from '../Action';

import '../../../styles/modules/User/UserModal.scss';

interface IProps {
  user: PostUserInterface;
  show: boolean;
  forumid: number;
  closeModal: () => void;
}

export default class UserModal extends Component<IProps> {
  render() {
    const { user } = this.props;

    return (
      <Modal
        dialogClassName="UserModal modal-dialog-centered"
        show={this.props.show}
        onHide={this.props.closeModal}
      >
        <a href={vBRoute('profile', this.props.user.id)}>
          {this.getUserBanner()}
          {this.getAvatar()}
        </a>

        <Modal.Header>
          <Modal.Title>
            <a
              href={vBRoute('profile', this.props.user.id)}
            >
              {user.username}
            </a>
          </Modal.Title>
          {this.getUsergroups()}
          {this.getQuickSelfIntro()}
        </Modal.Header>

        {this.getDisplayFields()}

        <Modal.Footer>
          {this.getControls()}
        </Modal.Footer>
      </Modal>
    )
  }

  getUsergroups() {
    const { usergroups } = this.props.user;
    if (!usergroups) {
      return null;
    }

    const usergroupComponents = usergroups.map(usergroup => (
      <Usergroup
        key={usergroup.id}
        title={usergroup.singularTitle}
        color={usergroup.color}
      />
    ));

    return (
      <div className="usergroups">
        {usergroupComponents}
      </div>
    );
  }

  getQuickSelfIntro() {
    return (
      <div className="user-quick-self-intro">
        {this.props.user.profileFields.quickSelfIntro}
      </div>
    );
  }

  getControls() {
    return (
      <div className="user-controls">
        <Action
          name="View Profile"
          icon={{ name: 'id-card', group: 'fal' }}
          href={vBRoute('profile', this.props.user.id)}
          className="d-none d-md-inline"
        />
        <Action
          name="Send Message"
          icon={{ name: 'comments', group: 'fal' }}
          href={vBRoute('sendPm', this.props.user.id)}
        />
        <Action
          name="See Posts"
          icon={{ name: 'list', group: 'fal' }}
          href={vBRoute('searchUserPosts', this.props.user.id)}
        />
      </div>
    )
  }

  getDisplayFields() {
    const { user } = this.props;
    const fields = {};

    if (user.oldUsernames.length > 0) {
      fields['Formerly'] = user
        .oldUsernames[user.oldUsernames.length - 1]
        .username;
    }

    if (user.profileFields.discordName) {
      fields['Discord'] = user.profileFields.discordName;
    }

    if (user.profileFields.inGameName) {
      fields['In-Game Name'] = user.profileFields.inGameName;
    }

    if (user.friendCode) {
      fields['Friend Code'] = user.friendCode;
    }

    if (Object.keys(fields).length === 0) {
      return null;
    }

    return (
      <Modal.Body className="user-fields">
        {Object.keys(fields).map(fieldName => (
          <div className="field">
            <div className="field-title">
              {fieldName}
            </div>

            {fields[fieldName]}
          </div>
        ))}
      </Modal.Body>
    );
  }

  getUserBanner() {
    return (
      <div
        className="user-banner"
        style={{ backgroundImage: 'url(https://i.imgur.com/W3JtH80.jpg)' }}
      />
    );
  }

  getAvatar() {
    const { avatar } = this.props.user;
    if (!avatar) {
      return null;
    }

    return (
      <img 
        className="avatar" 
        src={avatar}
        alt={`${this.props.user.username}'s Avatar`} 
      />
    );
  }
}
