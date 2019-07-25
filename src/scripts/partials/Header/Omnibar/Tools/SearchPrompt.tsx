import React, { Component } from 'react';
import { Dropdown, NavItem, Nav } from 'react-bootstrap';

import Icon from '../../../Icon';

export default class SearchPrompt extends Component {
  render() {
    return (
      <Dropdown
        alignRight 
        as={NavItem}
        className="SearchPrompt" 
        id="search-prompt" 
      >
        <Dropdown.Toggle id="search-menu-toggle" as={Nav.Link}>
          <Icon name="search" group="fal" size="lg" fw />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Hello there!</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
