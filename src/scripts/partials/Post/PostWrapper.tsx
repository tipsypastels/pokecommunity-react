import React, { Component } from 'react'

import Post, { PostProps } from '../Post';
import DeletedPost from './DeletedPost';
import PostVisibility from '../../types/PostVisibility';

export default class PostWrapper extends Component<PostProps> {
  render() {
    const post = this.props;

    if (post.visible === PostVisibility.Deleted) {
      return <DeletedPost {...post} />;
    }

    return <Post {...post} />;
  }
}
