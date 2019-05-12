import React from 'react';
import { When } from 'react-if';

interface IProps {
  postid: number;
  dateline: number;
  content: string;
  canModerate: boolean;
}

const PostContent = ({ postid , content, dateline, canModerate }: IProps) => (
  <div className="PostContent">
    <div className="post-date align-right text-small">
      {(new Date(dateline)).toDateString()}
    </div>
    <main className="post-main flex">
      <div className="post-content grows">
        {content}
      </div>
      <div className="post-id">
        <When condition={canModerate}>
          <input type="checkbox" name="todo"/> #{postid}
        </When>
      </div>
    </main>
  </div>
);

export default PostContent;