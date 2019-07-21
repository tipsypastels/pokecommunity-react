import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import ContextMenu from '../ContextMenu';
import Icon, { IconProps } from '../../Icon';

export interface ContextMenuWrapperProps {
  cursorPos: { left: number, top: number, height: number };
  closeContextMenu: () => void;
  onSubmit: (content: string) => boolean | void;
}

export interface ContextMenuProps extends ContextMenuWrapperProps {
  placeholder: string;
  icon: string | IconProps;
  className?: string;
}

interface IState {
  content: string;
  ref: React.RefObject<HTMLInputElement>;
}

export default class ContextMenuInput extends Component<ContextMenuProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      ref: React.createRef<HTMLInputElement>(),
    };
  }

  render() {
    return (
      <ContextMenu cursorPos={this.props.cursorPos}>
        <input
          autoFocus
          className="form-control"
          type="text"
          placeholder={this.props.placeholder}
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
          onKeyDown={this.handleKeydown}
          ref={this.state.content}
        />

        <Button onClick={this.submit}>
          <Icon.Maybe from={this.props.icon} />
        </Button>
      </ContextMenu>
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
      const result = this.props.onSubmit(this.state.content);
      if (result !== false) {
        this.props.closeContextMenu();
      }
    }
  }
}
