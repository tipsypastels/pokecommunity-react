import React, { Component } from 'react'

import Block from './Block';

import PostHeader from './Post/PostHeader';
import PostContent from './Post/PostContent';
import PostFooter from './Post/PostFooter';
import Signature from './User/Signature';
import StaffPost from './Post/StaffPost';

import ThreadInterface from '../types/ThreadInterface';
import PostInterface from '../types/PostInterface';

interface IProps extends PostInterface {
  thread: ThreadInterface;
}

interface IState {
  overflowActive: boolean;
}

class Post extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      overflowActive: false,
    };
  }

  render() {
    const {
      user,
      content,
      created,
      thread,
      canEdit,
    } = this.props;
    
    return (
      <Block className="Post" onClick={this.disableOverflowIfActive}>
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
            'divider',
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
            canModerate={thread.canModerate}
          />

          {this.getSignature()}

          <PostFooter 
            canEdit={canEdit}
            canSharePosts={thread.canSharePosts}
            canReply={thread.canReply}
            canReactToPosts={thread.canReactToPosts}
            overflowActive={this.state.overflowActive}
            setOverflow={this.setOverflow}
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
}

export default Post;
