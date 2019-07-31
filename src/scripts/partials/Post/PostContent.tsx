import React from 'react';
import BBCode from 'pokecommunity-bbcode';

import { standardDateTime } from '../../helpers/DateHelpers';

interface IProps {
  created: number;
  content: string;
  index: number;
}

const PostContent = ({ index, created, content }: IProps) => (
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