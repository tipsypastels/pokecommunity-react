import React, { Component } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { When } from 'react-if';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/pro-solid-svg-icons';
import { faClock } from '@fortawesome/pro-regular-svg-icons';

import Block from '../Block';
import Stat from '../Stat';
import ThreadPoll from './ThreadPoll';

import PollInterface from '../../types/PollInterface';

import '../../../styles/modules/ThreadHeader.scss';

interface IProps {
  threadid: number;
  title: string;
  views: number;
  repliesCount: number;
  canReply: boolean;
  postusername: string;
  dateline: number;
  poll: PollInterface;
  openEditor: () => void;
}

export default class ThreadHeader extends Component<IProps> {
  render() {
    const { title, views, repliesCount, postusername } = this.props;
    return (
      <Block className="ThreadHeader">
        <Block.Header>
          <div className="thread-info flex-grows">
            <h2>
              {title}
            </h2>

            <div className="thread-starter-and-dateline text-small">
              <span className="thread-starter">
                Started by {postusername}
              </span>

              <span className="thread-dateline">
                <FontAwesomeIcon className="fa-fw" icon={faClock} />
                {(new Date(this.props.dateline)).toDateString()}
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

        <Block.Content>
          <When condition={typeof this.props.poll !== 'undefined'}>
            <ThreadPoll
              poll={this.props.poll}
            />
          </When>
          <div className="flex">
            <When condition={this.props.canReply}>
              <Button color="primary" onClick={this.props.openEditor}>
                Reply to Thread
              </Button>
            </When>

            <div className="flex-grows" />

            <Dropdown alignRight>
              <Dropdown.Toggle variant="link" id="thread-tools">
                <FontAwesomeIcon icon={faWrench} />

                <span>
                  Tools
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">
                  hello world
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Block.Content>
      </Block>
    )
  }
}
