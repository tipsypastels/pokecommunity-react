import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown, NavItem } from 'react-bootstrap';
import { When } from 'react-if';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faUser, faBell, faQuestionCircle, faEnvelope, faDonate, faSearch } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';

import { BreadcrumbInterface } from '../../types/BreadcrumbInterface';

import logo from '../../../images/common/brand-transparent.png';
import '../../../styles/modules/Omnibar.scss';

interface IProps {
  breadcrumbs?: BreadcrumbInterface[];
}

export default class Omnibar extends Component<IProps> {
  render() {
    return (
      <Navbar className="Omnibar" variant="dark" fixed="top" expand>
        
        <Navbar.Brand href="#home">
          <span className="brand-logo">
            <img 
              alt="PokéCommunity"
              src={logo} 
              className="brandimage-selectable" 
              title="PokéCommunity" 
            />
          </span>

          <When condition={typeof this.props.breadcrumbs === 'undefined'}>
            <span className="brand-text d-none d-sm-inline app-title">
              PokéCommunity
            </span>
          </When>
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          {this.props.breadcrumbs && this.getBreadcrumbs()}
          <Nav className="navbar-user-tools">
            <Dropdown id="help-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="help-menu-toggle" as={Nav.Link}><FontAwesomeIcon icon={faQuestionCircle} size="lg" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown id="supporters-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="supporters-menu-toggle" as={Nav.Link}><FontAwesomeIcon icon={faDonate} size="lg" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown id="admin-tools-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="admin-tools-menu-toggle" as={Nav.Link}><FontAwesomeIcon icon={faToolbox} size="lg" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown id="search-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="search-menu-toggle" as={Nav.Link}><FontAwesomeIcon icon={faSearch} size="lg" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown id="messages-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="messages-menu-toggle" as={Nav.Link}><FontAwesomeIcon icon={faEnvelope} size="lg" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown id="notifications-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="notifications-menu-toggle" as={Nav.Link}><FontAwesomeIcon icon={faBell} size="lg" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown id="user-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="user-menu-toggle" as={Nav.Link}><FontAwesomeIcon icon={faUser} size="lg" /></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  getBreadcrumbs() {
    const crumbs = this.props.breadcrumbs.map(({ name, path }) => {
      /* if the link includes a php extension, then
         this is a link to a vB page and we use <a href>
         otherwise, <Link to>
      */

      let link;
      if (path.includes('.php')) {
        link = <a href={path} className="nav-link">{name}</a>
      } else {
        link = <Link to={path} className="nav-link">{name}</Link>
      }

      return (
        <li key={name} className="nav-item">
          {link}
        </li>
      );
    });

    return (
      // TODO bs component?
      <ul className="navbar-nav nav-breadcrumb mr-auto">
        {crumbs}
      </ul>
    )
  }
}
