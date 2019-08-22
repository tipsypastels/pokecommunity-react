/* eslint-disable no-useless-escape */

import React, { Component } from 'react';
import processString from 'react-process-string';
import { TAG_NAMES } from './tags';
import { resolveTag } from './tagFunctions';

export interface ParserHookList {
  [tag: string]: (TagProps) => void;
}

export interface ParserProps {
  bbcode: string;
  // TODO implement hooks
  hooks?: ParserHookList;
}

const bbRegExp = new RegExp("<bbcl=([0-9]+) (" + TAG_NAMES.join("|") + ")([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>", "gi");

const pbbRegExp = new RegExp("\\[(" + TAG_NAMES.join("|") + ")([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]", "gi");

const bb2JSX = processString([{ 
  regex: bbRegExp, 
  fn: (key, [full, depth, tagName, value, children]) => {
    tagName = tagName.toLowerCase();

    if (children) {
      bbRegExp.exec(children); // TODO no clue why this line is needed tbh
      children = bb2JSX(children);
    }

    if (value) {
      value = value.replace(/^=?"?/, '')
                   .replace(/"$/, '');
    }

    return (
      <React.Fragment key={key}>
        <span>
          {resolveTag(tagName).render({ value, children })}
        </span>
      </React.Fragment>
    )
  }
}]);

export default class Parser extends Component<ParserProps> {
  render() {
    return bb2JSX(this.addBBCodeLevels(this.props.bbcode))
  }

  private addBBCodeLevels(bbcode: string) {
    while (bbcode !== (bbcode = bbcode.replace(pbbRegExp, (match: string, tagName: string, value: string, children: string) => {
      match = match.replace(/\[/g, "<");
      match = match.replace(/\]/g, ">");
      return this.updateTagDepths(match);
    })));
    return bbcode;
  }

  private updateTagDepths(children: string) {
    return children.replace(/\<([^\>][^\>]*?)\>/gi, (match: string, subMatch: string) => {
      const bbcodeLevel = subMatch.match(/^bbcl=([0-9]+) /);
      if (bbcodeLevel === null) {
        return `<bbcl=0 ${subMatch}>`;
      }

      return `<${subMatch.replace(/^(bbcl=)([0-9]+)/, (match: string, m1: string, m2: string) => {
        return m1 + (Number(m2) + 1);
      })}>`;
    });
  }
}