import React from 'react';

import { standardDateTime } from '../../helpers/DateHelpers';
import Parser from '../../parser/Parser';

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

    <main className="post-message">
      <Parser bbcode={content} />
    </main>
  </div>
);

export default PostContent;