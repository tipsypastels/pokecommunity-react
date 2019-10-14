import React, { ReactNode, useRef } from 'react';

interface IProps {
  name: string;
  children: ReactNode;
}

export default function BBCodeTab(props: IProps) {
  const ref = useRef<HTMLSpanElement>();

  function onClick() {
    const bbCodeRoot = ref.current.closest('.bbcode-root');
    const tabPanel = bbCodeRoot.querySelector(`.BBCodeTabPanel[data-name="${props.name}"]`);

    for (let node of tabPanel.parentNode.querySelectorAll(':scope > *')) {
      node.classList.remove('active');
    }

    tabPanel.classList.add('active');
  }

  return (
    <span className="BBCode-Tab" ref={ref} onClick={onClick}>
      {props.children}
    </span>
  )
}
