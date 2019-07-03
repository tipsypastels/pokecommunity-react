import React, { Component } from 'react';
import getCaretCoordinates from 'textarea-caret';

import Toolbar from './Editor/Toolbar';
import { insertTagInTextarea } from '../helpers/Editor/toolbarUtils';
import { ContextMenuOptions } from './Editor/ContextMenu';

import '../../styles/modules/Editor.scss';
import LinksMenu from './Editor/ContextMenu/LinksMenu';
import ImagesMenu from './Editor/ContextMenu/ImagesMenu';
import MentionsMenu from './Editor/ContextMenu/MentionsMenu';

interface IProps {
  content: string;
  setContent: (content: string, callback?: () => void) => void;
}

interface IState {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  contextMenu: ContextMenuOptions;
}

export default class Editor extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      textareaRef: React.createRef<HTMLTextAreaElement>(),
      contextMenu: null,
    };
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    // if the user JUST started typing a mention this update, start the mentions menu
    if (this.typingMention() && prevState.contextMenu !== 'mentions') {
      this.setState({ contextMenu: 'mentions' });
      return;
    }
    
    // vice versa, if they just stopped this update, close the menu
    if (!this.typingMention() && prevState.contextMenu === 'mentions') {
      this.setState({ contextMenu: null });
    }
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
          onDoubleClick={this.closeContextMenu}
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

  setContextMenu = (contextMenu: ContextMenuOptions) => {
    this.setState({ contextMenu });
  }

  closeContextMenu = () => {
    this.setState({ contextMenu: null });
  }

  getContextMenu() {
    const { contextMenu } = this.state;
    if (!contextMenu) {
      return null;
    }

    const textarea = this.state.textareaRef.current;
    const cursorPos = getCaretCoordinates(textarea, textarea.selectionEnd);

    const contextProps = { 
      cursorPos,
      closeContextMenu: this.closeContextMenu,
    }

    switch(contextMenu) {
      case 'links':
        return (
          <LinksMenu
            {...contextProps}
            onSubmit={content => {
              this.insertTag('url', content);
            }}
          />
        );
      case 'images':
        return (
          <ImagesMenu
            {...contextProps}
            onSubmit={content => {
              this.insertTag('img');
              this.insertText(content);
            }}
          />
        );
      case 'mentions':
        return (
          <MentionsMenu
            cursorPos={cursorPos}
          />
        );
    }
  }

  /**
   * @name getCurrentWord
   * @description Gets the current word being typed or selected in the textbox by iterating forward and back until a space is encountered.
   */
  getCurrentWord(): string | null {
    const textarea = this.state.textareaRef.current;

    // playin it safe
    if (!textarea) {
      return null;
    }

    const { value, selectionStart, selectionEnd } = textarea;

    // if the textarea is unfocused, there is no current word
    if (typeof selectionStart === 'undefined' || typeof selectionEnd === 'undefined') {
      return null;
    }

    // if a selection is being made, it is not possible to consistently determine a "current word" as the selection area can encompass multiple words. it's probably fine to just disable it in this case
    if (selectionStart !== selectionEnd) {
      return null;
    }

    let word = value.substring(selectionStart, selectionEnd);

    // loop back
    for (let i = selectionStart; i >= 0; i--) {
      const char = value.charAt(i);
      if (char.match(/\s/)) {
        break;
      }

      word = `${char}${word}`;
    }

    // loop forwards
    for (let i = selectionEnd + 1; i < value.length; i++) {
      const char = value.charAt(i);
      if (char.match(/\s/)) {
        break;
      }

      word += char;
    }

    return word;
  }

  typingMention(): boolean {
    const currentWord = this.getCurrentWord();
    return currentWord !== null 
      && !!currentWord.match(/^@\S*$/); 
  }
}