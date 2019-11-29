/* eslint-disable no-useless-escape */

import React, { Component, ReactNode } from 'react';
import processString from 'react-process-string';
import { TAG_NAMES, TagRenderProps } from './tags';
import { resolveTag, resolveLabel } from './tagFunctions';

export interface ParserHookList {
  [tag: string]: (props: TagRenderProps) => void;
}

const mentionRegExp = /@(?:(?:\w+)|(\[[\w\s]+?\]))/g

const bbRegExp = new RegExp("<bbcl=([0-9]+) (" + TAG_NAMES.join("|") + ")([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>", "gi");

const pbbRegExp = new RegExp("\\[(" + TAG_NAMES.join("|") + ")([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]", "gi");

export interface ParserProps {
  bbcode: string;
  hooks?: ParserHookList;
  done?: (results: ReactNode) => void;
  className?: string;
}

const BBCODE_CACHE: { [key: string]: ReactNode } = {};

export default class Parser extends Component<ParserProps> {
  constructor(props) {
    super(props);

    // arrow methods won't work in this case because of the semantics of their hoisting
    this.bb2JSX = this.bb2JSX.bind(this);
    this.processBBCodeMatch = this.processBBCodeMatch.bind(this);
  }

  componentDidMount() {
    this.markAsDone();
  }

  componentDidUpdate(prevProps: ParserProps) {
    if (prevProps.bbcode !== this.props.bbcode) {
      this.markAsDone();
    }
  }
  
  markAsDone() {
    const results = this.getResults();

    BBCODE_CACHE[this.props.bbcode] = results;
    if (this.props.done) {
      this.props.done(results);
    }
  }

  render() {
    return (
      <div className={`bbcode-root ${this.props.className}`}>
        {this.getResults()}
      </div>
    );
  }

  getResults() {
    const { bbcode } = this.props;

    if (BBCODE_CACHE[bbcode]) {
      return BBCODE_CACHE[bbcode];
    } else {
      return this.bb2JSX(this.addBBCodeLevels(this.props.bbcode));
    }
  }

  private addBBCodeLevels(bbcode: string) {
    while (bbcode !== (bbcode = bbcode.replace(pbbRegExp, (match: string, tagLabel: string, value: string, children: string) => {
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

  private bb2JSX(text: string) {
    return (processString(
      [{
        regex: bbRegExp,
        fn: this.processBBCodeMatch,
      }, {
        regex: mentionRegExp,
        fn: (key, [full]) => {
          const mentionedName = full
            .slice(1)
            .replace(/^\[(.*)\]$/, '$1');
            
          return this.processBBCodeMatch(
            key,
            [full, 0, '@', undefined, mentionedName],
          );
        }
      }, {
        regex: /\n/,
        fn: (key) => <br key={key} />,
      }]
    ))(text);
  }

  private processBBCodeMatch(key, [full, depth, tagLabel, value, children]) {
    tagLabel = tagLabel.toLowerCase();

    const tag = resolveTag(tagLabel);

    if (children) {
      bbRegExp.exec(children); // no i don't know why this is needed
      children = tag.noParse
        ? this.unprocess(children)
        : this.bb2JSX(children);
    }

    if (value) {
      value = value.replace(/^=?"?/, '')
        .replace(/"$/, '');
    }

    // in case an alias was used, we need the real label of the tag
    const realLabel = resolveLabel(tag);
    const cssClass = tag.cssClass || realLabel;

    const { hooks } = this.props;
    if (hooks && hooks[realLabel]) {
      hooks[realLabel]({ value, children });
    }

    if (tag.preventSpanWrap) {
      return (
        <React.Fragment key={key}>
          {tag.render({ value, children })}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={key}>
        <span className={`bbcode-tag tag-${cssClass}`}>
          {tag.render({ value, children })}
        </span>
      </React.Fragment>
    );
  }

  private unprocess(tagContent: string) {
    return tagContent.replace(/<bbcl=[0-9]+ \/\*>/gi, "").replace(/<bbcl=[0-9]+ /gi, "[").replace(/>/gi, "]");
  }
}