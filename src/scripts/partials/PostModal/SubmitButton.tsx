import React from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';

interface IProps {
  isEditingPost: boolean;
  disabled: boolean;
  canModerate: boolean;
  openScheduler: () => void;
}

export default function SubmitButton({ 
  isEditingPost, 
  disabled, 
  canModerate,
  openScheduler,
}: IProps) {
  let additionalPostOptions = null;
  if (!isEditingPost) {
    additionalPostOptions = (
      <React.Fragment>
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

          <Dropdown.Item onClick={openScheduler}>
            <strong className="d-block">
              Schedule for later
            </strong>

            <span>
              You choose when it gets published.
            </span>
          </Dropdown.Item>

          {canModerate && (
            <Dropdown.Item>
              <strong className="d-block">
                Post and close thread
              </strong>

              <span>
                You really like getting the last word in.
              </span>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </React.Fragment>
    );
  }

  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="primary" disabled={disabled}>
        {isEditingPost ? 'Save' : 'Post'}
      </Button>

      {additionalPostOptions}
    </Dropdown>
  );
}