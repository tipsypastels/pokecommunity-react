import React, { ReactNode, useEffect, useRef } from 'react'

interface IProps {
  name: string;
  children: ReactNode;
}

export default function BBCodeTabPanel(props: IProps) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current.parentNode.querySelector(':scope > *') === ref.current) {
      ref.current.classList.add('active');
    }
  });

  return (
    <div
      data-name={props.name} 
      className={`BBCodeTabPanel`}
      ref={ref}
    >
      {props.children}
    </div>
  );
}
