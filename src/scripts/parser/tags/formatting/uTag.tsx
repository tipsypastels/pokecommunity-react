import React from 'react';
import Tag from '../../core/tag';

class UTag extends Tag {
  render() {
    return (
      <span style={{ textDecoration: 'underline' }}>
        {this.children}
      </span>
    )
  }
}

export default UTag;