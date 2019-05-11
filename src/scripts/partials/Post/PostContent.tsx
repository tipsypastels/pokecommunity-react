import React from 'react';

interface IProps {
  postid: number;
  dateline: number;
}

const PostContent = ({ postid , dateline }: IProps) => (
  <div className="PostContent">
    I am a the content.
    this is post {postid}
    was posted on {(new Date(dateline)).toDateString()}
  </div>
);

export default PostContent;