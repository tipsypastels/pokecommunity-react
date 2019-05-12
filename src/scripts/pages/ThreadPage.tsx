import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';

import Page from './Page';
import ThreadHeader from '../partials/Thread/ThreadHeader';
import Viewing from '../partials/Viewing';
import QuickReply from '../partials/Thread/QuickReply';

import ThreadInterface from '../types/ThreadInterface';
import { threadPagination } from '../types/PaginationInterface';

import Post from '../partials/Post';

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
        repliesCount: 1,
        canReply: true,
        canModerate: true,
        canReactToPosts: true,
        canSharePosts: true,
        posts: [
          {
            postid: 1,
            threadid: 1,
            userid: 1,
            username: 'Rainbow',
            content: 'yyy',
            dateline: (new Date()).getTime(),
            canEdit: true,
          },

          {
            postid: 2,
            threadid: 1,
            userid: 2,
            username: 'Nina',
            content: 'bluh',
            dateline: (new Date()).getTime(),
            canEdit: true,
          }
        ]
      };
      this.setState({ thread });
    }, 1000);
  }

  render() {
    return (
      <Page
        name="Thread"
        loading={!this.state.thread}
        banner={this.state.thread && this.getBanner()}
        pagination={this.state.thread && this.getPagination()}
      >
        {this.state.thread &&
          <div>
            {this.getHeader()}
            {this.getPosts()}
            {this.getViewing()}
            {this.getQuickReply()}
          </div>
        }
      </Page>
    )
  }

  getPagination() {
    return threadPagination(this.state.thread);
  }

  getBanner() {
    return this.state.thread.banner;
  }

  getHeader() {
    return (
      <ThreadHeader
        threadid={this.state.thread.threadid}
        title={this.state.thread.title}
        views={this.state.thread.views}
        repliesCount={this.state.thread.repliesCount}
      />
    );
  }

  getViewing() {
    return (
      <Viewing
        users={[{ userid: 1, username: 'Dakota' }]}
        guests={3}
        viewing="thread"
      />
    )
  }

  getPosts() {
    return this.state.thread.posts.map(post => (
      <Post key={post.postid} thread={this.state.thread} {...post} />
    ));
  }

  getQuickReply() {
    if (this.state.thread && this.state.thread.canReply) {
      return (
        <QuickReply />
      )
    }
  }
}