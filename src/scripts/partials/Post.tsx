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
    return (
      <Block className="Post">
        <Block.Header>
          <PostHeader
            username={this.props.username}
          />
        </Block.Header>

        <Block.Content>
          <PostContent
            content={this.props.content}
            dateline={this.props.dateline}
            postid={this.props.postid}
            canModerate={this.props.thread.canModerate}
          />
          <PostFooter 
            canEdit={this.props.canEdit}
            canSharePosts={this.props.thread.canSharePosts}
            canReply={this.props.thread.canReply}
            canReactToPosts={this.props.thread.canReactToPosts}
          />
        </Block.Content>
      </Block>
    )
  }
}

export default Post;
