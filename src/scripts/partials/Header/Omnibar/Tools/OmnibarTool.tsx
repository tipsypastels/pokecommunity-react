import React, { ReactNode } from 'react'
import { Dropdown, NavItem, Nav } from 'react-bootstrap';
import Icon from '../../../Icon';
import { camelCase, kebabCase } from '../../../../helpers/StringHelpers';

interface IProps {
  name: string;
  icon: string;
  children: ReactNode;
}

export default function OmnibarTool(props: IProps) {
  const className = camelCase(props.name);
  const id = kebabCase(props.name);
  
  return (
    <Dropdown
      alignRight
      as={NavItem}
      className={className}
      id={id}
    >
      <Dropdown.Toggle id={`${id}-toggle`} as={Nav.Link}>
        <Icon name={props.icon} group="fal" size="lg" fw />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.children}
      </Dropdown.Menu>
    </Dropdown>
  )
}
