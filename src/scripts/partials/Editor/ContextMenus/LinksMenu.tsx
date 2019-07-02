import React, { Component } from 'react';
import ContextMenu, { ContextMenuWrapperProps } from '../ContextMenu';

class LinksMenu extends Component<ContextMenuWrapperProps> {
  render() {
    return (
      <ContextMenu
        tag="url"
        placeholder="Enter the URL of your link"
        icon="link"
        {...this.props}
      />
    )
  }
}

export default LinksMenu;