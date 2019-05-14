import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown, NavItem } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faUser, faBell, faQuestionCircle, faEnvelope, faDonate, faSearch } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';

import { PaginationInterface } from '../../types/PaginationInterface';
import { IfPropsPresent } from '../../helpers/ComponentHelpers';

import logo from '../../../images/common/brand-transparent.png';
import '../../../styles/modules/Omnibar.scss';

interface IProps {
  pagination?: PaginationInterface[];
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
          <span className="brand-text d-none d-sm-inline app-title">
            PokéCommunity
          </span>
        </Navbar.Brand>

        

        <Navbar.Collapse id="basic-navbar-nav">
          {this.getPagination()}
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

  @IfPropsPresent('pagination')
  getPagination() {
    const paginationItems = this.props.pagination.map(({ name, path }) => (
      <li key={name} className="nav-item">
        <Link to={path} className="nav-link">
          {name}
        </Link>
      </li>
    ));

    return (
      // TODO bs component?
      <ol className="navbar-nav nav-breadcrumb mr-auto">
        {paginationItems}
      </ol>
    )
  }
}
