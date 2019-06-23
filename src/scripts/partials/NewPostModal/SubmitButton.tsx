import React, { Component } from 'react'
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';

interface IProps {
  disabled: boolean;
}

export default class SubmitButton extends Component<IProps> {
  render() {
    const { disabled } = this.props;

    return (
      <Dropdown as={ButtonGroup}>
        <Button variant="primary" disabled={disabled}>
          Post
        </Button>

        <Dropdown.Toggle 
          split 
          variant="primary" 
          id="submit-additional-options" 
          disabled={disabled}
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

      </Dropdown>
    )
  }
}
