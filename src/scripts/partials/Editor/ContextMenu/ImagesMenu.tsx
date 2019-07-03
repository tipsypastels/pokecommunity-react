import React, { Component } from 'react';
import ContextMenuInput, { ContextMenuWrapperProps } from './ContextMenuInput';


const ImagesMenu = (props: ContextMenuWrapperProps) => (
  <ContextMenuInput
    placeholder="Enter the URL of your image"
    icon="image"
    {...props}
  />
);

export default ImagesMenu;