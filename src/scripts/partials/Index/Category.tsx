import React, { Component } from 'react';

import ForumInterface from '../../types/ForumInterface';

import Forum from './Forum';

import '../../../styles/modules/Index/Category.scss';

interface IProps {
  title: string;
  forums: ForumInterface[];
}

export default class Category extends Component<IProps> {
  render() {
    return (
      <div className="Category">
        {this.props.title}
        {this.getForums()}
      </div>
    )
  }

  getForums() {
    return this.props.forums.map(forum => (
      <Forum
        {...forum}
      />
    ));
  }
}