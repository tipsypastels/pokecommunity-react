import React, { Component } from 'react';
import { Dropdown, NavItem, Nav } from 'react-bootstrap';

import Icon from '../../../Icon';
import SmartLink from '../../../SmartLink';

export default class SupporterMenu extends Component {
  render() {
    return (
      <Dropdown
        alignRight 
        as={NavItem}
        className="SupporterMenu"
        id="supporters-menu" 
      >
        <Dropdown.Toggle id="supporters-menu-toggle" as={Nav.Link}>
          <Icon name="donate" group="fal" size="lg" fw />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Header>
            <Icon name="donate" group="fal" />

            <div className="donation-text">
              <h2>
                Donate to the PokéCommunity
              </h2>

              <small>
                Support the PokéCommunity’s running costs with a small monetary donation. You can even get a few cool things by doing so.
              </small>
            </div>
          </Dropdown.Header>

          <Dropdown.Item {...SmartLink.shim('/donations')}>
            Learn more...
          </Dropdown.Item>

          <Dropdown.Item {...SmartLink.shim('/donations/donate')}>
            Donate now
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
