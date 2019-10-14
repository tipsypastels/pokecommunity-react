/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { ReactNode } from "react";
import Style from 'style-it';

import { renderUsergroup, usergroup } from "./tagHelpers";
import { urlPattern, hexPattern } from './patterns';
import SmartLink from "../partials/SmartLink";
import CodeBlock from "../partials/BBCodeTags/CodeBlock";
import Spoiler from "../partials/BBCodeTags/Spoiler";
import { ProgressBar } from "react-bootstrap";
import BBCodeTabPanel from "../partials/BBCodeTags/Tabs/BBCodeTabPanel";
import BBCodeTab from "../partials/BBCodeTags/Tabs/BBCodeTab";

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
  secret?: boolean;
  
  preventSpanWrap?: boolean;
  noParse?: boolean;

  render: (props: TagRenderProps) => ReactNode;
}

export interface TagAlias {
  alias: string;
  secret?: boolean;
}

export type Tag = TagDefinition | TagAlias;

export interface TagList {
  [name: string]: Tag;
}

// Keep this in alphabetical order, with aliases at the bottom
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
      let content = children.toString();
      if (content.match(urlPattern)) {
        url = content;
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
    name: 'Class (HTML)',
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
    noParse: true,

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

  daily: {
    name: 'Daily',
    allowsYouTo: 'format with the daily staff style',
    usage: '[daily]content[/daily]',
    example: '[daily]Daily[/daily]',
    render: renderUsergroup('daily'),
  },

  developer: {
    name: 'Developer',
    allowsYouTo: 'format with the development team style',
    usage: '[developer]content[/developer]',
    example: '[developer]Developer[/developer]',
    render: renderUsergroup('dev'),
  },

  div: {
    name: 'Div (HTML)',
    allowsYouTo: 'create an HTML block that accepts CSS',
    usage: '[div="value"]content[/div]',
    example: '[div="color: white; background-color: blue;"]some css![/div]',
    
    render({ value, children }) {
      return Style.it(`
        .css-div[data-value="${value}"] {
          ${value}
        }
      `,
        <div className="css-div" data-value={`${value}`}>
          {children}
        </div>
      );
    },
  },

  fangames: {
    name: 'Fangames',
    allowsYouTo: 'format with the fangames staff style',
    usage: '[fangames]content[/fangames]',
    example: '[fangames]Fangames[/fangames]',
    render: renderUsergroup('fangames'),
  },

  fa: {
    name: 'Font Awesome',
    allowsYouTo: 'insert a Font Awesome icon',
    usage: '[fa="icon group"]icon name[/fa]',
    example: '[fa="fab"]facebook[/fa]',

    note: 'The ICON GROUP can be omitted, and will default to "fas".',
    pc3Only: true,

    render({ value, children }) {
      let group = value || 'fas';
      return <i className={`${group} fa-${children}`} />;
    },
  },

  font: {
    name: 'Font',
    allowsYouTo: 'change your text font',
    usage: '[font="value"]content[/font]',
    example: '[font="Comic Sans MS"]The Best Font[/font]',

    render({ value, children }) {
      return <span style={{ fontFamily: value }}>{children}</span>;
    },
  },

  i: {
    name: 'Italic',
    allowsYouTo: 'format text as italic',
    usage: '[i]content[/i]',
    example: '[i]italicized text[/i]',

    render({ children }) {
      return <em>{children}</em>;
    },
  },

  iclass: {
    name: 'Inline Class (HTML)',
    allowsYouTo: 'use one or more css classes on a span tag',
    usage: '[iclass="value"]content[/iclass]',
    example: '[iclass="text-primary"]purple text~[/iclass]',

    render({ value, children }) {
      return <span className={value}>{children}</span>;
    },
  },

  img: {
    name: 'Image',
    allowsYouTo: 'use an image',
    usage: '[img]url[/img]',
    example: '[img]https://www.pokecommunity.com/uploads/imageshare/31_1557635579569237794.png[/img]',

    render({ children }) {
      return <img src={children.toString()} alt="" />
    },
  },

  indent: {
    name: 'Indent',
    allowsYouTo: 'indent your text',
    usage: '[indent]content[/indent]',
    example: '[indent]hello world[/indent]',

    render({ children }) {
      return <blockquote>{children}</blockquote>;
    },
  },

  mod: {
    name: 'Moderator',
    allowsYouTo: 'format with the moderator style',
    usage: '[mod]content[/mod]',
    example: '[mod]Moderator[/mod]',
    render: renderUsergroup('mod'),
  },

  moderoid: {
    name: 'Moderoid',
    allowsYouTo: 'format with the discord moderoid style',
    usage: '[moderoid]content[/moderoid]',
    example: '[moderoid]Moderoid[/moderoid]',
    render: renderUsergroup('moderoid'),
  },

  noparse: {
    name: 'No Parse',
    allowsYouTo: 'skip bbcode parsing inside the tag',
    usage: '[noparse]bbcode[/noparse]',
    example: '[noparse][b]not getting parsed![/b][/noparse]',
    noParse: true,

    render({ children }) {
      return children;
    },
  },

  owner: {
    name: 'Owner',
    allowsYouTo: 'format with the PokéCommunity owner style',
    usage: '[owner]content[/owner]',
    example: '[owner]Owner[/owner]',
    render: renderUsergroup('owner'),
  },

  progress: {
    name: 'Progress Bar',
    allowsYouTo: 'show your progress on a goal',
    usage: '[progress="percentage"]content[/progress]',
    example: '[progress="50%"]complete documenting bbcode tags[/progress]',

    pc3Only: true,

    render({ value, children }) {
      const percentage = Number(value.replace(/%/g, ''));
      return <ProgressBar striped now={percentage} label={children} />;
    },
  },

  s: {
    name: 'Strikeout',
    allowsYouTo: 'strikeout text',
    usage: '[s]content[/s]',
    example: '[s]never mind[/s]',

    render({ children }) {
      return (
        <span style={{ textDecoration: 'line-through' }}>
          {children}
        </span>
      );
    },
  },

  'sig-reason': {
    secret: true,

    name: 'Signature Disabled',
    allowsYouTo: 'disable a signature',
    usage: '[sig=reason="reason"]content[/sig-reason]',
    example: '[sig-reason="bad taste"]legacy postbit is better[/sig-reason]',

    render({ value, children }) {
      return null; // TODO
    },
  },

  size: {
    name: 'Size',
    allowsYouTo: 'resize text',
    usage: '[size="number"]content[/size]',
    example: '[size="5"]content[/size]',

    render({ value, children }) {
      return null; // TODO
    },
  },

  smt: usergroup('smt', 'Social Media Team'),

  span: {
    name: 'Span (HTML)',
    allowsYouTo: 'create an HTML span that accepts CSS',
    usage: '[span="css"]content[/span]',
    example: '[span="color: red"]red text![/span]',

    render({ value, children }) {
      return Style.it(`
        .css-span[data-value="${value}"] {
          ${value}
        }
      `,
        <span className="css-span" data-value={`${value}`}>
          {children}
        </span>
      );
    },
  },

  spoiler: {
    name: 'Spoiler',
    allowsYouTo: 'hides all text and images inside the tags so as to not spoil a story or plot of something you post',
    usage: '[spoiler=title]content[/spoiler]',
    example: '[spoiler="military secrets inside"]quack[/spoiler]',
    note: 'Specifying the title is optional.',

    render({ value, children }) {
      return (
        <Spoiler title={value}>
          {children}
        </Spoiler>
      );
    },
  },

  supporter: usergroup('supporter', 'Supporter', 'community supporter'),
  
  tabcontent: {
    name: 'Tab Content',
    allowsYouTo: 'contain [tabpanel]s',
    usage: '[tabcontent]...tabpanels here...[/tabcontent]',
    example: '[tabcontent][tabpanel="my-tab-1"]my tab 1 content[/tabpanel][/tabcontent]',

    render({ children }) {
      return (
        <div className="tabpanel">
          {children}
        </div>
      )
    },
  },

  tabgroup: {
    name: 'Tab Group',
    allowsYouTo: 'contain [tab]s',
    usage: '[tabgroup]...tabs here...[/tab]',
    example: '[tabgroup][tab="my-tab-1"]my tab 1 switcher[/tab][/tabgroup]',

    render({ children }) {
      return (
        <div className="tabgroup">
          {children}
        </div>
      )
    }
  },

  tabpanel: {
    name: 'Tab Panel',
    allowsYouTo: 'display content of a tab. See [tab]',
    usage: '[tabpanel="tab-name"]tab content[/tabpanel]',
    example: '[tabpanel="my-tab-1"]my tab 1 content[/tabpanel]',
    preventSpanWrap: true,

    render({ value, children }) {
      return (
        <BBCodeTabPanel name={value}>
          {children}
        </BBCodeTabPanel>
      );
    },
  },

  tab: {
    name: 'Tab',
    allowsYouTo: 'use tabs in bbcode',
    usage: '[tab="tab-name"]tab switcher title[/tab]',
    example: '[tab="my-tab-1"]click here to switch to tab 1[/tab]',
    preventSpanWrap: true,

    render({ value, children }) {
      return (
        <BBCodeTab name={value}>
          {children}
        </BBCodeTab>
      );
    }
  },

  u: {
    name: 'Underline',
    allowsYouTo: 'format text as underlined',
    usage: '[u]content[/u]',
    example: '[u]underlined text[/u]',

    render({ children }) {
      return <span style={{ textDecoration: 'underline' }}>{children}</span>
    }
  },

  
  // aliases
  
  crystaltier: { alias: 'supporter', secret: true },
  'css-div': { alias: 'div', secret: true },
  'css-span': { alias: 'span', secret: true },
  cssc: { alias: 'class', secret: true },
  goldtier: { alias: 'supporter', secret: true },
  icon: { alias: 'fa', secret: true },
  moderator: { alias: 'mod', secret: true },
  platinumtier: { alias: 'supporter', secret: true },
  silvertier: { alias: 'supporter', secret: true },
  spoilertitle: { alias: 'spoiler' },
  staffadmin: { alias: 'admin', secret: true },
  strong: { alias: 'b' },
  vip: { alias: 'supporter', secret: true },
}

export const TAG_NAMES = Object.keys(TAGS);


