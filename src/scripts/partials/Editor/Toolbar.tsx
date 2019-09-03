import React, { Component, ReactNode } from 'react';
import { Dropdown } from 'react-bootstrap';

import Icon from '../Icon';
import { ContextMenuOptions } from './ContextMenu';
import TextareaTransformer from '../../helpers/Editor/TextareaTransformer';

import { editorFontSizes, editorFontOptions } from '../../../configs/config.json';

interface IProps {
  transformer: TextareaTransformer;
  setContextMenu: (contextMenu: ContextMenuOptions) => void;
}

export default class Toolbar extends Component<IProps> {
  render() {
    const tag = (value: string) => () => {
      this.props.transformer.insertTag(value);  
    }

    return (
      <div className="Toolbar" onClick={this.forgivinglySelectTextarea}>
        <div className="tool-group d-none d-md-block">
          <Dropdown>
            <Dropdown.Toggle id="font-dropdown">
              Font             
            </Dropdown.Toggle>

            <Dropdown.Menu className="font-dropdown-menu">
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
      </div>
    );
  }

  forgivinglySelectTextarea = (e) => {
    if (e.target.tagName === 'button') {
      return;
    }

    this.props.transformer.focus()
  }

  getFonts(): ReactNode {
    return this.mapOptionsToDropdown('font', editorFontOptions);
  }

  getSizes(): ReactNode {
    return this.mapOptionsToDropdown('size', editorFontSizes.split(' '));
  }

  mapOptionsToDropdown = (tag: string, options: string[]): ReactNode => (
    <React.Fragment>
      {options.map(option => (
        <Dropdown.Item key={option} onClick={() => this.props.transformer.insertTag(tag, option)}>
          {option}
        </Dropdown.Item>
      ))}
    </React.Fragment>
  )
}

