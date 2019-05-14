import React, { Component } from 'react'

import Block from './Block';

import PostHeader from './Post/PostHeader';
import PostContent from './Post/PostContent';
import PostFooter from './Post/PostFooter';

import ThreadInterface from '../types/ThreadInterface';
import PostInterface from '../types/PostInterface';

interface IProps extends PostInterface {
  thread: ThreadInterface;
}

class Post extends Component<IProps> {
  render() {
    const {
      user,
      username,
      content,
      dateline,
      postid,
      thread,
      canEdit,
    } = this.props;
    
    return (
      <Block className="Post">
        <Block.Header>
          <PostHeader
            username={username}
            avatarURL={user.avatarURL}
            postCount={user.postCount}
            yearCount={user.postCount}
            miniBiography={user.miniBiography}
          />
        </Block.Header>

        <Block.Content>
          <PostContent
            content={content}
            dateline={dateline}
            postid={postid}
            canModerate={thread.canModerate}
          />
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
}

export default Post;
