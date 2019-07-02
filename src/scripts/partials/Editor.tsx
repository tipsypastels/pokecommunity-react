import React, { Component } from 'react'

import Toolbar from './Editor/Toolbar';
import MentionsMenu from './Editor/ContextMenus/MentionsMenu';

import '../../styles/modules/Editor.scss';

interface IProps {
  content: string;
  setContent: (content: string, callback?: () => void) => void;
}

interface IState {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  ContextMenuComponent?: typeof Component;
}

export default class Editor extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      textareaRef: React.createRef<HTMLTextAreaElement>(),
    };
  }

  render() {
    return (
      <div className="Editor">
        <Toolbar 
          content={this.props.content}
          setContent={this.props.setContent}
          textareaRef={this.state.textareaRef}
        />

        {this.getContextMenu()}

        <textarea 
          className="Content"
          defaultValue={this.props.content}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          ref={this.state.textareaRef}
        />
      </div>
    )
  }

  onChange = (e: any) => {
    e.preventDefault();

    this.props.setContent(e.target.value, () => {
      const textarea = this.state.textareaRef.current;
      // have to change it to inherit first so it can recalculate
      // otherwise it will never shrink
      textarea.style.height = 'inherit';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  }

  onKeyDown = (e: any) => {
    switch(e.keyCode) {
      case 9: /* tab */
        e.preventDefault();
        document.execCommand('insertText', false, '  ');
        break;
      

      case 50: /* @ */
        this.setState({ ContextMenuComponent: MentionsMenu });
        break;
    }
  }

  getContextMenu() {
    const { ContextMenuComponent } = this.state;
    if (!ContextMenuComponent) {
      return null;
    }

    return (
      <ContextMenuComponent

      />
    );
  }
}