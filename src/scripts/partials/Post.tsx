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
import vBRoute from '../bridge/vBRoute';

import '../../styles/modules/Post.scss';

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
  static contextType = AppContext;

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

    {/* TODO move these to a getter with perm checks */ }
    {/* <Block.OverflowMenu 
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
        /> */}

    const { user } = this.props;

    return (
      <div className="post-overflow-menu">
        <When condition={currentUser.id !== user.id}>
          <a className="overflow-action" href={vBRoute('ignoreUser', user.id)}>
            <Icon name="user-minus" fw />
            Ignore {user.username}
          </a>
        </When>

        <When condition={this.props.thread.canSharePosts}>
          <div className="overflow-action d-block d-md-none" onClick={() => this.setActionModalOpen('share')}>
            <Icon name="share-square" fw />
            Share Post
          </div>
        </When>

        <a className="overflow-action" href={vBRoute('report', this.props.id)}>
          <Icon name="exclamation-triangle" fw />
          Report Post
        </a>

        <When condition={this.props.canEdit}>
          <a className="overflow-action" href={vBRoute('deletePost', this.props.id)}>
            <Icon name="trash-alt" fw />
            Delete Post
          </a>
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
}

export default Post;
