import React from 'react';
import BBCode from 'pokecommunity-bbcode';

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

    <main 
      className="post-message"
      dangerouslySetInnerHTML={{ __html: BBCode.process({ text: content }).html}}
    />
  </div>
);

export default PostContent;