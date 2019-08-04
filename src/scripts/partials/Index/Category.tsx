import React, { Component } from 'react';
import Block from '../Block';
import ForumInterface from '../../types/ForumInterface';
import Forum from './Forum';
import SmartLink from '../SmartLink';

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
              <h1>
                <SmartLink to={`/forumdisplay.php?f=${this.props.id}`}>
                  {this.props.title}
                </SmartLink>
              </h1>
            </div>
          </Block.Header>
          
          <div className="forum-wrap">
            {this.getForums()}
          </div>
      </Block>
    )
  }

  getForums() {
    return this.props.forums.map(forum => (
      <Forum key={forum.id} {...forum} />
    ));
  }
}