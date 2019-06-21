import React, { ReactNode } from 'react';
import Icon, { IconProps } from '../Icon';
import { Link } from 'react-router-dom';

export interface MenuItem {
  name: string;
  icon: string | IconProps;
  link?: string;
  className?: string;

  onClick?: () => void;
}

export type MenuItemOrDivider = MenuItem | 'divider';

interface IProps {
  active: boolean;
  items: MenuItemOrDivider[];
}

const OverflowMenuItem = ({ item }: { item: MenuItemOrDivider }) => {
  if (item === 'divider') {
    return (
      <li className="divider" />
    );
  }

  let content = (
    <React.Fragment>
      <Icon.Maybe from={`${item.icon} fa-fw`} />

      <span className="menu-text">
        {item.name}
      </span>
    </React.Fragment>
  );

  if (item.link) {
    // TODO need to do the bs of checking if it's a vb link, etc
    content = (
      <Link to={item.link}>
        {content}
      </Link>
    );
  }

  return (
    <li 
      className={`overflow-menu-item ${item.className}`} 
      onClick={item.onClick}
    >
      {content}
    </li>
  )
}

const OverflowMenu = ({ active, items }: IProps) => (
  <ul className={`BlockOverflowMenu ${active && 'active'}`}>
    {items.map(item => <OverflowMenuItem item={item} />)}  
  </ul>
);

export default OverflowMenu;