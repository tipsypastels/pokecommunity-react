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

  selectedPosts: Set<number>;
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

      selectedPosts: new Set(),
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
        quotedContent={this.getNewPostQuotes()}
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
        selectedPostsCount={this.state.selectedPosts.size}
        deselectPosts={this.deselectAllPosts}
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
        canModerate={thread.canModerate}
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
        selectPost={this.selectPost}
        deselectPost={this.deselectPost}
        checkPostSelected={this.checkPostSelected}
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

  /**
   * @name getNewPostQuotes
   * @description Generates the string of [quote] tags that are inserted into the new post editor when you have posts selected.
   */
  getNewPostQuotes() {
    const { selectedPosts } = this.state;
    const { posts } = this.state.thread;

    if (selectedPosts.size === 0) {
      return null;
    }

    return [...selectedPosts].map(postid => {
      const post = posts.find(post => post.id === postid);
      if (!post) {
        return '';
      }

      return `[quote=${post.user.username};${post.id}]${post.content}[/quote]\n`;
    }).join("\n");
  }

  selectPost = (postid: number) => {
    let { selectedPosts } = this.state;
    
    selectedPosts = new Set(
      [...selectedPosts].concat(postid)
    );
    
    this.setState({ selectedPosts });
  }

  deselectPost = (postid: number) => {
    let { selectedPosts } = this.state;

    // dup the object, don't mutate directly
    selectedPosts = new Set([...selectedPosts]);
    selectedPosts.delete(postid);

    this.setState({ selectedPosts });
  }

  deselectAllPosts = () => {
    let { selectedPosts } = this.state;
    selectedPosts = new Set([...selectedPosts]);

    for (let i of selectedPosts) {
      selectedPosts.delete(i);
    }

    this.setState({ selectedPosts });
  }

  checkPostSelected = (postid: number) => {
    return [...this.state.selectedPosts].includes(postid);
  }
}