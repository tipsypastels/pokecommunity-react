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
      indexInThread,
      thread,
      canEdit,
    } = this.props;
    
    return (
      <Block className="Post">
        <Block.Header noPadding noBorderBottom>
          <PostHeader
            userid={user.userid}
            username={username}
            avatarURL={user.avatarURL}
            usertitleHTML={user.usertitleHTML}
            postCount={user.postCount}
            yearCount={user.yearCount}
            miniBiography={user.miniBiography}
            postFlair={user.postFlair}
          />
        </Block.Header>

        <Block.Content>
          <PostContent
            content={content}
            dateline={dateline}
            indexInThread={indexInThread}
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
