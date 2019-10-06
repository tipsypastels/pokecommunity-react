import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';

import AppContext from '../../../AppContext';

import UserMenu from './Tools/UserMenu';
import GuestUserMenu from './Tools/GuestUserMenu';
import Notifications from './Tools/Notifications';
import Messages from './Tools/Messages';
import SearchPrompt, { SearchScopeProps } from './Tools/SearchPrompt';
import HelpMenu from './Tools/HelpMenu';
import SupporterMenu from './Tools/SupporterMenu';

const TOOLS = {
  'donations': SupporterMenu,
  'help': HelpMenu,
  'search': SearchPrompt,
  'messages': Messages,
  'notifications': Notifications,
  'user': UserMenu,
  'guest': GuestUserMenu,
}

interface ToolOptions {
  if?: any;
  props?: object;
}

export default function OmnibarTools(props: SearchScopeProps) {
  const [{ currentUser }] = useContext(AppContext);

  function tool(name: keyof typeof TOOLS, opts: ToolOptions = {}) {
    if ('if' in opts && !opts.if) {
      return null;
    }

    const Component = TOOLS[name];
    return <Component {...(opts.props || {})} />
  }

  // TODO mod menu
  return (
    <Nav className="navbar-user-tools">
      {tool('donations')}
      {tool('help')}
      {tool('search', { 
        props: { searchScope: props.searchScope },
        if: currentUser,
      })}
      {tool('notifications', { if: currentUser })}
      {tool('messages', { if: currentUser })}
      {tool('user', { if: currentUser })}
      {tool('guest', { if: !currentUser })}
    </Nav>
  )
}
