import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from '../DatePicker';


interface IProps {
  abort: () => void;
}

export default function SchedulePost(props: IProps) {
  const [date, setDate] = useState(new Date());

  return (
    <Modal 
      dialogClassName="SchedulePost modal-dialog-centered" 
      show onHide={props.abort}
    >
      <Modal.Body>
        <strong className="d-block mb-2">
          When do you want to post this?
        </strong>

        <DatePicker
          selectedDate={date}
          setSelectedDate={setDate}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="link" onClick={props.abort}>
          Nevermind, return to editing
        </Button>

        <Button variant="primary">
          Schedule
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
