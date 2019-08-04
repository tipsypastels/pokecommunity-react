import React, { Component } from 'react';
import { Modal, Tab, Nav } from 'react-bootstrap';

import Editor from '../../Editor';
import Preview from '../../Editor/Preview';
import { LayoutItemProps } from '../LayoutContainer';

export default class TabbedLayout extends Component<LayoutItemProps> {
  render() {
    const { content, setContent } = this.props;

    return (
      <Tab.Container id="tabbed-layout" defaultActiveKey="write">
        <Modal.Body>
          <Tab.Content>
            <Tab.Pane eventKey="write">
              <Editor
                content={content}
                setContent={setContent}
              />
            </Tab.Pane>

            <Tab.Pane eventKey="preview">
              <Preview content={content} />
            </Tab.Pane>
          </Tab.Content>
        </Modal.Body>

        <Modal.Footer>
          <Nav fill variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="write">
                Write
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link 
                eventKey="preview" 
                disabled={this.previewDisabled()}
              >
                Preview
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Footer>
      </Tab.Container>
    )
  }

  previewDisabled(): boolean {
    return this.props.content.match(/^\s*$/) !== null;
  }
}
