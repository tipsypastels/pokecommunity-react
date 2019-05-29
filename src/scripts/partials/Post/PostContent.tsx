import React from 'react';
import BBCode from 'pokecommunity-bbcode';

import '../../../styles/modules/Post/PostContent.scss';

interface IProps {
  created: number;
  content: string;
  canModerate: boolean; // TODO add the checkbox somewhere
}

const PostContent = ({ content, created }: IProps) => (
  <div className="PostContent">
    <div className="time text-small flex-grows">
      {(new Date(created)).toDateString()}, Post #?
    </div>

    <main 
      className="post-message"
      dangerouslySetInnerHTML={{ __html: BBCode.process({ text: content }).html}}
    />
  </div>
);

export default PostContent;