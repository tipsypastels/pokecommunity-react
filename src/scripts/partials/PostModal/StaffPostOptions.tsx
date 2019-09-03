import React, { Component, useContext } from 'react';

import AppContext from '../../AppContext';
import { Dropdown } from 'react-bootstrap';
import Icon from '../Icon';
import UsergroupInterface from '../../types/UsergroupInterface';

interface IProps {
  staffPostGroup: UsergroupInterface;
  setStaffPostGroup: (group: UsergroupInterface) => void;
}

export default function StaffPostOptions(props: IProps) {
  const { currentUser } = useContext(AppContext);

  if (!currentUser || !currentUser.usergroups || !currentUser.usergroups.length) {
    return null;
  }

  const staffGroups = currentUser.usergroups
    .filter(g => g.isStaff);

  if (!staffGroups.length) {
    return null;
  }

  return (
    <Dropdown className="StaffPostOptions">
      <Dropdown.Toggle variant="link" id="staff-post-options-dropdown">
        <Icon name="hammer-war" />
      </Dropdown.Toggle>

      <Dropdown.Menu alignRight>
        <Dropdown.Header className="lead">
          Post as...
        </Dropdown.Header>

        <Dropdown.Item active={props.staffPostGroup === null} onClick={() => props.setStaffPostGroup(null)}>
          <Icon name="user" mr={1} /> Member
        </Dropdown.Item>

        {staffGroups.map(group => (
          <Dropdown.Item 
            key={group.id}
            active={props.staffPostGroup && props.staffPostGroup.id === group.id}
            onClick={() => props.setStaffPostGroup(group)}
          >
            <strong style={{ color: group.color }}>
              {group.icon && <Icon.Dynamic from={group.icon} mr={1} />}
              {group.singularTitle}
            </strong>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  ) 
}