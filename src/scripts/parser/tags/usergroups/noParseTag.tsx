import React from 'react';
import Tag from '../../core/tag';

class NoParseTag extends Tag {
  render() {
    return this.children;
  }
}

NoParseTag.parseChildren = false;
export default NoParseTag;