import React, { ReactNode } from "react";

export interface TagRenderProps {
  value: string;
  children: ReactNode;
}

export interface TagDefinition {
  name: string;
  allowsYouTo: string;
  usage: string;
  example: string;

  note?: string;
  pc3Only?: boolean;

  render: (props: TagRenderProps) => ReactNode;
}

export interface TagAlias {
  alias: string;
}

export type Tag = TagDefinition | TagAlias;

export interface TagList {
  [name: string]: Tag;
}

// Keep this in alphabetical order!
export const TAGS: TagList = {
  b: {
    name: 'Bold',
    allowsYouTo: 'format text as bold',
    usage: '[b]value[/b]',
    example: '[b]bold text[/b]',

    render({ value, children }) {
      return <strong>{children}</strong>;
    },
  },

  fa: {
    name: 'Font Awesome',
    allowsYouTo: 'insert a Font Awesome icon',
    usage: '[fa="ICON GROUP"]ICON NAME[/fa]',
    example: '[fa="fab"]facebook[/fa]',

    note: 'The ICON GROUP can be omitted, and will default to "fas".',
    pc3Only: true,

    render({ value, children }) {
      let group = value || 'fas';
      return <i className={`${group} fa-${children}`} />;
    },
  },

  i: {
    name: 'Italic',
    allowsYouTo: 'format text as italic',
    usage: '[i]value[/i]',
    example: '[i]italicized text[/i]',

    render({ value, children }) {
      return <em>{children}</em>;
    },
  },

  u: {
    name: 'Underline',
    allowsYouTo: 'format text as underlined',
    usage: '[u]value[/u]',
    example: '[u]underlined text[/u]',

    render({ value, children }) {
      return <span style={{ textDecoration: 'underline' }}>{children}</span>
    }
  },

  strong: { alias: 'b' },
}

export const TAG_NAMES = Object.keys(TAGS);


