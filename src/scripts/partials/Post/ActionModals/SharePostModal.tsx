import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import AppContext from '../../../AppContext';
import UserInterface from '../../../types/UserInterface';
import Icon from '../../Icon';
import vBRoute from '../../../bridge/vBRoute';

import '../../../../styles/modules/Post/ActionModals/SharePostModal.scss';

interface IProps {
  postid: number;
  user: UserInterface;
  show: boolean;
  closeModal: () => void;
}

interface IState {
  copied: boolean;
}

export default class SharePostModal extends Component<IProps, IState> {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  render() {
    const { postid, show, closeModal } = this.props;

    // TODO this doesn't actually exist, need it
    const link = `https://pokecommunity.com/posts/${postid}`;

    return (
      <Modal 
        dialogClassName="SharePostModal modal-dialog-centered"
        show={show}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.getTitle()}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="share-options-list">
          <CopyToClipboard
            text={link}
            onCopy={() => this.setState({ copied: true })}
          >
            <div className="share-option copy-link">
              <Icon name="link" fw />
              <span>
                {this.getCopyText()}
              </span>
            </div>
          </CopyToClipboard>

          <a href={vBRoute('promotepost', postid)} className="share-option promote-post">
            <Icon name="microphone" fw />
            <span>
              Promote Post
            </span>
          </a>

          {/* These two should always be a href, as external links */}
          <a 
            className="share-option to-twitter"
            href={`https://twitter.com/home?status=${link}`} 
          >
            <Icon name="twitter" group="fab" fw />
            <span>
              Post to Twitter
            </span>
          </a>

          <a
            className="share-option to-facebook"
            href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
          >
            <Icon name="facebook" group="fab" fw />
            <span>
              Post to Facebook
            </span>
          </a>
        </Modal.Body>
      </Modal>
    )
  }

  getTitle() {
    const { user } = this.props;
    const { currentUser } = this.context;
    if (currentUser && currentUser.id === user.id) {
      return 'Share your post';
    }

    return `Share ${user.username}'s post`;
  }

  getCopyText() {
    return this.state.copied
      ? 'Copied to clipboard!'
      : 'Copy Link';
  }
}