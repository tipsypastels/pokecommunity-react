import React, { Component } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { When } from 'react-if';

import Icon from '../Icon';

import Block from '../Block';
import Stat from '../Stat';
import ThreadPoll from './ThreadPoll';
import ThreadHeaderSelectPosts from './ThreadHeaderSelectPosts';

import PollInterface from '../../types/PollInterface';
import PostInterface from '../../types/PostInterface';

import { standardDateTime } from '../../helpers/DateHelpers';

interface IProps {
  title: string;
  views: number;
  repliesCount: number;
  canReply: boolean;
  canModerate: boolean;
  username: string;
  created: number;
  poll: PollInterface;
  forumTitle: string;

  forumIcon?: string;
  threadIcon?: string;

  openEditor: () => void;
  openModeration: () => void;
  selectPostsByFilter: (callback: (post: PostInterface, selected?: boolean) => boolean) => void;
}

export default class ThreadHeader extends Component<IProps> {
  render() {
    const { 
      title, 
      views, 
      repliesCount, 
      username, 
      forumTitle, 
      forumIcon,
      threadIcon,
    } = this.props;
    
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

            <h2 className="thread-title">
              {title}
            </h2>

            <div className="thread-starter-and-created text-small">
              <span className="thread-starter">
                Started by {username}
              </span>

              <span className="thread-created">
                <Icon fw name="clock" group="far" />
                {standardDateTime(this.props.created)}
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

        {this.props.poll && <ThreadPoll poll={this.props.poll} />}

        <Block.Footer>
          <div className="flex">
            <When condition={this.props.canReply}>
              <Button color="primary" onClick={this.props.openEditor}>
                Reply to Thread
              </Button>
            </When>

            <div className="flex-grows" />

            <When condition={this.props.canModerate}>
              <div className="d-none d-md-flex">
                <Button variant="link" onClick={this.props.openModeration}>
                  <Icon name="shield" />
                  Moderate
                </Button>

                <ThreadHeaderSelectPosts 
                  selectPostsByFilter={this.props.selectPostsByFilter}
                />
              </div>
            </When>
          </div>
        </Block.Footer>
      </Block>
    );
  }
}
