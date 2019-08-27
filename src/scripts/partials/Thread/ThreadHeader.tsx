import React from 'react'
import { Button, Badge } from 'react-bootstrap';
import { When } from 'react-if';

import Icon from '../Icon';

import Block from '../Block';
import Stat from '../Stat';
import Poll from '../Poll';
import ThreadHeaderSelectPosts from './ThreadHeaderSelectPosts';

import PollInterface from '../../types/PollInterface';
import PostInterface from '../../types/PostInterface';
import DailyArticleInterface from '../../types/DailyArticleInterface';

import { standardDateTime } from '../../helpers/DateHelpers';
import LinkedDailyArticle from './LinkedDailyArticle';

interface IProps {
  title: string;
  views: number;
  repliesCount: number;
  canReply: boolean;
  canModerate: boolean;
  threadOpen: number;
  username: string;
  created: number;
  poll: PollInterface;
  forumTitle: string;

  forumIcon?: string;
  threadIcon?: string;
  linkedDailyArticle?: DailyArticleInterface;

  openEditor: () => void;
  openModeration: () => void;
  selectPostsByFilter: (callback: (post: PostInterface, selected?: boolean) => boolean) => void;
}

export default function ThreadHeader(props: IProps) {
  const { 
    title, 
    views, 
    repliesCount, 
    username, 
    forumTitle, 
    forumIcon,
    threadIcon,
    linkedDailyArticle,
  } = props;

  return (
    <Block className="ThreadHeader">
      <Block.Header>
        <div 
          className="thread-icon" 
          style={{ backgroundImage: `url(${threadIcon || forumIcon})` }} 
        />

        <div className="thread-info flex-grows">
          <span className="forum-title">
            {forumTitle}
          </span>


          <div className="flex flex-v-center">
            <h2 className="thread-title">
              {title}
            </h2>

            {!props.threadOpen && (
              <Badge variant="dark" className="ml-1">
                Closed
              </Badge>
            )}
          </div>

          <div className="thread-starter-and-created text-small">
            <span className="thread-starter">
              Started by {username}
            </span>

            <span className="thread-created">
              <Icon fw name="clock" group="far" mr={1} />
              {standardDateTime(props.created)}
            </span>
          </div>
        </div>

        <div className="thread-stats flex">
          <Stat
            name="views"
            number={views}
            inline
          />
          <Stat
            name="replies"
            number={repliesCount}
            inline
          />
        </div>
      </Block.Header>

      {linkedDailyArticle 
          && <LinkedDailyArticle {...linkedDailyArticle} />}
      
      {props.poll 
          && <Poll poll={props.poll} />}

      <Block.Footer>
        <div className="flex">
          {(() => {
            if (props.canReply) {
              return (
                <Button variant="primary" onClick={props.openEditor}>
                  Reply to Thread
                </Button>
              );
            } else if (!props.threadOpen) {
              return (
                <Button variant="secondary" disabled>
                  <Icon name="lock" mr={1} />
                  Thread Closed
                </Button>
              );
            }
          })()}

          <div className="flex-grows" />

          <When condition={props.canModerate}>
            <div className="d-none d-md-flex">
              <Button variant="link" onClick={props.openModeration}>
                <Icon name="shield" mr={1} />
                Moderate
              </Button>

              <ThreadHeaderSelectPosts 
                selectPostsByFilter={props.selectPostsByFilter}
              />
            </div>
          </When>
        </div>
      </Block.Footer>
    </Block>
  );
}