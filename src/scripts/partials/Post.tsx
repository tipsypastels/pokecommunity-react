import React, { Component } from 'react'
import Block from './Block';

import PostHeader from './Post/PostHeader';
import PostContent from './Post/PostContent';
import PostFooter from './Post/PostFooter';
import Signature from './User/Signature';
import StaffPost from './Post/StaffPost';

import ThreadInterface from '../types/ThreadInterface';
import PostInterface from '../types/PostInterface';
import SharePostModal from './Post/ActionModals/SharePostModal';

import AppContext from '../AppContext';
import PostLayout, { DEFAULT_POST_LAYOUT } from '../types/PostLayout';
import ReactionsModal from './Post/ActionModals/ReactionsModal';
import PostVisibilityNotice from './Post/PostVisibilityNotice';
import { idObjectsEqual } from '../helpers/DatabaseHelpers';

export interface PostProps extends PostInterface {
  thread: ThreadInterface;
  index: number;
  
  selectPost: (postid: number) => void;
  deselectPost: (postid: number) => void;
  checkPostSelected: (postid: number) => boolean;
  openEditor: (post: PostInterface) => void;
  setPost: (index: number, post: PostInterface) => void;
}

export type PostActionModal = 'share' | 'reactions';

interface IState {
  actionModalOpen: PostActionModal;
}

class Post extends Component<PostProps, IState> {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      actionModalOpen: null,
    };
  }

  render() {
    const {
      id,
      user,
      content,
      created,
      thread,
      canEdit,
      index,
      selectPost,
      deselectPost,
      checkPostSelected,
      openEditor,
      reactions,
    } = this.props;

    const [{ currentUser }] = this.context;
    const { actionModalOpen } = this.state;
    
    return (
      <Block className={`Post layout-${this.getPostLayout()}`}>
        <PostVisibilityNotice
          postid={id}
          visible={this.props.visible}
          isAuthor={idObjectsEqual(currentUser, user)}
          canModerate={thread.canModerate}
        />

        <SharePostModal
          postid={id}
          user={user}
          show={actionModalOpen === 'share'}
          closeModal={() => this.setActionModalOpen(null)}
        />

        <ReactionsModal
          postid={id}
          show={actionModalOpen === 'reactions'}
          canModerate={thread.canModerate}
          closeModal={() => this.setActionModalOpen(null)}
        />

        <Block.Header noPadding noBorderBottom>
          <PostHeader 
            user={user}
            forumid={thread.forumid}
          />
        </Block.Header>

        {this.getStaffPost()}

        <Block.Content>
          <PostContent
            id={id}
            content={content}
            created={created}
            index={index}
            everEdited={this.props.everEdited}
            edits={this.props.edits}
          />

          {this.getSignature()}

          <PostFooter
            id={id}
            user={user}
            canEdit={canEdit}
            canModerate={thread.canModerate}
            canSharePosts={thread.canSharePosts}
            canReply={thread.canReply}
            canReactToPosts={thread.canReactToPosts}
            actionModalOpen={actionModalOpen}
            setActionModalOpen={this.setActionModalOpen}
            selectPost={selectPost}
            deselectPost={deselectPost}
            checkPostSelected={checkPostSelected}
            openEditorToCurrentPost={() => openEditor(this.props)}
            reactions={reactions}
          />
        </Block.Content>
      </Block>
    )
  }

  getPostLayout(): PostLayout {
    const [{ currentUser }] = this.context;
    if (currentUser) {
      return currentUser.profileFields 
        && currentUser.profileFields.postLayout;
    }
    
    return DEFAULT_POST_LAYOUT;
  }

  getSignature() {
    const { signature } = this.props.user.textFields;
    return signature && <Signature signature={signature} />;
  }

  getStaffPost() {
    let { staffPostGroup } = this.props;
    if (!staffPostGroup) {
      return null;
    }

    return (
      <StaffPost 
        title={staffPostGroup.singularTitle} 
        color={staffPostGroup.color}
        icon={staffPostGroup.icon}
        former={staffPostGroup.former}
      />
    )
  }

  setActionModalOpen = (actionModalOpen: PostActionModal) => {
    this.setState({ actionModalOpen });
  }
}

export default Post;
