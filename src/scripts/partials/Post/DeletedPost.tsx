import React, { useState, useEffect } from 'react'
import Post, { PostProps } from '../Post';
import Block from '../Block';
import SmartLink from '../SmartLink';
import Icon from '../Icon';
import Action from '../Action';
import newcoreApi from '../../bridge/newcoreApi';

import SlideDown from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

export default function DeletedPost(props: PostProps) {
  const [fullView, setFullView] = useState<boolean>(false);
  const { deletion, id, setPost, index } = props;

  useEffect(() => {
    if (fullView) {
      (async () => {
        const { data } = await newcoreApi({
          method: 'get',
          url: `/posts/${id}`,
        });

        if (data) {
          setPost(index, data);
        }
      })()
    }
  }, [fullView, id, setPost, index])

  if (fullView) {
    return (
      <SlideDown>
        <Post {...props} />
      </SlideDown>
    )
  }

  // in theory a deleted post should always have a deleted log, but
  // if somehow we get out of sync, i'd rather the whole site not 
  // break down. so double check just to be sure.
  let deletionMessage;
  if (deletion) {
    deletionMessage = <>
      Hidden by <SmartLink to={`/member.php?u=${deletion.userid}`}>{deletion.username}</SmartLink>: <span className="reason">{deletion.reason}</span>
    </>;
  } else {
    deletionMessage = 'Post hidden.';
  }

  return (
  <Block className="DeletedPost">
      <Block.Header>
        <SmartLink to={`/member.php?u=${props.user.id}`}>
          <img
            src={props.user.avatar}
            alt={`${props.user.username}'s Avatar`}
            className="avatar"
          />

          <div className="username">
            {props.user.username}
          </div>
        </SmartLink>
      </Block.Header>

      <Block.Content className="flex flex-v-center">
        <div className="deletion-message flex-grows">
          <Icon name="trash" group="far" mr={1} />

          {deletionMessage}
        </div>

        {props.thread.canModerate && (
          <div className="flex">
            <Action
              name="View"
              icon={{ name: 'crosshairs', group: 'fal' }}
              active={fullView}
              activate={() => setFullView(true)}
              deactivate={() => setFullView(false)}
            />

            <Action
              name="Manage"
              icon={{ name: 'wrench', group: 'fal' }}
              href={`/postings.php?do=managepost&p=${props.id}`}
            />

            <Action
              name="Select"
              activeName="Selected"
              icon={{ name: 'comment-dots', group: 'fal' }}
              active={props.checkPostSelected(props.id)}
              activate={() => props.selectPost(props.id)}
              deactivate={() => props.deselectPost(props.id)}
            />
          </div>
        )}
      </Block.Content>
    </Block>
  );
} 