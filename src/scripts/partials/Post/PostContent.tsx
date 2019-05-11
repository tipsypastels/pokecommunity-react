import React from 'react';

interface IProps {
  postid: number;
  dateline: number;
  content: string;
}

const PostContent = ({ postid , content, dateline }: IProps) => (
  <div className="PostContent">
    {content}
    this is post {postid}
    was posted on {(new Date(dateline)).toDateString()}
  </div>
);

export default PostContent;