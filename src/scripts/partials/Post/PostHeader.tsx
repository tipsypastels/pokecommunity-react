import React from 'react';

interface IProps {
  username: string,
}

const PostHeader = (props: IProps) => (
  <div className="PostHeader">
    {props.username}
  </div>
);

export default PostHeader;