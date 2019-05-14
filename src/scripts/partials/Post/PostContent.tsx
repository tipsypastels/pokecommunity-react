import React from 'react';

import '../../../styles/modules/Post/PostContent.scss';

interface IProps {
  postid: number;
  dateline: number;
  content: string;
  canModerate: boolean; // TODO add the checkbox somewhere
}

const PostContent = ({ postid , content, dateline, canModerate }: IProps) => (
  <div className="PostContent">
    <div className="time text-small flex-grows">
      {(new Date(dateline)).toDateString()}, Post #{postid}
    </div>

    <main className="post-message">
      {content}
    </main>
  </div>
);

export default PostContent;