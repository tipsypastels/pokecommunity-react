import React from 'react';

import '../../../styles/modules/Post/PostContent.scss';

interface IProps {
  dateline: number;
  content: string;
  indexInThread: number;
  canModerate: boolean; // TODO add the checkbox somewhere
}

const PostContent = ({ indexInThread , content, dateline, canModerate }: IProps) => (
  <div className="PostContent">
    <div className="time text-small flex-grows">
      {(new Date(dateline)).toDateString()}, Post #{indexInThread}
    </div>

    <main className="post-message">
      {content}
    </main>
  </div>
);

export default PostContent;