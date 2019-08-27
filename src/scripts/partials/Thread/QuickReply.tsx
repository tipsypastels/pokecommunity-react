import React from 'react';
import { Button } from 'react-bootstrap';
import Icon from '../Icon';

interface IProps {
  threadOpen: number;
  canReply: boolean;
  openEditor: () => void;
}

export default function QuickReply(props: IProps) {
  if (props.canReply) {
    return (
      <Button variant="primary" className="d-block w-100" onClick={props.openEditor}>
        Reply to Thread
      </Button>
    );
  } else if (!props.threadOpen) {
    return (
      <Button variant="secondary" className="d-block w-100" disabled>
        <Icon name="lock" mr={1} />
        Thread Closed
      </Button>
    );
  }

  // possible weird edge cases with vb permissions? play it safe
  return null;
}