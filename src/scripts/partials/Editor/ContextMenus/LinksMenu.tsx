import React, { Component } from 'react';
import ContextMenu, { ContextMenuWrapperProps } from '../ContextMenu';

export default class LinksMenu extends Component<ContextMenuWrapperProps> {
  render() {
    return (
      <ContextMenu
        tag="url"
        placeholder="Enter the URL of your link"
        icon="link"
        contentBecomes="value"
        {...this.props}
      />
    )
  }
}