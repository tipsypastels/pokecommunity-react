import React, { Component, CSSProperties, ReactNode } from 'react'
import Icon, { IconProps } from '../Icon';
import { Button } from 'react-bootstrap';

export type ContextMenuOptions = null | 'links' | 'images' | 'mentions';

export interface IProps {
  cursorPos: { left: number, top: number, height: number };
  children: ReactNode;
  className?: string;
  width?: number;
}

export default class ContextMenu extends Component<IProps> {
  static defaultProps = {
    width: 400,
  }

  render() {
    return (
      <div
        className={`editor-context-menu ${this.props.className}`}
        style={this.getStyle()}
      >
        {this.props.children}
      </div>
    );
  }

  getStyle(): CSSProperties {
    const { width } = this.props;
    const { cursorPos } = this.props;

    const bottom = cursorPos.top - cursorPos.height;
    const left = Math.max(0, cursorPos.left - (width / 2));

    const arrowOffset = Math.min(Math.max(25, cursorPos.left), width / 2) + 'px';

    return { width, bottom, left, '--arrow-offset': arrowOffset } as CSSProperties;
  }
}
