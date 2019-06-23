import React, { Component, ReactNode } from 'react';
import { Dropdown } from 'react-bootstrap';

import Icon from '../Icon';

import { insertTagInTextarea } from '../../helpers/Editor/toolbarUtils';

// TODO move this somewhere else
const AVAILABLE_FONTS = [
  'Noto Sans',
];

interface IProps {
  content: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  setContent: (content: string, callback?: () => void) => void;
}

export default class Toolbar extends Component<IProps> {
  render() {
    return (
      <div className="Toolbar" onClick={this.forgivinglySelectTextarea}>
        <div className="tool-group">
          <button title="Make text bold" onClick={() => this.insertTag('b')}>
            <Icon name="bold" />
          </button>

          <button title="Make text italic" onClick={() => this.insertTag('i')}>
            <Icon name="italic" />
          </button>

          <button title="Make text crossed out" onClick={() => this.insertTag('s')}>
            <Icon name="strikethrough" />
          </button>
        </div>

        {/*<div className="tool-group">
          <Dropdown>
            <Dropdown.Toggle id="font-dropdown">
              Font             
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.getFonts()}
            </Dropdown.Menu>
          </Dropdown>
        </div>*/}

        <div className="tool-group">
          <button title="Wrap text in a spoiler" onClick={() => this.insertTag('spoiler')}>
            <Icon name="eye-slash" />
          </button>
        </div>
      </div>
    );
  }

  forgivinglySelectTextarea = (e) => {
    if (e.target.tagName === 'button') {
      return;
    }

    this.props.textareaRef.current.focus();
  }

  insertTag = (tag: string, tagValue?: string) => {
    const textarea = this.props.textareaRef.current;
    const { content } = this.props;
    
    insertTagInTextarea({ textarea, content, tag, tagValue });
  }

  getFonts(): ReactNode {
    return this.mapOptionsToDropdown('font', AVAILABLE_FONTS);
  }

  mapOptionsToDropdown = (tag: string, options: string[]): ReactNode => (
    <React.Fragment>
      {options.map(option => (
        <Dropdown.Item key={option} onClick={() => this.insertTag(tag, option)}>
          {option}
        </Dropdown.Item>
      ))}
    </React.Fragment>
  )
}

