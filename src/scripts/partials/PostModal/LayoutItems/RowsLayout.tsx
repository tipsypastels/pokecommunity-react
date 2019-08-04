import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import { LayoutItemProps } from '../LayoutContainer';
import Editor from '../../Editor';
import Preview from '../../Editor/Preview';

export default class RowsLayout extends Component<LayoutItemProps> {
  render() {
    const { content, setContent } = this.props;

    return (
      <React.Fragment>
        <Modal.Body>
          <Editor
            content={content}
            setContent={setContent}
          />
        </Modal.Body>

        {this.getPreview()}
      </React.Fragment>
    );
  }

  getPreview() {
    if (this.previewDisabled()) {
      return null;
    }

    return (
      <Modal.Footer>
        <Preview content={this.props.content} />
      </Modal.Footer>
    );
  }

  previewDisabled(): boolean {
    return this.props.content.match(/^\s*$/) !== null;
  }
}
