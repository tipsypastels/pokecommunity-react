/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { ReactNode } from "react";
import Style from 'style-it';

import { renderUsergroup } from "./tagHelpers";
import { urlPattern, hexPattern } from './patterns';
import SmartLink from "../partials/SmartLink";
import CodeBlock from "../partials/CodeBlock";

export interface TagRenderProps {
  value: string;
  children: ReactNode;
}

export interface TagDefinition {
  name: string;
  allowsYouTo: string;
  usage: string;
  example: string;

  note?: string | ReactNode;
  pc3Only?: boolean;
  cssClass?: string;

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
  '@': {
    name: 'Mention',
    allowsYouTo: 'mention a user. The mention will link to their profile and they will be notified of the post',
    usage: '@username',
    example: '@Rainbow',

    note: <>To mention a user with a space in their name, wrap the name in square brackets e.g.: <strong>@[A Long Username]</strong>.</>,
    cssClass: 'mention',
    pc3Only: true,

    render({ children }) {
      return (
        <SmartLink to={`/member.php?username=${children}`}>
          @{children}         
        </SmartLink>
      )
    },
  },

  admin: {
    name: 'Admin',
    allowsYouTo: 'format with admin style',
    usage: '[admin]content[/admin]',
    example: '[admin]Admin[/admin]',
    render: renderUsergroup('admin'),
  },

  b: {
    name: 'Bold',
    allowsYouTo: 'format text as bold',
    usage: '[b]content[/b]',
    example: '[b]bold text[/b]',

    render({ children }) {
      return <strong>{children}</strong>;
    },
  },

  bss: {
    name: 'Battle Server Staff',
    allowsYouTo: 'format with battle server staff style',
    usage: '[bss]content[/bss]',
    example: '[bss]Battle Server Staff[/bss]',
    render: renderUsergroup('bss'),
  },

  center: {
    name: 'Center',
    allowsYouTo: 'center text in the middle',
    usage: '[center]content[/center',
    example: '[center]Center Aligned[/center]',
    render({ children }) {
      return <div style={{ textAlign: 'center' }}>{children}</div>
    },
  },

  cimg: {
    name: 'Image CSS',
    allowsYouTo: 'add styling to image',
    usage: '[cimg=option]url[cimg]',
    example: '[cimg="border: 2px solid black; height: 200px;"]https://www.pokecommunity.com/images/brand-red-transparent.png[/cimg]',
    render({ value, children }) {
      let url;
      //todo figure out why reassigning children = children.toString() doesn't work with match
      if (children.toString().match(urlPattern)) {
        url = children.toString();
      } else {
        url = "";
      }

      //To differentiate different cimages, we assign a data value selector matching the style (unique to each cimg) as a string.

      return Style.it(`
        .cimg[data-value="${value}"] {
          ${value}
        }
      `,
        <span>
          <img
            className="cimg"
            data-value={value}
            src={url}
            alt="CSS Image"
          />
        </span>
      );
    }
  },

  class: {
    name: 'Div Class',
    allowsYouTo: 'use one or more CSS classes',
    usage: '[class=option]content[/class]',
    example: '[class="p-3 mb-2 bg-primary text-white"]text here[/class]',
    render({ value, children }) {
      return <div className={value}>{children}</div>
    }
  },

  code: {
    name: 'Code',
    allowsYouTo: 'display a block of code',
    usage: '[code=language]content[/code]',
    example: `[code="ruby"]10.times do
  puts "Hello PokéCommunity!"
end[/code]`,

    note: <>You don't need to set the language if you don't need syntax highlighting.</>,
    pc3Only: true,

    render({ value, children }) {
      return (
        <CodeBlock language={value}>
          {children}
        </CodeBlock>
      );
    },
  },

  color: {
    name: 'Color',
    allowsYouTo: 'change the color of text',
    usage: '[color=option]content[/color]',
    example: '[color="blue"]Blue![/color]',
    render({ value, children }) {
      let color;
      if (value.toString().match(hexPattern)) {
        color = `#${value.toString()}`;
      } else {
        color = value.toString();
      }

      return <span style={{ color: color }}>{children}</span>
    }
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
    usage: '[i]content[/i]',
    example: '[i]italicized text[/i]',

    render({ value, children }) {
      return <em>{children}</em>;
    },
  },

  u: {
    name: 'Underline',
    allowsYouTo: 'format text as underlined',
    usage: '[u]content[/u]',
    example: '[u]underlined text[/u]',

    render({ value, children }) {
      return <span style={{ textDecoration: 'underline' }}>{children}</span>
    }
  },

  strong: { alias: 'b' },
}

export const TAG_NAMES = Object.keys(TAGS);


