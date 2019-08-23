import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import Icon from '../Icon';

import PostInterface from '../../types/PostInterface';
import PostVisibility from '../../types/PostVisibility';

interface IProps {
  selectPostsByFilter: (callback: (post: PostInterface, selected?: boolean) => boolean) => void;
}

export default class ThreadHeaderSelectPosts extends Component<IProps> {
  render() {
    const { select } = this;

    return (
      <Dropdown alignRight>
        <Dropdown.Toggle variant="link" id="select-posts">
          <Icon name="check-square" mr={1} />
          Select Posts
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={select(post => true)}>
            <strong>Select</strong> All Posts
          </Dropdown.Item>

          <Dropdown.Item onClick={select(post => false)}>
            <strong>Deselect</strong> All Posts
          </Dropdown.Item>

          <Dropdown.Item onClick={select((_, selected) => !selected)}>
            <strong>Invert</strong> Selection
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item onClick={select(post => post.visible === PostVisibility.Moderated)}>
            Select <strong>Moderated</strong> Posts
          </Dropdown.Item>

          <Dropdown.Item onClick={select(post => post.visible === PostVisibility.Deleted)}>
            Select <strong>Deleted</strong> Posts
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  select = (callback: (post: PostInterface, selected?: boolean) => boolean): (() => void) => {
    return () => {
      this.props.selectPostsByFilter(callback);
    }
  }
}