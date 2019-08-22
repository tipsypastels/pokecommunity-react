import React, { Component } from 'react'
import Parser from '../../parser/Parser';

interface IProps {
  content: string;
}

export default class Preview extends Component<IProps> {
  // TODO we'll want postbits etc in here like vb previews
  render() {
    return (
      <Parser bbcode={this.props.content} />
    );
  }
}
