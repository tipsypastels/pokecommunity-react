import React from 'react';
import { Button } from 'react-bootstrap';

interface IProps {
  openEditor: () => void;
}

export default function QuickReply(props: IProps) {
  return (
    <Button className="d-block w-100" onClick={props.openEditor}>
      Reply to Thread
    </Button>
  );
}