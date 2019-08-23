import React, { Component, CSSProperties, ReactNode } from 'react';

export type ContextMenuOptions = null | 'links' | 'images';

export interface IProps {
  cursorPos: { left: number, top: number, height: number };
  children: ReactNode;
  textareaHeight: number;
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
        id="editor-context-menu"
        className={`editor-context-menu ${this.props.className}`}
        style={this.getStyle()}
      >
        {this.props.children}
      </div>
    );
  }

  getStyle(): CSSProperties {
    const { width } = this.props;
    const { cursorPos, textareaHeight } = this.props;

    const bottom = textareaHeight - cursorPos.top - 40;
    const left = Math.max(0, cursorPos.left - (width / 2));

    const arrowOffset = Math.min(Math.max(25, cursorPos.left), width / 2) + 'px';

    return { width, bottom, left, '--arrow-offset': arrowOffset } as CSSProperties;
  }
}
