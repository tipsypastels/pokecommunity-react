import React, { Component } from 'react'
import { When } from 'react-if';

import Block from './Block';
import Icon from './Icon';

import PostHeader from './Post/PostHeader';
import PostContent from './Post/PostContent';
import PostFooter from './Post/PostFooter';
import Signature from './User/Signature';
import StaffPost from './Post/StaffPost';

import ThreadInterface from '../types/ThreadInterface';
import PostInterface from '../types/PostInterface';
import SharePostModal from './Post/ActionModals/SharePostModal';

import AppContext from '../AppContext';
import SmartLink from './SmartLink';

export interface PostProps extends PostInterface {
  thread: ThreadInterface;
  index: number;
  
  selectPost: (postid: number) => void;
  deselectPost: (postid: number) => void;
  checkPostSelected: (postid: number) => boolean;
  openEditor: (post: PostInterface) => void;
  setPost: (index: number, post: PostInterface) => void;
}

export type PostActionModal = null | 'share';

interface IState {
  overflowActive: boolean;
  reactionsOpen: boolean;
  actionModalOpen: PostActionModal;
}

class Post extends Component<PostProps, IState> {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      overflowActive: false,
      reactionsOpen: false,
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
      openEditor
    } = this.props;

    const { actionModalOpen } = this.state;
    
    return (
      <Block className="Post">
        <SharePostModal
          postid={id}
          user={user}
          show={actionModalOpen === 'share'}
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
            content={content}
            created={created}
            index={index}
          />

          {this.getSignature()}

          <PostFooter
            id={id}
            canEdit={canEdit}
            canSharePosts={thread.canSharePosts}
            canReply={thread.canReply}
            canReactToPosts={thread.canReactToPosts}
            overflowActive={this.state.overflowActive}
            setOverflow={this.setOverflow}
            actionModalOpen={actionModalOpen}
            setActionModalOpen={this.setActionModalOpen}
            selectPost={selectPost}
            deselectPost={deselectPost}
            checkPostSelected={checkPostSelected}
            openEditorToCurrentPost={() => openEditor(this.props)}
            reactionsOpen={this.state.reactionsOpen}
            setReactionsOpen={this.setReactionsOpen}
          />
        </Block.Content>

        {this.getOverflowMenu()}
      </Block>
    )
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

  getOverflowMenu() {
    const { currentUser } = this.context;

    if (!this.state.overflowActive || !currentUser) {
      return null;
    }

    const { user } = this.props;

    return (
      <div className="post-overflow-menu">
        <When condition={currentUser.id !== user.id}>
          <SmartLink to={`/settings.php?do=addlist&userlist=ignore&u=${user.id}`} className="overflow-action">
            <Icon name="user-minus" fw />
            Ignore {user.username}
          </SmartLink>
        </When>

        <When condition={this.props.thread.canSharePosts}>
          <div className="overflow-action d-block d-md-none" onClick={() => this.setActionModalOpen('share')}>
            <Icon name="share-square" fw />
            Share Post
          </div>
        </When>

        <SmartLink to={`/report.php?p=${this.props.id}`} className="overflow-action">
          <Icon name="exclamation-triangle" fw />
          Report Post
        </SmartLink>

        <When condition={this.props.canEdit}>
          <SmartLink to={`/postings.php?do=deletepost&p=${this.props.id}`} className="overflow-action">
            <Icon name="trash-alt" fw />
            Delete Post
          </SmartLink>
        </When>

        <div className="flex-grows" />

        <div className="close-overflow d-none d-md-block" onClick={() => this.setOverflow(false)}>
          <Icon name="times" />
        </div>
      </div>
    );
  }

  setOverflow = (overflowActive: boolean) => {
    this.setState({ overflowActive });
  }

  setActionModalOpen = (actionModalOpen: PostActionModal) => {
    this.setState({ actionModalOpen });
  }

  setReactionsOpen = (reactionsOpen: boolean) => {
    this.setState({ reactionsOpen });
  }
}

export default Post;
