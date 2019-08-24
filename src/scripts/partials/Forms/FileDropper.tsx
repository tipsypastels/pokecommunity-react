import React, { useRef, useState } from 'react'
import { arrayOfFiles } from '../../helpers/FileHelpers';

interface IProps {
  addFiles: (files: File[]) => void;
  disabled?: boolean;
  multiple?: boolean;
}

export default function FileDropper(props: IProps) {
  const [highlight, setHighlight] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>();

  function addFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (!props.disabled) {
      props.addFiles(arrayOfFiles(e.target.files));
    }
  }

  function openFileDialog() {
    if (!props.disabled) {
      ref.current.click();
    }
  }

  function onDragOver(e) {
    e.preventDefault();
    if (!props.disabled) {
      setHighlight(true);
    }
  }

  function onDragLeave() {
    setHighlight(false);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    if (!props.disabled) {
      props.addFiles(arrayOfFiles(e.dataTransfer.files));
      setHighlight(false);
    }
  }

  return (
    <div 
      className={`
        FileDropper 
        ${highlight && 'highlight'}
        ${props.disabled && 'disabled'}
      `} 
      onClick={openFileDialog}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="contents">
        <input
          ref={ref}
          className="d-none"
          multiple={props.multiple}
          onChange={addFiles}
          type="file"
        />
        <span>
          Drag files here or browse
        </span>
      </div>
    </div>
  )
}

FileDropper.defaultProps = {
  disabled: false,
  multiple: false,
}