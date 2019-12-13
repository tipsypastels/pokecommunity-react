import React, { useEffect } from 'react'
import { ModalSheetProps } from '../ModalSheet'
import { Modal } from 'react-bootstrap'

export default function ModalSheetBrowser(props: ModalSheetProps) {
  return (
    <Modal 
      dialogClassName="modal-dialog-centered modal-dialog-scrollable"
      show={props.show}
      onHide={props.onHide}
      keyboard={props.keyboard}
    >
      <Modal.Header 
        closeButton={props.closeButton} 
        className={props.headerClassName}
      >
        <Modal.Title>
          {props.title}
        </Modal.Title>

        {props.headerContent}
      </Modal.Header>

      {props.bodyContainer || (
        <Modal.Body>
          {props.children}
        </Modal.Body>
      )}
    </Modal>
  );
}
