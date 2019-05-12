import React, { Component } from 'react'

interface IProps {
  threadid: number,
  title: string,
  views: number,
}

export default class ThreadHeader extends Component<IProps> {
  render() {
    const { threadid, title, views } = this.props;
    return (
      <div className="block ThreadHeader">
        <h2>{title} #{threadid}</h2>
        <small className="text-small">
          {views} Views
        </small>
      </div>
    )
  }
}
