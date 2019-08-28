import React from 'react'

import Post, { PostProps } from '../Post';
import DeletedPost from './DeletedPost';
import PostVisibility from '../../types/PostVisibility';

export default function PostWrapper(post: PostProps) {
  if (post.visible === PostVisibility.Deleted) {
    return <DeletedPost {...post} />
  }

  return <Post {...post} />;
}