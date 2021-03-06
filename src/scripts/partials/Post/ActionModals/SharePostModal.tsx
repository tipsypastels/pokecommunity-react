import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import UserInterface from '../../../types/UserInterface';
import Icon from '../../Icon';
import SmartLink from '../../SmartLink';
import Pronoun from '../../Pronoun';

interface IProps {
  postid: number;
  user: UserInterface;
  show: boolean;
  closeModal: () => void;
}

export default function SharePostModal({ postid, user, show, closeModal }: IProps) {
  const [copied, setCopied] = useState(false);

  // TODO this doesn't actually exist, need it
  const link = `https://pokecommunity.com/posts/${postid}`;

  const copyText = copied
    ? 'Copied to clipboard!'
    : 'Copy Link';

  return (
    <Modal
      dialogClassName="SharePostModal modal-dialog-centered"
      show={show}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Share <Pronoun of={user} /> post
          </Modal.Title>
      </Modal.Header>

      <Modal.Body className="share-options-list">
        <CopyToClipboard
          text={link}
          onCopy={() => setCopied(true)}
        >
          <div className="share-option copy-link">
            <Icon name="link" fw />
            <span>
              {copyText}
            </span>
          </div>
        </CopyToClipboard>

        <SmartLink to={`/servicepanel.php?do=newbuzzentry&p=${postid}`} className="share-option promote-post">
          <Icon name="microphone" fw />
          <span>
            Promote Post
          </span>
        </SmartLink>

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
  );
}