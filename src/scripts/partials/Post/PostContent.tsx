import React from 'react';

import { standardDateTime } from '../../helpers/DateHelpers';
import Parser from '../../parser/Parser';
import PostEditInterface from '../../types/PostEditInterface';
import SmartLink from '../SmartLink';

interface IProps {
  id: number;
  created: number;
  content: string;
  index: number;
  everEdited: boolean;
  edits?: PostEditInterface[];
}

// the server filters out edits if the user doesn't have permission to view them, so it's safe to use that as a check here

const PostContent = (props: IProps) => (
  <div className="PostContent">
    <div className="time text-small flex-grows">
      Post #{props.index + 1} — {standardDateTime(props.created)}

      {props.everEdited && (
        props.edits.length ? 
          (
            <SmartLink to={`/posthistory.php?p=${props.id}`}>
              &nbsp;(view revisions)
            </SmartLink>
          ): (
            <>, since edited</>
          )
      )}
    </div>

    <main className="post-message">
      <Parser bbcode={props.content} />
    </main>
  </div>
);

export default PostContent;