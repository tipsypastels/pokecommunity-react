import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

import AppContext from '../../../AppContext';

import UserMenu from './Tools/UserMenu';
import GuestUserMenu from './Tools/GuestUserMenu';
import Notifications from './Tools/Notifications';
import Messages from './Tools/Messages';
import SearchPrompt from './Tools/SearchPrompt';
import HelpMenu from './Tools/HelpMenu';
import SupporterMenu from './Tools/SupporterMenu';

// rewrite how this works
type ToolList = (any)[];

const loggedinTools: ToolList = [
  SupporterMenu,
  HelpMenu,
  SearchPrompt,
  Messages,
  Notifications,
  UserMenu,
];

const loggedoutTools: ToolList = [
  SupporterMenu,
  HelpMenu,
  GuestUserMenu,
];

export default class OmnibarTools extends Component {
  static contextType = AppContext;

  render() {
    const relevantTools = this.context.currentUser
      ? loggedinTools
      : loggedoutTools;

    return (
      <Nav className="navbar-user-tools">
        {relevantTools.map(Tool => (
          <Tool key={Tool.name} />
        ))}
      </Nav>
    );
  }
}
