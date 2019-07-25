import React, { Component } from 'react';

import ForumInterface from '../../types/ForumInterface';

import '../../../styles/modules/Index/Forum.scss';

export default class Forum extends Component<ForumInterface>{
  render() {
    return (
      <div className="Forum">
        <img className="forum-icon" src={this.props.icon} alt={this.props.title} />
        {this.props.title}
      </div>
    )
  }
}