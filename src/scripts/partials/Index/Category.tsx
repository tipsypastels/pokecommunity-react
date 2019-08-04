import React, { Component } from 'react';

import Block from '../Block';

import ForumInterface from '../../types/ForumInterface';

import Forum from './Forum';

import '../../../styles/modules/Index/Category.scss';

interface IProps {
  id: number;
  title: string;
  forums: ForumInterface[];
}

export default class Category extends Component<IProps> {
  render() {
    return (
      <Block className="Category">
          <Block.Header>
            <div className="title"> 
              <h1><a href={"/categories/" + this.props.id}>{this.props.title}</a></h1>
            </div>
          </Block.Header>
          <div className="forum-wrap">{this.getForums()}</div>
      </Block>
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