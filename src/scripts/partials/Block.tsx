import React, { ReactNode, Component } from 'react'

import '../../styles/modules/Block.scss';

interface IProps {
  children: ReactNode;
  className?: string;
}

interface HeaderProps extends IProps {
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

const Content = (props: IProps) => (
  <div className={`BlockContent ${props.className || ''}`}>
    {props.children}
  </div>
);

const Footer = (props: IProps) => (
  <div className={`BlockFooter ${props.className || ''}`}>
    {props.children}
  </div>
)

interface ListContentProps {
  // children is NOT the list items, it's used
  // to add content above the list (like a title)
  children: ReactNode;
  className?: string;
  listItems: ReactNode[];
}

const ListContent = /* alternative to Content */ (props: ListContentProps) => (
  <div className={`BlockContent BlockListContent ${props.className || ''}`}>
    <div className="children">
      {props.children}
    </div>

    <ul>
      {props.listItems}
    </ul>
  </div>
);

class Block extends Component<IProps> {
  // FIXME figure out a better way to use namespaced
  // components in TS
  static Header = Header;
  static Content = Content;
  static ListContent = ListContent;
  static Footer = Footer;

  render() {
    return (
      <section className={`Block ${this.props.className || ''}`}>
        {this.props.children}
      </section>
    );
  }
}

export default Block;