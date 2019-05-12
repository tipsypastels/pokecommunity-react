import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';

import ThreadInterface from '../types/ThreadInterface';

// TODO allow this to be nil or work in other contexts
// like creating new thread, all that stuff
// support min post length on the client that disables the button
// if not met

interface IProps {
  thread: ThreadInterface;
  show: boolean;
  closeEditor: () => void;
}

interface IState {
  content: string;
}

export default class Editor extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeEditor}>
        <Modal.Header closeButton>
          <Modal.Title>
            Reply to {this.props.thread.title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <textarea 
            onChange={this.setContent}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" disabled={!this.canSubmitPost()}>
            Reply
          </Button>

          <Button variant="secondary" onClick={this.props.closeEditor}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  setContent = (e) => {
    this.setState({ content: e.target.value });
  }

  canSubmitPost() {
    return this.state.content.length > 0; // TODO get from api
  }
}
