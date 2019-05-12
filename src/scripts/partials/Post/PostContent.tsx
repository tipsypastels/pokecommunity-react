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
    <div className="post-content-meta flex">
      <div className="time flex-grows">
        {(new Date(dateline)).toDateString()}
      </div>

      <div className="postid">
        #{postid}

        <When condition={canModerate}>
          <input type="checkbox" name="todo" />
        </When>
      </div>
    </div>

    <main className="post-content flex">
      {content}
    </main>
  </div>
);

export default PostContent;