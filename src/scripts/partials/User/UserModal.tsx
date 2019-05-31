import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

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
          {this.getQuickSelfIntro()}
        </Modal.Header>

        <Modal.Body>
          {this.getDisplayFields()}

          <div className="flex flex-v-center">
            {this.getUsergroups()}

            <div className="flex-grows" />

            {this.getControls()}
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  getUsergroups() {
    const { usergroups } = this.props.user;
    if (!usergroups) {
      return null;
    }

    return usergroups.map(usergroup => (
      <Usergroup 
        key={usergroup.id}
        title={usergroup.singularTitle}
        color={usergroup.color}
      />
    ));
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
        <div 
          className="control"
          title={`Send Message to ${this.props.user.username}`} 
        >
          <FontAwesomeIcon icon={faComments} />
        </div>
        <div 
          className="control"
          title={`See Posts by ${this.props.user.username}`}
        >
          <FontAwesomeIcon icon={faList} />
        </div>
        <div 
          className="control"
          title={`Moderate ${this.props.user.username}`}
        >
          <FontAwesomeIcon icon={faHammerWar} />
        </div>
      </div>
    )
  }

  getDisplayFields() {
    return (
      <div className="user-fields">
        <div className="field">
          <strong>
            Previous Username
          </strong>
          
          HackDeoxys
        </div>

        <div className="field">
          <strong>
            Discord Nickname
          </strong>

         Nina#1337
        </div>

        <div className="field">
          <strong>
            In-Game Name
          </strong>

          Meme
        </div>

        <div className="field">
          <strong>
            Friend Code
          </strong>

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
