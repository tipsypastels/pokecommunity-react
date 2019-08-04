import React, { Component } from 'react';
import getCaretCoordinates from 'textarea-caret';

import Toolbar from './Editor/Toolbar';
import { insertTagInTextarea } from '../helpers/Editor/toolbarUtils';
import { ContextMenuOptions } from './Editor/ContextMenu';

import LinksMenu from './Editor/ContextMenu/LinksMenu';
import ImagesMenu from './Editor/ContextMenu/ImagesMenu';
import MentionsMenu from './Editor/ContextMenu/MentionsMenu';
import { currentWord } from '../helpers/Editor/currentWord';

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

  // componentDidUpdate(prevProps: IProps, prevState: IState) {
  //   // if the user JUST started typing a mention this update, start the mentions menu
  //   if (this.typingMention() && prevState.contextMenu !== 'mentions') {
  //     this.setState({ contextMenu: 'mentions' });
  //     return;
  //   }
    
  //   // vice versa, if they just stopped this update, close the menu
  //   if (!this.typingMention() && prevState.contextMenu === 'mentions') {
  //     this.setState({ contextMenu: null });
  //   }
  // }

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
          value={this.props.content}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          onClick={this.onClick}
          onDoubleClick={this.closeContextMenu}
          ref={this.state.textareaRef}
        />
      </div>
    )
  }

  onChange = (e: any) => {
    e.preventDefault();

    this.props.setContent(e.target.value, () => {
      const textarea = this.getTextarea();
      // have to change it to inherit first so it can recalculate
      // otherwise it will never shrink
      textarea.style.height = 'inherit';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  }

  onKeyUp = (e: any) => {
    if ([37, 38, 39, 40].includes(e.keyCode) /* arrow keys */) {
      // using forceupdate isn't the nicest, but we want the context menu arrow to move with the cursor always, and storing the cursor position in state would lead to duplication and possible desyncs (for example, when selecting with the mouse). in the end it's just easier to force an update for the arrow keys
      this.forceUpdate();
    }

    if (e.keyCode === 9 /* tab */) {
      e.preventDefault();
      this.insertText('  ');
    }
  }

  onClick = () => {
    // see the reasoning on using forceUpdate ^ in onKeyUp
    this.forceUpdate();
  }

  insertText = (text: string) => {
    this.getTextarea().focus();
    document.execCommand('insertText', false, text);
  }

  insertTag = (tag: string, tagValue?: string) => {
    const textarea = this.getTextarea();
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
    const textarea = this.getTextarea();

    if (!textarea) {
      return null;
    }

    const cursorPos = getCaretCoordinates(textarea, textarea.selectionEnd);

    // the mentions menu is a context menu but not caused by a state value, instead it's computed on the spot using typingMention() rather than duplicating the value into state
    if (this.typingMention()) {
      return (
        <MentionsMenu
          cursorPos={cursorPos}
          insertText={this.insertText}
          currentWord={this.getCurrentWord()}
        />
      );
    }

    const { contextMenu } = this.state;
    if (!contextMenu) {
      return null;
    }

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
    }
  }

  /**
   * @name getCurrentWord
   * @description Gets the current word being typed or selected in the textbox by iterating forward and back until a space is encountered.
   */
  getCurrentWord(): string | null {
    const textarea = this.getTextarea();

    // playin it safe
    if (!textarea) {
      return null;
    }

    const { value, selectionStart, selectionEnd } = textarea;
    return currentWord(value, selectionStart, selectionEnd);    
  }

  typingMention(): boolean {
    const currentWord = this.getCurrentWord();
    return currentWord !== null 
      && !!currentWord.match(/^@\S*$/); 
  }

  getTextarea(): HTMLTextAreaElement {
    return this.state.textareaRef.current;
  }
}