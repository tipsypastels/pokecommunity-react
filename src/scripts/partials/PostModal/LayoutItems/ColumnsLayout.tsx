import React, { Component } from 'react';
import { Modal, Col, Row } from 'react-bootstrap';

import { LayoutItemProps } from '../LayoutContainer';
import Editor from '../../Editor';
import Preview from '../../Editor/Preview';

export default class ColumnsLayout extends Component<LayoutItemProps> {
  render() {
    const { content, setContent, setMentions, staffPostGroup } = this.props;

    return (
      <Modal.Body className="ColumnsLayout">
        <Row>
          <Col sm={6} className="col-editor">
            <Editor
              content={content}
              setContent={setContent}
            />
          </Col>

          <Col sm={6}>
            <Preview
              content={content}
              setMentions={setMentions}
              staffPostGroup={staffPostGroup}
            />
          </Col>
        </Row>
      </Modal.Body>
    )
  }
}
