import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { When } from 'react-if';

import Icon from '../Icon';
import Action from '../Action';

import '../../../styles/modules/Post/PostFooter.scss';

interface IProps {
  canEdit: boolean;
  canSharePosts: boolean;
  canReply: boolean;
  canReactToPosts: boolean;
}

const PostFooter = ({ canEdit, canSharePosts, canReply, canReactToPosts }: IProps) => (
  <div className="PostFooter flex">
    <ButtonToolbar className="post-left-actions flex-grows">
      <When condition={canReactToPosts}>
        <Action
          name="Like"
          icon={{ name: 'thumbs-up', group: 'fal' }}
          active={false /* TODO */}
          activate={() => {}}
          deactivate={() => {}}
        />
      </When>
      <When condition={canSharePosts}>
        <Action
          name="Share"
          icon={{ name: 'share-square', group: 'fal' }}
          active={false /* TODO */}
          activate={() => {}}
          deactivate={() => {}}
        />
      </When>
    </ButtonToolbar>
    <div className="post-right-actions">
      <When condition={canEdit}>
        <Action
          name="Edit"
          icon={{ name: 'edit', group: 'fal' }}
          active={false /* TODO */}
          activate={() => { }}
          deactivate={() => { }}
        />
      </When>
      <When condition={canReply}>
        <Action
          name="Respond"
          icon={{ name: 'comment-dots', group: 'fal' }}
          active={false /* TODO */}
          activate={() => { }}
          deactivate={() => { }}
        />
      </When>
    </div>
  </div>
);

export default PostFooter;