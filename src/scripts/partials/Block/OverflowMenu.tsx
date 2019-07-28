import React from 'react';
import Icon, { IconProps } from '../Icon';
import { Link } from 'react-router-dom';

export interface MenuItem {
  name: string;
  icon: string | IconProps;
  link?: string;
  className?: string;

  onClick?: () => void;
}

export interface Divider {
  divider: number;
}

export type MenuItemOrDivider = MenuItem | Divider;

interface IProps {
  active: boolean;
  items: MenuItemOrDivider[];
}

const OverflowMenuItem = ({ item }: { item: MenuItemOrDivider }) => {
  if ('divider' in item) {
    return (
      <li 
        key={`divider-${item.divider}`} 
        className="divider" 
      />
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
      key={item.name}
      className={`overflow-menu-item ${item.className}`} 
      onClick={item.onClick}
    >
      {content}
    </li>
  )
}

const OverflowMenu = ({ active, items }: IProps) => (
  <ul className={`BlockOverflowMenu ${active && 'active'}`}>
    {items.map(item => (
      <OverflowMenuItem item={item} key={JSON.stringify(item)} />
    ))}  
  </ul>
);

export default OverflowMenu;