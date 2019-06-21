import React from 'react';
import { BlockProps } from "../Block";

interface HeaderProps extends BlockProps {
  noBorderBottom?: boolean;
  noPadding?: boolean;
}

const Header = (props: HeaderProps) => (
  <header className={
    `BlockHeader ${props.className || ''} ${props.noBorderBottom ? 'no-border-bottom' : ''} ${props.noPadding ? 'no-padding' : ''}`
  }>
    {props.children}
  </header>
);

export default Header;