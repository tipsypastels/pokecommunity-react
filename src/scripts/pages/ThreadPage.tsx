import React, { Component } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import queryString from 'query-string';

import Page, { PageProps, PageError } from './Page';
import ThreadHeader from '../partials/Thread/ThreadHeader';
import Viewing from '../partials/Viewing';
import QuickReply from '../partials/Thread/QuickReply';
import Pagination from '../partials/Pagination';
import FloatingActions from '../partials/Thread/FloatingActions';

import ThreadInterface from '../types/ThreadInterface';
import PostInterface from '../types/PostInterface';

import { threadBreadcrumbs } from '../types/BreadcrumbInterface';
import { pageNumber } from '../helpers/PageHelpers';

import PostWrapper from '../partials/Post/PostWrapper';
import PostModal from '../partials/PostModal';
import ModerationModal from '../partials/Thread/ModerationModal';

import newcoreApi from '../bridge/newcoreApi';

interface IParams {
  id: string;
  page?: string;
}

type IProps = RouteComponentProps<IParams> & PageProps;

interface IState {
  thread?: ThreadInterface;
  editorOpen: boolean;
  editedPost?: PostInterface;
  moderationOpen: boolean;
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
      moderationOpen: false,
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
    } catch (e) {
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
            {this.getModerationModal()}
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
      <PostModal
        show={this.state.editorOpen}
        thread={this.state.thread}
        cacheKey={this.getEditorCacheKey()}
        post={this.state.editedPost}
        close={this.closeEditor}
        quotedContent={this.getNewPostQuotes()}
      />
    )
  }

  getModerationModal() {
    if (!this.state.thread.canModerate) {
      return null;
    }

    return (
      <ModerationModal 
        show={this.state.moderationOpen}
        thread={this.state.thread}
        closeModal={this.closeModerationModal}
        selectedPosts={this.getSelectedPostsAsObjects()}
      />
    )
  }

  getFloatingActions() {
    return (
      <FloatingActions
        canModerate={this.state.thread.canModerate}
        openModerationModal={this.openModerationModal}
        canReply={this.state.thread.canReply}
        openEditor={this.openEditorToNew}
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
        openEditor={this.openEditorToNew}
        openModeration={this.openModerationModal}
        selectPostsByFilter={this.selectPostsByFilter}
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
        openEditor={this.openEditorToEdit}
        {...post}
      />
    ));
  }

  getQuickReply() {
    if (this.state.thread && this.state.thread.canReply) {
      return (
        <QuickReply openEditor={this.openEditorToNew} />
      )
    }
  }

  openEditorToNew = () => {
    this.setState({ editorOpen: true, editedPost: undefined });
  }

  openEditorToEdit = (post: PostInterface) => {
    this.setState({ editorOpen: true, editedPost: post });
  }

  closeEditor = () => {
    this.setState({ editorOpen: false });
  }

  openModerationModal = () => {
    this.setState({ moderationOpen: true });
  }

  closeModerationModal = () => {
    this.setState({ moderationOpen: false });
  }

  /**
   * @name getNewPostQuotes
   * @description Generates the string of [quote] tags that are inserted into the new post editor when you have posts selected.
   */
  // TODO seems to miss quotes after the first one sometimes
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

  /**
   * Returns a unique identifier that the PostModal can use to uniquely identify edited posts. This is done so that unsaved content from editing one post does not "bleed through" when another post is edited. This also applies to creating a new post.
   */
  getEditorCacheKey = (): string => {
    const { thread, editedPost: post } = this.state;

    return `${thread.forum.id}_${post
      ? `edit_${post.id}`
      : 'new'
    }`;
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

  selectPostsByFilter = (callback: (post: PostInterface, selected?: boolean) => boolean) => {
    const { thread } = this.state;
    if (!thread) {
      return;
    }

    const { posts } = thread;
    const filtered = [];

    for (let post of posts) {
      const selected = this.checkPostSelected(post.id);
      if (callback(post, selected)) {
        filtered.push(post.id);
      }
    }

    const selectedPosts = new Set(filtered);
    this.setState({ selectedPosts });
  }

  deselectAllPosts = () => {
    this.setState({ selectedPosts: new Set() });
  }

  checkPostSelected = (postid: number) => {
    return [...this.state.selectedPosts].includes(postid);
  }

  getSelectedPostsAsObjects(): PostInterface[] {
    const { thread } = this.state;
    if (!thread) {
      return [];
    }

    return [...this.state.selectedPosts].map(postid => (
      thread.posts.find(post => post.id === postid)
    ));
  }
}