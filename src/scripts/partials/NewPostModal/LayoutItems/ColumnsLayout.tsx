import React, { Component } from 'react';
import { Modal, Col, Row } from 'react-bootstrap';

import { LayoutItemProps } from '../LayoutContainer';
import Editor from '../../Editor';
import Preview from '../../Editor/Preview';

export default class ColumnsLayout extends Component<LayoutItemProps> {
  render() {
    const { content, setContent } = this.props;

    return (
      <Modal.Body>
        <Row>
          <Col sm={6}>
            <Editor
              content={content}
              setContent={setContent}
            />
          </Col>

          <Col sm={6}>
            <Preview content={content} />
          </Col>
        </Row>
      </Modal.Body>
    )
  }
}
