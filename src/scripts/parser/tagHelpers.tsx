import React from 'react';

import { TagRenderProps, TagDefinition } from './tags';

export function renderUsergroup(rank: string) {
  return ({ children }: TagRenderProps) => (
    <span className={`usergroup usergroup-${rank}`}>
      {children}
    </span>
  )
}

export function usergroup(tag: string, tagName: string, descName = tagName.toLowerCase(), className = tag): TagDefinition {
  return {
    name: tagName,
    allowsYouTo: `format with the ${descName} style`,
    usage: `[${tag}]content[/${tag}]`,
    example: `[${tag}]${tagName}[/${tag}]`,

    render({ children }) {
      return (
        <span className={`usergroup usergroup-${className}`}>
          {children}
        </span>
      );
    },
  };
}