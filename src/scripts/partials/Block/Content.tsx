import React from 'react';
import { BlockProps } from "../Block";

const Content = (props: BlockProps) => (
  <div className={`BlockContent ${props.className || ''}`}>
    {props.children}
  </div>
);

export default Content;