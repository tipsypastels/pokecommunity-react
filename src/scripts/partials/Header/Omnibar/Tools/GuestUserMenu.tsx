import React, { Component } from 'react'
import { Dropdown, NavItem, Nav, Button } from 'react-bootstrap';

import Icon from '../../../Icon';
import vBRoute from '../../../../bridge/vBRoute';

import '../../../../../styles/modules/Header/Omnibar/Menus/GuestUserMenu.scss';

export default class GuestUserMenu extends Component {
  render() {
    return (
      <Dropdown 
        alignRight 
        as={NavItem}
        className="GuestUserMenu"
        id="user-menu" 
      >
        <Dropdown.Toggle id="user-menu-toggle" as={Nav.Link}>
          Sign In
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href={vBRoute('login')}>
            <Icon name="user-circle" group="fal" />

            <h2>
              Sign into your account.
            </h2>

            <Button variant="primary">
              Sign in
            </Button>
          </Dropdown.Item>

          <Dropdown.Item href={vBRoute('register')}>
            <Icon name="puzzle-piece" group="fal" />

            <h2>
              No account? No worries.
            </h2>

            <Button variant="primary">
              Create account
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
