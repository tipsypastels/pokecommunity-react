import React from 'react'
import FileDropper from './FileDropper';
import { AttachmentMenuProps } from '../PostModal/AttachmentMenu';
import { getFileExtension, getFileColor } from '../../helpers/FileHelpers';
import Icon from '../Icon';

export default function FileUploader(props: AttachmentMenuProps) {
  const { files, addFiles, removeFile } = props;

  return (
    <div className="FileUploader">
      <div className="uploads">
        {files.map(file => (
          <div className="file" key={file.name}>
            <div className="file-type" style={{
              backgroundColor: getFileColor(file),
            }}>
              {getFileExtension(file)}
            </div>

            <div className="file-name">
              {file.name}
            </div>

            <div 
              className="file-delete" 
              onClick={() => removeFile(file)}
            >
              <Icon name="trash" />
            </div>
          </div>
        ))}
      </div>

      <FileDropper addFiles={addFiles} />
    </div>
  )
}
