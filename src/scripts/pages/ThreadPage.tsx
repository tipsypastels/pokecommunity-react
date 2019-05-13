import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

import Page from './Page';
import ThreadHeader from '../partials/Thread/ThreadHeader';
import Viewing from '../partials/Viewing';
import QuickReply from '../partials/Thread/QuickReply';

import ThreadInterface from '../types/ThreadInterface';
import { threadBreadcrumbs } from '../types/BreadcrumbInterface';
import { pageNumber } from '../helpers/PageHelpers';

import Post from '../partials/Post';
import Editor from '../partials/Editor';

interface IParams {
  threadid: string;
  page?: string;
}

type IProps = RouteComponentProps<IParams>;

interface IState {
  thread?: ThreadInterface;
  editorOpen: boolean;
  page: number;
}

export default class ThreadPage extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    let queryParams = queryString.parse(this.props.location.search);

    this.state = {
      thread: undefined,
      editorOpen: false,
      page: pageNumber(queryParams.page),
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

        forum: {
          forumid: 1,
          title: 'A Forum',
        },

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
    }, 200);
  }

  render() {
    return (
      <Page
        name="Thread"
        loading={!this.state.thread}
        banner={this.state.thread && this.getBanner()}
        breadcrumbs={this.state.thread && this.getBreadcrumbs()}
      >
        {this.state.thread &&
          <div>
            You are on page {this.state.page}
            {this.getEditor()}
            {this.getHeader()}
            {this.getPosts()}
            {this.getViewing()}
            {this.getQuickReply()}
          </div>
        }
      </Page>
    )
  }

  getEditor() {
    if (!this.state.thread.canReply) {
      return null;
    }

    return (
      <Editor 
        show={this.state.editorOpen} 
        thread={this.state.thread}
        closeEditor={this.closeEditor} 
      />
    )
  }

  getBreadcrumbs() {
    return threadBreadcrumbs(this.state.thread);
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
        canReply={this.state.thread.canReply}
        openEditor={this.openEditor}
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

  openEditor = () => {
    this.setState({ editorOpen: true });
  }
  
  closeEditor = () => {
    this.setState({ editorOpen: false });
  }
}