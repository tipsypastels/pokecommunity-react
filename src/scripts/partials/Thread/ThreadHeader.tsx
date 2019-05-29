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
  title: string;
  views: number;
  repliesCount: number;
  canReply: boolean;
  username: string;
  created: number;
  poll: PollInterface;
  openEditor: () => void;
}

export default class ThreadHeader extends Component<IProps> {
  render() {
    const { title, views, repliesCount, username } = this.props;
    return (
      <Block className="ThreadHeader">
        <Block.Header>
          <div className="thread-info flex-grows">
            <h2>
              {title}
            </h2>

            <div className="thread-starter-and-created text-small">
              <span className="thread-starter">
                Started by {username}
              </span>

              <span className="thread-created">
                <FontAwesomeIcon className="fa-fw" icon={faClock} />
                {(new Date(this.props.created)).toDateString()}
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
        </Block.Footer>
      </Block>
    )
  }
}
