import React, { ReactNode } from 'react';

abstract class Tag {
  static parseChildren: boolean = true;
  static vbCompatibleTag: boolean = true;
  static allowedChildren: Tag[] = [];
  static allowedParents: Tag[] = [];

  value?: string;
  children?: ReactNode;

  constructor(value?: string, children?: ReactNode) {
    this.value = value;
    this.children = children;
  }

  abstract render(any): ReactNode;
}

export default Tag;