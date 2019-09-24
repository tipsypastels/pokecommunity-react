import React, { Component } from 'react';
import { ButtonToolbar, Overlay, Popover } from 'react-bootstrap';
import { When } from 'react-if';

import Action from '../Action';
import { PostActionModal } from '../Post';

import AppContext from '../../AppContext';
import AddReaction from './ActionModals/AddReaction';
import { reactionOptions } from '../../../configs/config.json';

interface IProps {
  id: number;

  canEdit: boolean;
  canSharePosts: boolean;
  canReply: boolean;
  canReactToPosts: boolean;
  
  overflowActive: boolean;
  setOverflow: (overflow: boolean) => void;

  actionModalOpen: PostActionModal;
  setActionModalOpen: (open: PostActionModal) => void;

  selectPost: (postid: number) => void;
  deselectPost: (postid: number) => void;
  checkPostSelected: (postid: number) => boolean;

  openEditorToCurrentPost: () => void;

  reactionsOpen: boolean;
  setReactionsOpen: (open: boolean) => void;
}

class PostFooter extends Component<IProps> {
  static contextType = AppContext;
  private ref: React.RefObject<HTMLDivElement> = React.createRef< HTMLDivElement>();
  
  render() {
    const { 
      id,
      canEdit, 
      canSharePosts, 
      canReply, 
      canReactToPosts,
      actionModalOpen,
      setActionModalOpen,
      selectPost,
      deselectPost,
      checkPostSelected,
      openEditorToCurrentPost,
      reactionsOpen,
      setReactionsOpen,
    } = this.props;

    return (
      <div className="PostFooter flex" ref={this.ref}>
        <ButtonToolbar className="post-left-actions flex-grows">
          <When condition={canReactToPosts}>
            <Action
              internalName="like"
              name="Like"
              icon={{ name: 'thumbs-up', group: 'fal' }}
              active={false /* TODO */}
              activate={() => {}}
              deactivate={() => {}}
              // TODO this doesn't account for if they've already reacted
              contextActive={reactionsOpen}
              openContext={() => setReactionsOpen(true)}
              closeContext={() => setReactionsOpen(false)}
            />

            <Overlay
              show={reactionsOpen} 
              onHide={() => setReactionsOpen(false)} 
              placement="bottom-start" 
              container={this.ref.current}
              target={this.ref.current}
            >
              <Popover 
                id="reactions-popover" 
                className="ReactionsPopover"
                data-reactions-count={reactionOptions.length}
              >
                <AddReaction />
              </Popover>
            </Overlay>
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
              active={false}
              activate={openEditorToCurrentPost}
            />
          </When>
          <When condition={canReply}>
            <Action
              name="Select"
              activeName="Selected"
              icon={{ name: 'comment-dots', group: 'fal' }}
              active={checkPostSelected(id)}
              activate={() => selectPost(id)}
              deactivate={() => deselectPost(id)}
            />
          </When>
          <When condition={!!this.context[0].currentUser}>
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