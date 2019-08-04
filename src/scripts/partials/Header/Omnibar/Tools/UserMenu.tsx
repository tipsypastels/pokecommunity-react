import React, { Component, ReactNode } from 'react';
import { NavItem, Dropdown, Nav, Form, Button } from 'react-bootstrap';

import Icon, { IconProps } from '../../../Icon';
import AppContext from '../../../../AppContext';
import SmartLink from '../../../SmartLink';

export interface UserMenuItem {
  name: string;
  link: string;
  icon: string | IconProps;
}

export default class UserMenu extends Component {
  static contextType = AppContext;

  render() {
    return (
      <Dropdown
        alignRight
        as={NavItem}
        className="UserMenu"
        id="user-menu"
      >
        <Dropdown.Toggle 
          className="user-menu-toggle" 
          id="user-menu-toggle" 
          as={Nav.Link}
        >
          {this.getMenuUserbit()}
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
          <Dropdown.Header>
            {this.getMenuItems().map((item: UserMenuItem) => (
              <SmartLink 
                key={item.name} 
                to={item.link} 
                className="user-menu-item"
              >
                <Icon.Maybe from={item.icon} />

                <span>
                  {item.name}
                </span>
              </SmartLink>
            ))}
          </Dropdown.Header>

          <Dropdown.Divider />

          <Dropdown.Header>
            <a href="#TODO logout" className="sign-out">
              <Icon name="sign-out" fw />

              <span>
                Sign Out
              </span>
            </a>
          </Dropdown.Header>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  getMenuUserbit(): ReactNode {
    const { currentUser } = this.context;
    
    let avatar;
    if (currentUser.avatar) {
      avatar = (
        <img 
          className="avatar d-none d-md-block" 
          src={currentUser.avatar} 
          alt="You"
        />
      )
    }

    return (
      <React.Fragment>
        {currentUser.username}
        {avatar}
      </React.Fragment>
    );
  }

  getMenuItems(): UserMenuItem[] {
    const { currentUser } = this.context;

    return [
      {
        name: 'Profile',
        link: `/member.php?u=${currentUser.id}`,
        icon: 'user',
      },
      {
        name: 'Dashboard',
        link: '/dashboard',
        icon: 'tachometer',
      },
      {
        name: 'Settings',
        link: '/settings',
        icon: 'sliders-v-square'
      },
      {
        name: 'Friends',
        link: '/settings/friends',
        icon: { name: 'address-book', group: 'far' },
      },
      {
        name: 'Followed',
        link: '/subscription.php',
        icon: 'bookmark',
      },
      {
        name: 'Updates',
        link: '/search.php?do=getnew&and=subscribe',
        icon: { name: 'check', mask: 'fas fa-heart', transform: 'shrink-8 up-.5' }
      },
      {
        name: 'Edit Avatar',
        link: '/settings/editavatar',
        icon: { name: 'portrait', group: 'far' },
      },
      {
        name: 'Edit Flair',
        link: '/settings/postflair',
        icon: 'fire',
      },
      {
        name: 'Edit Profile',
        link: '/settings/profile',
        icon: { name: 'address-card', group: 'fal' },
      },
    ]
  }
}
