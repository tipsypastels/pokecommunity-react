import React from 'react';
import BBCode from 'pokecommunity-bbcode';

import { standardDateTime } from '../../helpers/DateHelpers';

import '../../../styles/modules/Post/PostContent.scss';

interface IProps {
  created: number;
  content: string;
  canModerate: boolean; // TODO add the checkbox somewhere
  index: number;
}

const PostContent = ({ content, created, index }: IProps) => (
  <div className="PostContent">
    <div className="time text-small flex-grows">
      {standardDateTime(created)}, Post #{index + 1}
    </div>

    <main 
      className="post-message"
      dangerouslySetInnerHTML={{ __html: BBCode.process({ text: content }).html}}
    />
  </div>
);

export default PostContent;