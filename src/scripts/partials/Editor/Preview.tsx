import React, { Component } from 'react'
import BBCode from 'pokecommunity-bbcode';

interface IProps {
  content: string;
}

export default class Preview extends Component<IProps> {
  render() {
    const __html = BBCode.process({ text: this.props.content }).html;

    return (
      <div className="Preview">
        <strong className="preview-title">
          Preview
        </strong>

        <div
          dangerouslySetInnerHTML={{ __html }}
        />
      </div>
    )
  }
}
