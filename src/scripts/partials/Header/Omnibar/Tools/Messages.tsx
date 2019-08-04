import React, { Component } from 'react';
import { Dropdown, NavItem, Nav } from 'react-bootstrap';

import Icon from '../../../Icon';

export default class Messages extends Component {
  render() {
    return (
      <Dropdown 
        alignRight 
        as={NavItem}
        className="Messages"
        id="messages-menu" 
      >
        <Dropdown.Toggle id="messages-menu-toggle" as={Nav.Link}>
          <Icon name="envelope" group="fal" size="lg" fw />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Hello there!</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
