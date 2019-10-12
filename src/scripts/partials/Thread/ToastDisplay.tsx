import React, { Component } from 'react'
import Toast from 'react-bootstrap/Toast';

interface IProps {
  selectedPostsCount: number;
  closeToast: () => void;
  displayToast: boolean;
}

export default class ToastDisplay extends Component<IProps> {
  render() {
    return (
      <div className="ToastDisplay">
        {this.showToast()}
      </div>
    )
  }

  showToast() {
    if (this.props.selectedPostsCount > 0) {
      const pluralize1 = (this.props.selectedPostsCount > 1) ? "s" : ""
      const pluralize2 = (this.props.selectedPostsCount > 1) ? "them" : "it"
      return (
        <div>
          <Toast onClose={this.props.closeToast} show={this.props.displayToast} delay={4000} autohide>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
              <strong className="mr-auto">Selected Posts</strong>
            </Toast.Header>
            <Toast.Body>You have {this.props.selectedPostsCount} post{pluralize1} selected. Open the post editor to quote {pluralize2}.</Toast.Body>
          </Toast>
        </div>
      )
    }
  }
}