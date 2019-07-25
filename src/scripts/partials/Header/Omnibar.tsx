import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { When } from 'react-if';
import { Link } from 'react-router-dom';

import { BreadcrumbInterface } from '../../types/BreadcrumbInterface';
import Icon from '../Icon';

import AppContext from '../../AppContext';
import OmnibarTools from './Omnibar/OmnibarTools';

import logo from '../../../images/common/brand-transparent.png';
import '../../../styles/modules/Header/Omnibar.scss';

interface IProps {
  breadcrumbs?: BreadcrumbInterface[];
}

export default class Omnibar extends Component<IProps> {
  static contextType = AppContext;

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

          <div className="mr-auto" />

          <OmnibarTools />
          {/*
          <Nav className="navbar-user-tools">
            <Dropdown className={this.hideOmnibarItemIfCrumbs()} id="help-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="help-menu-toggle" as={Nav.Link}>
                <Icon name="question-circle" group="fal" size="lg" fw />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href={vBRoute('forums','support')} >Feedback & Support</Dropdown.Item>
                <Dropdown.Item href={vBRoute('rules')} >Feedback & Support</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className={this.hideOmnibarItemIfCrumbs()} id="supporters-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="supporters-menu-toggle" as={Nav.Link}>
                <Icon name="donate" group="fal" size="lg" fw />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className={this.hideOmnibarItemIfCrumbs()} id="admin-tools-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="admin-tools-menu-toggle" as={Nav.Link}>
                <Icon name="toolbox" group="fal" size="lg" fw />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown id="search-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="search-menu-toggle" as={Nav.Link}>
                <Icon name="search" group="fal" size="lg" fw />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown id="messages-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="messages-menu-toggle" as={Nav.Link}>
                <Icon name="envelope" group="fal" size="lg" fw />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown id="notifications-menu" alignRight as={NavItem}>
              <Dropdown.Toggle id="notifications-menu-toggle" as={Nav.Link}>
                <Icon name="bell" group="fal" size="lg" fw />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Hello there!</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            <GuestUserMenu />
          </Nav>*/}

          
        </Navbar.Collapse>
      </Navbar>
    );
  }

  getBreadcrumbs() {
    const crumbs = this.props.breadcrumbs.map(({ name, path, vb }) => {
      /* if the link includes a php extension, then
         this is a link to a vB page and we use <a href>
         otherwise, <Link to>
      */

      let link;
      if (vb) {
        link = <a href={path} className="nav-link">
         <Icon name="chevron-left" group="far" size="lg" />
           {name}
        </a>
      } else {
        link = <Link to={path} className="nav-link">
          <Icon name="chevron-left" group="far" size="lg" />
           &nbsp;{name}
        </Link>
      }

      return (
        <li key={name} className="nav-item">
          {link}
        </li>
      );
    });

    return (
      // TODO bs component?
      <ul className="navbar-nav navbar-breadcrumb">
        {crumbs}
      </ul>
    )
  }

  /* add this into the className field of any <Dropdown /> fields that
   * should hide on mobile. we hide 3 items if a breadcrumb is present,
   * but otherwise we should be able to fit all items even on mobile
   */
  hideOmnibarItemIfCrumbs() {
    const { breadcrumbs } = this.props;
    if (breadcrumbs && breadcrumbs.length > 0) {
      return 'd-none d-md-flex';
    }
    return '';
  }
}
