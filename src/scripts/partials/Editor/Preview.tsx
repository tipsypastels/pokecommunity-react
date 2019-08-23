import React, { Component } from 'react'
import Parser from '../../parser/Parser';

interface IProps {
  content: string;
  setMentions: (mentions: Set<string>) => void;
}

export default class Preview extends Component<IProps> {
  // TODO we'll want postbits etc in here like vb previews
  render() {
    const mentions: Set<string> = new Set();

    return (
      <Parser 
        bbcode={this.props.content}
        hooks={{
          '@'({ children }) {
            mentions.add(children.toString());
          }
        }} 
        done={() => this.props.setMentions(mentions)}
      />
    );
  }
}
