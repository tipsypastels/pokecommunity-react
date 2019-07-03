import React, { Component, CSSProperties } from 'react'
import Icon, { IconProps } from '../Icon';
import { Button } from 'react-bootstrap';

export interface ContextMenuWrapperProps {
  cursorPos: { left: number, top: number };
  insertText: (text: string) => void;
  insertTag: (tag: string, tagValue?: string) => void;
  closeContextMenu: () => void;
}

export interface ContextMenuProps extends ContextMenuWrapperProps {
  tag: string;
  placeholder: string;
  icon: string | IconProps;
  className?: string;
  contentBecomes: 'value' | 'children';
}

interface IState {
  content: string;
  ref: React.RefObject<HTMLInputElement>;
}

export default class ContextMenu extends Component<ContextMenuProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      ref: React.createRef<HTMLInputElement>(),
    };
  }

  render() {
    return (
      <div
        className="LinksMenu editor-context-menu"
        style={this.getStyle()}
        onKeyDown={this.handleKeydown}
      >
        <input
          autoFocus
          className="form-control"
          type="text"
          placeholder={this.props.placeholder}
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
          ref={this.state.content}
        />

        <Button onClick={this.submit}>
          <Icon.Maybe from={this.props.icon} />
        </Button>
      </div>
    );
  }

  handleKeydown = (e) => {
    if (e.keyCode === 27 /* esc */) {
      e.preventDefault();
      e.stopPropagation();
      this.props.closeContextMenu();
    }

    if (e.keyCode === 13 /* enter */) {
      e.preventDefault();
      e.stopPropagation();
      this.submit();
    }
  }

  submit = () => {
    if (this.state.content) {
      if (this.props.contentBecomes === 'value') {
        this.props.insertTag(this.props.tag, this.state.content);
      } else {
        this.props.insertTag(this.props.tag);
        this.props.insertText(this.state.content);
      }
      this.props.closeContextMenu();
    }
  }

  getStyle(): CSSProperties {
    const menuWidth = 400;
    const { cursorPos } = this.props;

    const top = cursorPos.top - 37;
    const left = Math.max(0, cursorPos.left - (menuWidth / 2));

    const arrowOffset = Math.min(Math.max(25, cursorPos.left), menuWidth / 2) + 'px';

    return { top, left, '--arrow-offset': arrowOffset } as CSSProperties;
  }
}
