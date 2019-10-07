import React, { Component } from 'react';
import { ButtonToolbar, Dropdown } from 'react-bootstrap';
import { When } from 'react-if';

import Action from '../Action';
import { PostActionModal } from '../Post';

import AppContext from '../../AppContext';
import UserInterface from '../../types/UserInterface';
import { idObjectsEqual } from '../../helpers/DatabaseHelpers';
import Icon from '../Icon';
import SmartLink from '../SmartLink';
import { MinimalReactionCollectionInterface } from '../../types/ReactionInterface';
import ReactionActionsContainer from './ReactionActionsContainer';

interface IProps {
  id: number;
  user: UserInterface;

  canEdit: boolean;
  canSharePosts: boolean;
  canReply: boolean;
  canReactToPosts: boolean;
  
  actionModalOpen: PostActionModal;
  setActionModalOpen: (open: PostActionModal) => void;

  selectPost: (postid: number) => void;
  deselectPost: (postid: number) => void;
  checkPostSelected: (postid: number) => boolean;

  openEditorToCurrentPost: () => void;

  reactions: MinimalReactionCollectionInterface;
  reactionsOpen: boolean;
  setReactionsOpen: (open: boolean) => void;
}

class PostFooter extends Component<IProps> {
  static contextType = AppContext;
  private ref: React.RefObject<HTMLDivElement> = React.createRef< HTMLDivElement>();
  
  render() {
    const { 
      id,
      user,
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
      reactions,
      reactionsOpen,
      setReactionsOpen,
    } = this.props;

    const [{ currentUser }] = this.context;

    return (
      <div className="PostFooter flex" ref={this.ref}>
        <ButtonToolbar className="post-left-actions flex-grows">
          {canReactToPosts && (
            <ReactionActionsContainer
              reactions={reactions}
              reactionsOpen={reactionsOpen}
              setReactionsOpen={setReactionsOpen}
              overlayRef={this.ref}
              openReactionsModal={() => setActionModalOpen('reactions')}
            />
          )}
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
          <When condition={true || !!currentUser}>
            <Dropdown alignRight>
              <Dropdown.Toggle 
                id="post-overflow-dropdown"
                as={({ onClick, children }) => (
                  <span onClick={onClick}>
                    {children}
                  </span>
                )} 
              >
                <Action
                  name="More"
                  icon={{ name: 'ellipsis-h', group: 'fal' }}
                  textClassName="d-none d-md-inline"
                />
              </Dropdown.Toggle>
              
              <Dropdown.Menu>
                {!idObjectsEqual(currentUser, user) && (
                  <Dropdown.Item 
                    {...SmartLink.shim(`/settings.php?do=addlist&userlist=ignore&u=${user.id}`)}
                  >
                    <Icon name="user-minus" fw mr={1} />
                    Ignore {user.username}
                  </Dropdown.Item>
                )}

                {canSharePosts && (
                  <Dropdown.Item
                    className="d-block d-md-none"
                    onClick={() => setActionModalOpen('share')}
                  >
                    <Icon name="share-square" fw mr={1} />
                    Share Post
                  </Dropdown.Item>
                )}

                <Dropdown.Item
                  {...SmartLink.shim(`/report.php?p=${this.props.id}`)}
                >
                  <Icon name="exclamation-triangle" fw mr={1} />
                  Report Post
                </Dropdown.Item>

                {canEdit && (
                  <Dropdown.Item
                    {...SmartLink.shim(`/postings.php?do=deletepost&p=${this.props.id}`)}
                  >
                    <Icon name="trash-alt" fw mr={1} />
                    Delete Post
                  </Dropdown.Item>
                )}

                {true /* TODO */ && (
                  <Dropdown.Item onClick={() => setActionModalOpen('reactions')}>
                    <Icon name="hammer-war" fw mr={1} />
                    Moderate Reactions
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </When>
        </ButtonToolbar>
      </div>
    );
  }
}

export default PostFooter;