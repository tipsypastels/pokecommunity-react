import React, { Component } from 'react'

interface IProps {
  threadid: number,
  forumid: number,
  title: string,
  views: number,
}

export default class ThreadHeader extends Component<IProps> {
  render() {
    const { threadid, forumid, title, views } = this.props;
    return (
      <div>
        {title} I am thread #{threadid}. I am part of forum #{forumid}. I have {views} views.
      </div>
    )
  }
}
