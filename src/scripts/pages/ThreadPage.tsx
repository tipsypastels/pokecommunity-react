import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import Page from './Page';
import Post from '../partials/Post';
import ThreadHeader from '../partials/Thread/ThreadHeader';

import ThreadInterface from '../types/ThreadInterface';

interface IParams {
  threadid: string;
}

type IProps = RouteComponentProps<IParams>;

interface IState {
  thread?: ThreadInterface;
}

export default class ThreadPage extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      thread: undefined,
    };
  }

  // this is just for testing the loading message
  // obviously make this an api request later
  componentWillMount() {
    setTimeout(() => {
      const thread = {
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
      };
      this.setState({ thread });
    }, 1000);
  }

  render() {
    return (
      <Page name="Thread" loading={!this.state.thread} banner={this.getBanner()}>
        <Alert variant="primary">
          hello world
        </Alert>

        {this.getHeader()}
        {this.getPosts()}
      </Page>
    )
  }

  getBanner() {
    if (!this.state.thread) {
      return null;
    }

    return this.state.thread.banner;
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
    );
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