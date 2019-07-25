import React, { ReactNode, Component } from 'react'

import OverflowMenu from './Block/OverflowMenu';
import Header from './Block/Header';
import Content from './Block/Content';
import ListContent from './Block/ListContent';
import Footer from './Block/Footer';

import '../../styles/modules/Block.scss';

export interface BlockProps {
  children: ReactNode;
  className?: string;
  onClick?: (any) => void;
}

class Block extends Component<BlockProps> {
  static OverflowMenu = OverflowMenu;
  static Header = Header;
  static Content = Content;
  static ListContent = ListContent;
  static Footer = Footer;

  render() {
    return (
      <section 
        className={`Block ${this.props.className || ''}`}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </section>
    );
  }
}

export default Block;