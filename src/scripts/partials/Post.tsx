import React, { Component } from 'react'

import PostHeader from './Post/PostHeader';
import PostContent from './Post/PostContent';
import PostFooter from './Post/PostFooter';

import PostInterface from '../types/PostInterface';

import '../../styles/modules/Post.scss';

class Post extends Component<PostInterface> {
  render() {
    return (
      <div className="Post">
        <PostHeader
          username={this.props.username}
        />
        <PostContent 
          content={this.props.content}
          dateline={this.props.dateline}
          postid={this.props.postid}
        />
        <PostFooter />
      </div>
    )
  }
}

export default Post;
