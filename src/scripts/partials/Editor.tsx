import React, { Component } from 'react';
import getCaretCoordinates from 'textarea-caret';

import Toolbar from './Editor/Toolbar';
import { insertTagInTextarea } from '../helpers/Editor/toolbarUtils';

import '../../styles/modules/Editor.scss';



interface IProps {
  content: string;
  setContent: (content: string, callback?: () => void) => void;
}

interface IState {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  ContextMenuComponent?: typeof Component | React.FC;
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
          insertTag={this.insertTag}
          setContextMenu={this.setContextMenu}
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
        this.insertText('  ');
        break;
      

      // case 50: /* @ */
      //   this.setState({ ContextMenuComponent: MentionsMenu });
      //   break;
    }
  }

  insertText = (text: string) => {
    this.state.textareaRef.current.focus();
    document.execCommand('insertText', false, text);
  }

  insertTag = (tag: string, tagValue?: string) => {
    const textarea = this.state.textareaRef.current;
    const { content } = this.props;

    insertTagInTextarea({ textarea, content, tag, tagValue });
  }

  setContextMenu = (ContextMenuComponent: typeof Component) => {
    this.setState({ ContextMenuComponent });
  }

  closeContextMenu = () => {
    this.setState({ ContextMenuComponent: null });
  }

  getContextMenu() {
    const { ContextMenuComponent } = this.state;
    if (!ContextMenuComponent) {
      return null;
    }

    const textarea = this.state.textareaRef.current;
    const cursorPos = getCaretCoordinates(textarea, textarea.selectionEnd);

    return (
      <ContextMenuComponent
        cursorPos={cursorPos}
        insertText={this.insertText}
        insertTag={this.insertTag}
        closeContextMenu={this.closeContextMenu}
      />
    );
  }
}