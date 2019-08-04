import React, { Component } from 'react'
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';

interface IProps {
  isEditingPost: boolean;
  disabled: boolean;
}

export default class SubmitButton extends Component<IProps> {
  render() {
    const { isEditingPost, disabled } = this.props;

    return (
      <Dropdown as={ButtonGroup}>
        <Button variant="primary" disabled={disabled}>
          {isEditingPost ? 'Save' : 'Post'}
        </Button>

        {this.getAdditionalPostOptions()}
      </Dropdown>
    )
  }

  getAdditionalPostOptions() {
    // drafting etc is only available when making a new post
    // you cannot convert an existing post to a draft
    // this may change in the future
    if (this.props.isEditingPost) {
      return null;
    }

    return (
      <React.Fragment>
        <Dropdown.Toggle
          split
          variant="primary"
          id="submit-additional-options"
          disabled={this.props.disabled}
        />

        <Dropdown.Menu alignRight>
          <Dropdown.Item>
            <strong className="d-block">
              Save as draft
              </strong>

            <span>
              Only you will see your drafts.
              </span>
          </Dropdown.Item>

          <Dropdown.Item>
            <strong className="d-block">
              Schedule for later
              </strong>

            <span>
              You choose when it gets published.
              </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </React.Fragment>
    );
  }
}
