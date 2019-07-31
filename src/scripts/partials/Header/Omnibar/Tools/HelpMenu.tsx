import React, { Component } from 'react';
import { Dropdown, NavItem, Nav } from 'react-bootstrap';

import Icon from '../../../Icon';
import SmartLink from '../../../SmartLink';

export default class HelpMenu extends Component {
  render() {
    return (
      <Dropdown 
        alignRight 
        as={NavItem}
        className="HelpMenu"
        id="help-menu" 
      >
        <Dropdown.Toggle id="help-menu-toggle" as={Nav.Link}>
          <Icon name="question-circle" group="fal" size="lg" fw />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item {...SmartLink.shim('/forumdisplay.php?fn=support')}>
            Feedback & Support
          </Dropdown.Item>

          <Dropdown.Item {...SmartLink.shim('/forumdisplay.php?fn=support')}>
            Feedback & Support
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
