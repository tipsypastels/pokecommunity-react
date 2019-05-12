import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

import Page from './Page';
import ThreadHeader from '../partials/Thread/ThreadHeader';
import Viewing from '../partials/Viewing';
import QuickReply from '../partials/Thread/QuickReply';

import ThreadInterface from '../types/ThreadInterface';
import { threadPagination } from '../types/PaginationInterface';
import { IfStatePresent } from '../helpers/ComponentHelpers';
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
        banner={this.getBanner()}
        pagination={this.getPagination()}
      >
        You are on page {this.state.page}
        {this.getEditor()}
        {this.getHeader()}
        {this.getPosts()}
        {this.getViewing()}
        {this.getQuickReply()}
      </Page>
    )
  }

  @IfStatePresent('thread')
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

  @IfStatePresent('thread')
  getPagination() {
    return threadPagination(this.state.thread);
  }

  @IfStatePresent('thread')
  getBanner() {
    return this.state.thread.banner;
  }

  @IfStatePresent('thread')
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

  @IfStatePresent('thread')
  getViewing() {
    return (
      <Viewing
        users={[{ userid: 1, username: 'Dakota' }]}
        guests={3}
        viewing="thread"
      />
    )
  }

  @IfStatePresent('thread')
  getPosts() {
    return this.state.thread.posts.map(post => (
      <Post key={post.postid} thread={this.state.thread} {...post} />
    ));
  }

  @IfStatePresent('thread')
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