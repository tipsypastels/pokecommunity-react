/* eslint-disable no-lone-blocks */

import React, { useState } from 'react';
import PostVisibility from '../../types/PostVisibility';
import Icon from '../Icon';
import SchedulePost from '../PostModal/SchedulePost';

interface IProps {
  postid: number;
  visible: PostVisibility;
  isAuthor: boolean;
  canModerate: boolean;
}

const ICONS = {
  [PostVisibility.Moderated]: 'fa-comment-slash',
  [PostVisibility.Deleted]: 'trash-alt',
  [PostVisibility.Drafted]: 'file-alt',
  [PostVisibility.Scheduled]: 'clock',
  [PostVisibility.Rejected]: 'minus-circle',
};

const LABELS = {
  [PostVisibility.Moderated]: {
    asOP: 'This post is moderated. It is only viewable to you and to moderators.',
    asDefault: 'This post is moderated. It is only visible to the author and moderators.'
  },

  [PostVisibility.Deleted]: 'You are viewing a deleted post.',

  [PostVisibility.Drafted]: 'This post is a draft. Until you publish it, it is only visible to you.',

  [PostVisibility.Scheduled]: 'This post is scheduled to become visible on TODO DATE HERE.',

  [PostVisibility.Rejected]: 'This post has been rejected by a moderator.',
};

export default function PostVisibilityNotice(props: IProps) {
  const [scheduling, setScheduling] = useState(false);

  // there is no notice for visible posts
  if (props.visible === PostVisibility.Published) {
    return null;
  }

  let label = LABELS[props.visible];
  if (typeof label === 'object') {
    if (props.isAuthor) {
      label = label.asOP;
    } else {
      label = label.asDefault;
    }
  }

  async function changePostVisibility(visibility: PostVisibility, date?: Date) {
    // TODO
  }

  function action(name: string, visibility: PostVisibility | (() => void)) {
    return (
      <span 
        className="action" 
        onClick={() => {
          typeof visibility === 'function'
            ? visibility()
            : changePostVisibility(visibility);
        }}
      >
        {name}
      </span>
    );
  }

  const actions = (function() {
    switch(props.visible) {
      case PostVisibility.Moderated: {
        if (props.canModerate) {
          return action('Publish Post', PostVisibility.Published);
        }
        break;
      };
      case PostVisibility.Deleted: {
        if (props.canModerate) {
          return action('Undelete Post', PostVisibility.Published);
        }
        break;
      }
      case PostVisibility.Drafted: {
        if (props.isAuthor) {
          return (
            <React.Fragment>
              {action('Publish Now', PostVisibility.Published)}
              {action('Schedule', () => setScheduling(true))}
            </React.Fragment>
          );
        }
        break;
      };
      case PostVisibility.Scheduled: {
        if (props.isAuthor) {
          return (
            <React.Fragment>
              {action('Publish Now', PostVisibility.Published)}
              {action('Change Publish Date', () => setScheduling(true))}
            </React.Fragment>
          );
        }
        break;
      }
    }
  })();

  return (
    <div className={`PostVisibilityNotice visible-${props.visible}`}>
      {/* TODO add initialDate here */}
      {scheduling && (
        <SchedulePost
          abort={() => setScheduling(false)}
          onSubmit={async date => {
            setScheduling(false);
            await changePostVisibility(PostVisibility.Scheduled, date);
          }}
        />
      )}

      <Icon name={ICONS[props.visible]} fw mr={1} />

      <div className="label">
        {label}
      </div>

      <div className="actions">
        {actions}
      </div>
    </div>
  )
}
