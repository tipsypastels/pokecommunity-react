import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';

import Editor from './Editor';
import Preview from './Editor/Preview';

import ThreadInterface from '../types/ThreadInterface';

import '../../styles/modules/NewPostModal.scss';

// TODO allow this to be nil or work in other contexts
// like creating new thread, all that stuff

interface IProps {
  thread: ThreadInterface;
  show: boolean;
  closeModal: () => void;
}

interface IState {
  content: string;
}

export default class NewPostModal extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }
  }

  render() {
    let preview = null;

    if (!this.state.content.match(/^\s*$/)) {
      preview = (
        <Modal.Footer>
          <Preview content={this.state.content} />
        </Modal.Footer>
      );
    }

    return (
      <Modal dialogClassName="NewPostModal" show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header className="flex">
          <Modal.Title className="flex-grows">
            Reply to "{this.props.thread.title}"
          </Modal.Title>

          <Button variant="primary" disabled={!this.canSubmitPost()}>
            Submit Post
          </Button>
        </Modal.Header>

        <Modal.Body>
          <Editor 
            content={this.state.content}
            setContent={this.setContent}
          />
        </Modal.Body>

        {preview}
      </Modal>
    )
  }

  setContent = (content: string, callback?: () => void) => {
    this.setState({ content }, callback);
  }

  canSubmitPost() {
    return this.state.content.length > 0;
  }
}
