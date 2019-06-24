import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

import Page, { PageProps, PageError } from './Page';
import ThreadHeader from '../partials/Thread/ThreadHeader';
import Viewing from '../partials/Viewing';
import QuickReply from '../partials/Thread/QuickReply';
import Pagination from '../partials/Pagination';
import FloatingActions from '../partials/Thread/FloatingActions';

import ThreadInterface from '../types/ThreadInterface';

import { threadBreadcrumbs } from '../types/BreadcrumbInterface';
import { pageNumber } from '../helpers/PageHelpers';

import PostWrapper from '../partials/Post/PostWrapper';
import NewPostModal from '../partials/NewPostModal';

import newcoreApi from '../bridge/newcoreApi';

interface IParams {
  id: string;
  page?: string;
}

type IProps = RouteComponentProps<IParams> & PageProps;

interface IState {
  thread?: ThreadInterface;
  editorOpen: boolean;
  currentPage: number;
  error: PageError;
}

export default class ThreadPage extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    let queryParams = queryString.parse(this.props.location.search);

    this.state = {
      thread: undefined,
      editorOpen: false,
      currentPage: pageNumber(queryParams.page),
      error: null,
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
      if (e.toString().match(/404/)) {
        this.setState({ error: 404 });
      } else {
        this.setState({ error: 500 });
      }
    }
  }

  render() {
    return (
      <Page
        name="Thread"
        loading={!this.state.thread}
        newBanner={this.state.thread && this.getBanner()}
        appCurrentBanner={this.props.appCurrentBanner}
        setAppBanner={this.props.setAppBanner}
        breadcrumbs={this.state.thread && this.getBreadcrumbs()}
        htmlTitle={this.getHtmlTitle()}
        error={this.state.error}
      >
        {this.state.thread &&
          <div>
            {this.getNewPostModal()}
            {this.getFloatingActions()}
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

  getFloatingActions() {
    //TODO make selectePostsCount and deselectedPosts work currently placeholder
    return (
      <FloatingActions
        canModerate={this.state.thread.canModerate}
        canReply={this.state.thread.canReply}
        openNewPostModal={this.openNewPostModal}
        selectedPostsCount={1}
        deselectPosts={() => { }}
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
    const { thread } = this.state;

    return (
      <ThreadHeader
        title={thread.title}
        views={thread.views}
        repliesCount={thread.repliesCount}
        canReply={thread.canReply}
        username={thread.username}
        created={thread.created}
        poll={thread.poll}
        forumTitle={thread.forum.title}
        forumIcon={thread.forum.icon}
        threadIcon={thread.contentMeta
          && thread.contentMeta.thumbnail
          && thread.contentMeta.thumbnail.small
        }
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
    return this.state.thread.posts.map((post, index) => (
      <PostWrapper
        key={post.id}
        index={index}
        thread={this.state.thread}
        {...post}
      />
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