import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';

import Page from './Page';
import Post from '../partials/Post';
import ThreadHeader from '../partials/Thread/ThreadHeader';

import ThreadInterface from '../types/ThreadInterface';

interface IParams {
  threadid: string;
}

type IProps = RouteComponentProps<IParams>;

interface IState {
  thread: undefined | ThreadInterface;
}

export default class ThreadPage extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      thread: {
        threadid: 1,
        postuserid: 1,
        forumid: 1,
        open: true,
        views: 1,
        title: 'xxx',
        postusername: 'Rainbow',
        posts: [
          {
            postid: 1,
            threadid: 1,
            userid: 1,
            username: 'Rainbow',
            content: 'yyy',
            dateline: (new Date()).getTime(),
          }
        ]
      },
    }
  }

  render() {
    return (
      <Page name="Thread">
        {this.getHeader()}
        {this.getPosts()}
      </Page>
    )
  }

  getHeader() {
    if (!this.state.thread) {
      return null;
    }

    return (
      <ThreadHeader 
        threadid={this.state.thread.threadid}
        forumid={this.state.thread.forumid}
        title={this.state.thread.title}
        views={this.state.thread.views}
      />
    )
  }

  getPosts() {
    if (!this.state.thread) {
      return null;
    }

    return this.state.thread.posts.map(post => (
      <Post key={post.postid} {...post} />
    ));
  }
}
