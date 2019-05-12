import React, { Component } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { When } from 'react-if';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/pro-solid-svg-icons';

import Block from '../Block';

import '../../../styles/modules/ThreadHeader.scss';

interface IProps {
  threadid: number;
  title: string;
  views: number;
  repliesCount: number;
  canReply: boolean;
  openEditor: () => void;
}

export default class ThreadHeader extends Component<IProps> {
  render() {
    const { threadid, title, views, repliesCount } = this.props;
    return (
      <Block className="ThreadHeader">
        <Block.Header>
          <h2 className="flex-grows">
            {title}
          </h2>

          <div className="thread-stats flex">
            <small className="text-small">
              <h4>{views}</h4> Views
            </small>
            <small className="text-small">
              <h4>{repliesCount}</h4> Replies
            </small>
          </div>
        </Block.Header>

        <Block.Content className="flex v-center">
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
        </Block.Content>
      </Block>
    )
  }
}
