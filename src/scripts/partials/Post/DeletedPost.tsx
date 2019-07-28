import React, { Component } from 'react'

import Post, { PostProps } from '../Post';
import Block from '../Block';

interface IState {
  fullView: boolean;
}

export default class DeletedPost extends Component<PostProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      fullView: false,
    };
  }

  render() {
    if (this.state.fullView) {
      return <Post {...this.props} />;
    }

    return (
      <Block className="DeletedPost">
        <Block.Header>
          TODO deleted post
        </Block.Header>
      </Block>
    )
  }
}
