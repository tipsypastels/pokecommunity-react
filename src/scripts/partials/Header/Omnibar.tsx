import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { When } from 'react-if';
import { Link } from 'react-router-dom';

import { SearchScopeProps } from './Omnibar/Tools/SearchPrompt';
import { BreadcrumbInterface } from '../../types/BreadcrumbInterface';
import Icon from '../Icon';

import AppContext from '../../AppContext';
import OmnibarTools from './Omnibar/OmnibarTools';

import logo from '../../../images/common/brand-transparent.png';
import SmartLink from '../SmartLink';

interface IProps extends SearchScopeProps {
  breadcrumbs?: BreadcrumbInterface[];
}

export default class Omnibar extends Component<IProps> {
  static contextType = AppContext;

  render() {
    return (
      <Navbar className="Omnibar" variant="dark" fixed="top" expand>
        <Navbar.Brand as={Link} to="/">
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

          <OmnibarTools searchScope={this.props.searchScope} />
        </Navbar.Collapse>
      </Navbar>
    );
  }

  getBreadcrumbs() {
    const crumbs = this.props.breadcrumbs.map(({ name, path }) => (
      <li key={name} className="nav-item">
        <SmartLink to={path} className="nav-link">
          <Icon name="chevron-left" group="far" size="lg" />
            {name}
        </SmartLink>
      </li>
    ));

    return (
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
