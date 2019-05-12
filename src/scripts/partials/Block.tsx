import React, { ReactNode, Component } from 'react'

import '../../styles/modules/Block.scss';

interface IProps {
  children: ReactNode;
  className?: string;
}

const Header = (props: IProps) => (
  <header className={`BlockHeader ${props.className || ''}`}>
    {props.children}
  </header>
);

const Content = (props: IProps) => (
  <div className={`BlockContent ${props.className || ''}`}>
    {props.children}
  </div>
); 

class Block extends Component<IProps> {
  // FIXME figure out a better way to use namespaced
  // components in TS
  static Header = Header;
  static Content = Content;

  render() {
    return (
      <section className={`Block ${this.props.className || ''}`}>
        {this.props.children}
      </section>
    );
  }
}

export default Block;