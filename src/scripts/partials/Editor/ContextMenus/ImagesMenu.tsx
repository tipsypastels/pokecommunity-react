import React, { Component } from 'react';
import ContextMenu, { ContextMenuWrapperProps } from '../ContextMenu';

export default class ImagesMenu extends Component<ContextMenuWrapperProps> {
  render() {
    return (
      <ContextMenu
        tag="img"
        placeholder="Enter the URL of your image"
        icon="image"
        contentBecomes="children"
        {...this.props}
      />
    )
  }
}