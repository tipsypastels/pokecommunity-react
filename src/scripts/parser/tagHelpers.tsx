import React from 'react';

import { TagRenderProps } from './tags';

export function renderUsergroup(rank: string) {
  return ({ children }: TagRenderProps) => (
    <span className={`usergroup usergroup-${rank}`}>
      {children}
    </span>
  )
}