import React, { Component } from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faList, faHammerWar } from '@fortawesome/pro-light-svg-icons';

import PostUserInterface from '../../types/PostUserInterface';

import Usergroup from './Usergroup';

import vBRoute from '../../bridge/vBRoute';

import '../../../styles/modules/User/UserModal.scss';

//TODO mockup for allll of this

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

        <Modal.Body>
          {this.getDisplayFields()}
        </Modal.Body>

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
        <Button variant="outline-secondary">
          Send Message
        </Button>
        <Button variant="outline-secondary">
          See Posts
        </Button>
        <Button variant="link">
          <FontAwesomeIcon icon={faHammerWar} />
        </Button>
      </div>
    )
  }

  getDisplayFields() {
    return (
      <div className="user-fields">
        <div className="field">
          <div className="field-title">
            Formerly
          </div>

          HackDeoxys
        </div>

        <div className="field">
          <div className="field-title">
            Discord
          </div>

          Nina#1337
        </div>

        <div className="field">
          <div className="field-title">
            In-Game Name
          </div>

          Meme
        </div>

        <div className="field">
          <div className="field-title">
            Friend Code
          </div>

          1010-0101-0101
        </div>
      </div>
    );
  }

  getUserBanner() {
    return (
      <img
        className="user-banner"
        src='https://i.imgur.com/W3JtH80.jpg'
        alt={`${this.props.user.username}'s Banner`}
      />
    );
  }

  getAvatar() {
    const { avatar } = this.props.user;
    if (!avatar) {
      return null;
    }

    return (
      <img src={avatar} className="avatar" />
    );
  }
}
