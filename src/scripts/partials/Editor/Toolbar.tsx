import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faEyeSlash } from '@fortawesome/pro-solid-svg-icons';

function insertSubstring(string: string, substring: string, index: number) {
  let contentBefore = string.slice(0, index);
  let contentAfter = string.slice(index);
  
  return contentBefore + substring + contentAfter;
}

export const ToolbarOptions = {
  basicGroup: [
    {
      title: 'Bold',
      icon: faBold,
      tag: 'b',
    },

    {
      title: 'Italic',
      icon: faItalic,
      tag: 'i',
    },
  ],

  mediaGroup: [
    {
      title: 'Spoiler',
      icon: faEyeSlash,
      tag: 'spoiler',
    }
  ]
}

interface IProps {
  content: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  setContent: (content: string, callback?: () => void) => void;
}

export default class Toolbar extends Component<IProps> {
  render() {
    const toolbarButtons = Object.keys(ToolbarOptions).map(groupName => {
      const group = ToolbarOptions[groupName];

      const groupButtons = group.map(button => (
        <button 
          key={button.title} 
          title={button.title}
          onClick={() => this.insertTag(button.tag)} 
        >
          <FontAwesomeIcon icon={button.icon} />
        </button>
      ));

      return (
        <div key={groupName} className={`tool-group group-${groupName}`}>
          {groupButtons}
        </div>
      );
    });

    return (
      <div className="Toolbar" onClick={this.onClick}>
        {toolbarButtons}
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
    const { selectionStart, selectionEnd } = textarea;

    let { content } = this.props;

    const openTag = `[${tag}]`;
    const closeTag = `[/${tag}]`;

    content = insertSubstring(content, openTag, selectionStart);
    content = insertSubstring(content, closeTag, selectionEnd + openTag.length);

    this.props.setContent(content, () => {
      textarea.focus();
      textarea.selectionStart = selectionStart + openTag.length;
      textarea.selectionEnd = selectionEnd + openTag.length;
    });

  }
}

