import React from 'react';
import { Button } from 'react-bootstrap';

interface IProps {
  openNewPostModal: () => void;
}

export default function QuickReply(props: IProps) {
  return (
    <Button className="d-block w-100" onClick={props.openNewPostModal}>
      Reply to Thread
    </Button>
  );
}