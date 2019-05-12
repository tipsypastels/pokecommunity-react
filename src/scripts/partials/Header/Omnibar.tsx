import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/pro-solid-svg-icons';
import { Link } from 'react-router-dom';

import { PaginationInterface } from '../../types/PaginationInterface';

import logo from '../../../images/common/brand-transparent.png';
import '../../../styles/modules/Omnibar.scss';

interface IProps {
  pagination?: PaginationInterface[];
}

export default class Omnibar extends Component<IProps> {
  render() {
    return (
      <Navbar className="Omnibar" bg="light">
        <Navbar.Brand href="#home">
          <span className="brand-logo">
            <img 
              alt="PokéCommunity"
              src={logo} 
              className="brandimage-selectable" 
              title="PokéCommunity" 
            />
          </span>
        </Navbar.Brand>

        {this.props.pagination && this.getPagination()}

        <Navbar id="basic-navbar-nav">
          <Nav className="navbar-breadcrumb mr-auto">
            
          </Nav>
          <Nav className="navbar-user-tools">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Hello</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      </Navbar>
    );
  }

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
      <ul className="navbar navbar-nav nav-breadcrumb">
        {paginationItems}
      </ul>
    )
  }
}
