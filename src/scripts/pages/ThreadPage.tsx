import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

import Page from './Page';
import ThreadHeader from '../partials/Thread/ThreadHeader';
import Viewing from '../partials/Viewing';
import QuickReply from '../partials/Thread/QuickReply';
import Pagination from '../partials/Pagination';

import ThreadInterface from '../types/ThreadInterface';

import { threadBreadcrumbs } from '../types/BreadcrumbInterface';
import { pageNumber } from '../helpers/PageHelpers';

import Post from '../partials/Post';
import NewPostModal from '../partials/NewPostModal';

import newcoreApi from '../bridge/newcoreApi';

interface IParams {
  id: string;
  page?: string;
}

type IProps = RouteComponentProps<IParams>;

interface IState {
  thread?: ThreadInterface;
  editorOpen: boolean;
  currentPage: number;
}

export default class ThreadPage extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    let queryParams = queryString.parse(this.props.location.search);

    this.state = {
      thread: undefined,
      editorOpen: false,
      currentPage: pageNumber(queryParams.page),
    };
  }

  async componentWillMount() {
    try {
      const response = await newcoreApi({
        method: 'get',
        url: `/threads/${this.props.match.params.id}`,
      });

      this.setState({ thread: response.data });
    } catch(e) {
      // TODO
      console.error(e);
    }
  }

  render() {
    return (
      <Page
        name="Thread"
        loading={!this.state.thread}
        banner={this.state.thread && this.getBanner()}
        breadcrumbs={this.state.thread && this.getBreadcrumbs()}
        htmlTitle={this.getHtmlTitle()}
      >
        {this.state.thread &&
          <div>
            {this.getNewPostModal()}
            {this.getHeader()}
            {this.getPagination()}
            {this.getPosts()}
            {this.getViewing()}
            {this.getQuickReply()}
          </div>
        }
      </Page>
    )
  }

  getHtmlTitle(): string | undefined {
    if (this.state.thread) {
      return this.state.thread.title;
    }
  }

  getNewPostModal() {
    if (!this.state.thread.canReply) {
      return null;
    }

    return (
      <NewPostModal
        show={this.state.editorOpen}
        thread={this.state.thread}
        closeModal={this.closeNewPostModal}
      />
    )
  }

  getPagination() {
    return (
      <Pagination 
        currentPage={this.state.currentPage}
        totalPages={this.state.thread.totalPages}
      />
    );
  }

  getBreadcrumbs() {
    return threadBreadcrumbs(this.state.thread);
  }

  getBanner() {
    return this.state.thread.forum.banner;
  }

  getHeader() {
    return (
      <ThreadHeader
        title={this.state.thread.title}
        views={this.state.thread.views}
        repliesCount={this.state.thread.repliesCount}
        canReply={this.state.thread.canReply}
        username={this.state.thread.username}
        created={this.state.thread.created}
        poll={this.state.thread.poll}
        openEditor={this.openNewPostModal}
      />
    );
  }

  getViewing() {
    return (
      <Viewing
        users={[]}
        guests={3}
        viewing="thread"
      />
    )
  }

  getPosts() {
    return this.state.thread.posts.map(post => (
      <Post key={post.id} thread={this.state.thread} {...post} />
    ));
  }

  getQuickReply() {
    if (this.state.thread && this.state.thread.canReply) {
      return (
        <QuickReply />
      )
    }
  }

  openNewPostModal = () => {
    this.setState({ editorOpen: true });
  }

  closeNewPostModal = () => {
    this.setState({ editorOpen: false });
  }
}