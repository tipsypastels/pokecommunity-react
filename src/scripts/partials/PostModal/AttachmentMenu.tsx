import React, { useState } from 'react';
import { Dropdown, Alert } from 'react-bootstrap';
import Icon from '../Icon';
import FileUploader from '../Forms/FileUploader';
import { fileAllowedAsAttachment, getFileExtension } from '../../helpers/FileHelpers';
import FileCollection from '../../helpers/FileCollection';

export interface AttachmentMenuProps {
  files: FileCollection;
  addFiles: (f: File[]) => void;
  removeFile: (f: File) => void;
}

interface IProps extends AttachmentMenuProps {
  lastInvalidType: string | null;
}

export default function AttachmentMenu(props: IProps) {
  let invalidTypeWarning = props.lastInvalidType
    ? (
      <Alert variant="danger">
        Can't upload <strong>.{props.lastInvalidType}</strong> file.
      </Alert>
    ) : undefined;

  return (
    <Dropdown className="AttachmentMenu">
      <Dropdown.Toggle variant="link" id="attachment-dropdown">
        <Icon name="paperclip" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="py-0" alignRight>
        {invalidTypeWarning}

        <FileUploader {...props} />
      </Dropdown.Menu>
    </Dropdown>
  )
}
