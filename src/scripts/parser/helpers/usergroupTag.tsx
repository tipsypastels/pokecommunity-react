import React, { ReactNode } from 'react';
import Tag from '../core/tag';

abstract class UsergroupTag extends Tag {
  render(groupName: string): ReactNode {
    return (
      <span className={groupName}>
        {this.children}
      </span>
    )
  }
}

export default UsergroupTag;