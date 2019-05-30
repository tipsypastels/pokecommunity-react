import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import UserInterface from '../../types/UserInterface';

import Usergroup from './Usergroup';

interface IProps {
  user: UserInterface;
  show: boolean;
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
        <Modal.Header closeButton>
          <Modal.Title>
            {user.username}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.getUsergroups()}
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
}
