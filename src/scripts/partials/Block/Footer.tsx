import React from 'react';
import { BlockProps } from "../Block";

const Footer = (props: BlockProps) => (
  <div className={`BlockFooter ${props.className || ''}`}>
    {props.children}
  </div>
);

export default Footer;