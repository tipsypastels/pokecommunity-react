import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap';

import Icon from '../Icon';
import { EditorLayout } from '../NewPostModal';

interface IProps {
  layout: EditorLayout,
  setLayoutCallback: (EditorLayout) => () => void;
}

export default class LayoutSwitcher extends Component<IProps> {
  render() {
    const { layout, setLayoutCallback } = this.props;

    return (
      <Dropdown>
        <Dropdown.Toggle variant="link" id="layout-dropdown">
          <Icon name="cog" />
        </Dropdown.Toggle>

        <Dropdown.Menu alignRight>
          <Dropdown.Item 
            active={layout === 'tabbed'} 
            onClick={setLayoutCallback('tabbed')}
          >
            <strong className="d-block">
              Tabbed Editor
            </strong>

            <span>
              Switch between writing and previewing.
            </span>
          </Dropdown.Item>

          <Dropdown.Item
            active={layout === 'columns'}
            onClick={setLayoutCallback('columns')}
          >
            <strong className="d-block">
              Columns Editor
            </strong>

            <span>
              Show the textbox and preview side by side.
            </span>
          </Dropdown.Item>

          <Dropdown.Item
            active={layout === 'rows'} 
            onClick={setLayoutCallback('rows')}
          >
            <strong className="d-block">
              Rows Editor
            </strong>

            <span>
              Show the preview below the textbox.
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
