import React, { Component } from 'react';

import AppContext from '../../AppContext';
import { Dropdown } from 'react-bootstrap';

// TODO all of this

interface Props {

}

export default class StaffPostOptions extends Component {
  static contextType = AppContext;

  render() {
    const { currentUser } = this.context;
    if (!currentUser || !currentUser.usergroups.length) {
      return null;
    }

    return (
      <Dropdown>
        <Dropdown.Toggle id="staff-post-options">
        </Dropdown.Toggle>
      </Dropdown>
    )
  }
}
