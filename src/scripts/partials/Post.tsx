import React, { Component } from 'react'

import Block from './Block';

import PostHeader from './Post/PostHeader';
import PostContent from './Post/PostContent';
import PostFooter from './Post/PostFooter';

import ThreadInterface from '../types/ThreadInterface';
import PostInterface from '../types/PostInterface';
import Signature from './User/Signature';

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
          <PostHeader user={user} />
        </Block.Header>

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
}

export default Post;
