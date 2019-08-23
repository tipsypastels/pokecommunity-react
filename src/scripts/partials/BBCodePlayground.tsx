import React, { useState } from 'react'
import PostModalLayout from './PostModalLayout';

interface IProps {
  show: boolean;
  close: () => void;
}

export default function BBCodePlayground(props: IProps) {
  const [content, setContent] = useState<string>('');

  return (
    <PostModalLayout
      className="BBCodePlayground"
      title="BBCode Playground"
      content={content}
      setContent={setContent}
      setMentions={(_: Set<string>) => { }}
      show={props.show}
      close={props.close}
    />
  )
}
