import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { When } from 'react-if';

import Icon from '../Icon';
import Action from '../Action';
import { PostActionModal } from '../Post';

import '../../../styles/modules/Post/PostFooter.scss';

interface IProps {
  canEdit: boolean;
  canSharePosts: boolean;
  canReply: boolean;
  canReactToPosts: boolean;
  
  overflowActive: boolean;
  setOverflow: (boolean) => void;

  actionModalOpen: PostActionModal;
  setActionModalOpen: (PostActionModal) => void;
}

class PostFooter extends Component<IProps> {
  render() {
    const { 
      canEdit, 
      canSharePosts, 
      canReply, 
      canReactToPosts,
      actionModalOpen,
      setActionModalOpen,
    } = this.props;

    return (
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
              className="d-none d-md-block"
              icon={{ name: 'share-square', group: 'fal' }}
              active={actionModalOpen === 'share'}
              activate={() => setActionModalOpen('share')}
              deactivate={() => setActionModalOpen(null)}
            />
          </When>
        </ButtonToolbar>
        <ButtonToolbar className="post-right-actions">
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

            <Action
              name="More"
              icon={{ name: 'ellipsis-h', group: 'fal' }}
              active={this.props.overflowActive}
              activate={() => this.props.setOverflow(true)}
              deactivate={() => this.props.setOverflow(false)}
            />
          </When>
        </ButtonToolbar>
      </div>

    )
  }
}

export default PostFooter;