import React, { Component, ReactNode } from 'react';
import { Dropdown } from 'react-bootstrap';

import Icon from '../Icon';
import StaffPostOptions from './StaffPostOptions';
import { ContextMenuOptions } from './ContextMenu';

// TODO move this somewhere else
const AVAILABLE_FONTS = [
  'Noto Sans',
];

const AVAILABLE_SIZES = '1 2 3 4 5 6 7'.split(' ');

interface IProps {
  content: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  setContent: (content: string, callback?: () => void) => void;
  insertTag: (tag: string, tagValue?: string) => void;
  setContextMenu: (contextMenu: ContextMenuOptions) => void;
}

export default class Toolbar extends Component<IProps> {
  render() {
    const tag = (value: string) => () => this.props.insertTag(value);  

    return (
      <div className="Toolbar" onClick={this.forgivinglySelectTextarea}>
        <div className="tool-group d-none d-md-block">
          <Dropdown>
            <Dropdown.Toggle id="font-dropdown">
              Font             
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.getFonts()}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle id="size-dropdown">
              Size
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.getSizes()}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="tool-group">
          <button title="Make text bold" onClick={tag('b')}>
            <Icon name="bold" />
          </button>

          <button title="Make text italic" onClick={tag('i')}>
            <Icon name="italic" />
          </button>

          <button title="Make text crossed out" onClick={tag('s')}>
            <Icon name="strikethrough" />
          </button>
        </div>

        <div className="tool-group d-none d-md-block">
          <button title="Align text left" onClick={tag('left')}>
            <Icon name="align-left" />
          </button>
          <button title="Center text" onClick={tag('center')}>
            <Icon name="align-center" />
          </button>
          <button title="Align text right" onClick={tag('right')}>
            <Icon name="align-left" />
          </button>
          <button title="Justify text" onClick={tag('justify')}>
            <Icon name="align-justify" />
          </button>
        </div>

        <div className="tool-group">
          <button title="Insert a link" onClick={() => this.props.setContextMenu('links')}>
            <Icon name="link" />
          </button>
          <button title="Insert an image" onClick={() => this.props.setContextMenu('images')}>
            <Icon name="image" />
          </button>
          <button title="Insert a quote" onClick={tag('quote')}>
            <Icon name="quote-left" />
          </button>
          <button title="Wrap text in a spoiler" onClick={tag('spoiler')}>
            <Icon name="eye-slash" />
          </button>
        </div>

        <div className="flex-grows" />

        <div className="tool-group">
          <StaffPostOptions />
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

  getFonts(): ReactNode {
    return this.mapOptionsToDropdown('font', AVAILABLE_FONTS);
  }

  getSizes(): ReactNode {
    return this.mapOptionsToDropdown('size', AVAILABLE_SIZES);
  }

  mapOptionsToDropdown = (tag: string, options: string[]): ReactNode => (
    <React.Fragment>
      {options.map(option => (
        <Dropdown.Item key={option} onClick={() => this.props.insertTag(tag, option)}>
          {option}
        </Dropdown.Item>
      ))}
    </React.Fragment>
  )
}

