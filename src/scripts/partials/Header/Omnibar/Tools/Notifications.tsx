import React, { Component } from 'react';

import { Dropdown, NavItem, Nav } from 'react-bootstrap';
import Icon from '../../../Icon';

export default class Notifications extends Component {
  render() {
    return (
      <Dropdown 
        alignRight 
        as={NavItem}
        className="Notifications"
        id="notifications-menu" 
      >
        <Dropdown.Toggle id="notifications-menu-toggle" as={Nav.Link}>
          <Icon name="bell" group="fal" size="lg" fw />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Hello there!</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
