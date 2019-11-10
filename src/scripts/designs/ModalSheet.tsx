/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactNode, memo } from 'react';
import { Modal } from 'react-bootstrap';

const VARIANT_COLORS = {
  error: 'var(--error-color)',
  warning: 'var(--warning-color)',
}
type ModalSheetVariantColor = keyof typeof VARIANT_COLORS;

interface IProps {
  variant?: ModalSheetVariantColor;
  title: string;
  children: ReactNode;
  show: boolean;
  onHide: () => void;
}

/**
 * Like a modal, but degrades to a sheet on mobile. Prefer this to bootstrap's <Modal /> whenever possible.
 */
export default function ModalSheet(props: IProps) {
  return (
    <Modal
      dialogClassName="modal-dialog-centered modal-dialog-scrollable"
      show={props.show}
      onHide={props.onHide}
      css={{
        // handle bootstrap weirdness
        paddingRight: 'unset !important',
        paddingLeft: 'unset !important',
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.children}
      </Modal.Body>
    </Modal>
  );
}