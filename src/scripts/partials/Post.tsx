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

class Post extends Component<IProps> {
  render() {
    const {
      user,
      content,
      created,
      thread,
      canEdit,
    } = this.props;
    
    return (
      <Block className="Post">
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
}

export default Post;
