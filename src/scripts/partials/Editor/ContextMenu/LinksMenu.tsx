import React from 'react';
import ContextMenuInput, { ContextMenuWrapperProps } from './ContextMenuInput';

const LinksMenu = (props: ContextMenuWrapperProps) => (
  <ContextMenuInput
    placeholder="Enter the URL of your link"
    icon="link"
    {...props}
  />
);

export default LinksMenu;