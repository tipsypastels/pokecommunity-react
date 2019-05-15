import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBold, 
  faItalic, 
  faEyeSlash,
} from '@fortawesome/pro-solid-svg-icons';

interface IProps {
  content: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  setContent: (content: string, callback?: () => void) => void;
}

export default class Toolbar extends Component<IProps> {
  render() {
    return (
      <div className="Toolbar" onClick={this.onClick}>
        <div className="tool-group">
          <button title="Make text bold" onClick={() => this.insertTag('b')}>
            <FontAwesomeIcon icon={faBold} />
          </button>

          <button title="Make text italic" onClick={() => this.insertTag('i')}>
            <FontAwesomeIcon icon={faItalic} />
          </button>
        </div>

        <div className="tool-group">
          <button title="Wrap text in a spoiler" onClick={() => this.insertTag('spoiler')}>
            <FontAwesomeIcon icon={faEyeSlash} />
          </button>
        </div>
      </div>
    );
  }

  // when the toolbar is clicked, select the textbox
  // unless a button was clicked
  onClick = (e) => {
    if (e.target.tagName === 'button') {
      return;
    }

    this.props.textareaRef.current.focus();
  }

  insertTag = (tag: string) => {
    const textarea = this.props.textareaRef.current;
    textarea.focus();

    const { selectionStart, selectionEnd } = textarea;

    let { content } = this.props;

    const openTag = `[${tag}]`;
    const closeTag = `[/${tag}]`;

    let selectedContent = content.slice(selectionStart, selectionEnd);
    let insertContent = openTag + selectedContent + closeTag;

    document.execCommand('insertText', false, insertContent);

    textarea.selectionStart -= closeTag.length + selectedContent.length;
    textarea.selectionEnd -= closeTag.length;
  }
}

