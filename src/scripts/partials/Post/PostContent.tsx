import React from 'react';

interface IProps {
  postid: number;
  dateline: number;
  content: string;
}

const PostContent = ({ postid , content, dateline }: IProps) => (
  <div className="PostContent">
    <div className="post-date align-right text-small">
      {(new Date(dateline)).toDateString()}
    </div>
    <main className="post-main flex">
      <div className="post-content grows">
        {content}
      </div>
      <div className="post-id">
        <input type="checkbox" name="todo"/> #{postid}
      </div>
    </main>
  </div>
);

export default PostContent;