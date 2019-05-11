import React, { Component } from 'react'

import PostHeader from './Post/PostHeader';
import PostContent from './Post/PostContent';
import PostFooter from './Post/PostFooter';

import PostInterface from '../types/PostInterface';

class Post extends Component<PostInterface> {
  render() {
    return (
      <div>
        <PostHeader
          username={this.props.username}
        />
        <PostContent 
          dateline={this.props.dateline}
          postid={this.props.postid}
        />
        <PostFooter />
      </div>
    )
  }
}

export default Post;
