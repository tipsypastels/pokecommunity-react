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

export interface PostProps extends PostInterface {
  thread: ThreadInterface;
  index: number;
  
  selectPost: (postid: number) => void;
  deselectPost: (postid: number) => void;
  checkPostSelected: (postid: number) => boolean;
}

export type PostActionModal = null | 'share';

interface IState {
  overflowActive: boolean;
  actionModalOpen: PostActionModal;
}

class Post extends Component<PostProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      overflowActive: false,
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
    } = this.props;

    const { actionModalOpen } = this.state;
    
    return (
      <Block className="Post" onClick={this.disableOverflowIfActive}>
        <SharePostModal
          postid={id}
          user={user}
          show={actionModalOpen === 'share'}
          closeModal={() => this.setActionModalOpen(null)}
        />

        {/* TODO move these to a getter with perm checks */}
        <Block.OverflowMenu 
          active={this.state.overflowActive}
          items={[
            {
              name: `Ignore ${user.username}`,
              icon: 'user-minus',
            },
            {
              name: `Moderate ${user.username}`,
              icon: 'user-shield',
            },
            { divider: 0 },
            {
              name: 'Share Post',
              icon: 'share-square',
              className: 'd-block d-md-none',
            },
            {
              name: 'Report Post',
              icon: 'exclamation-triangle',
            },
            {
              name: 'Delete Post',
              icon: 'trash-alt',
            }
          ]}
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
          />
        </Block.Content>
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

  setOverflow = (overflowActive: boolean) => {
    this.setState({ overflowActive });
  }

  disableOverflowIfActive = (e) => {
    if (!this.state.overflowActive) {
      return;
    }

    this.setOverflow(false);
  }

  setActionModalOpen = (actionModalOpen: PostActionModal) => {
    this.setState({ actionModalOpen });
  }
}

export default Post;
