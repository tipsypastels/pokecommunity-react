import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

import Page, { PageProps } from './Page';
import ThreadHeader from '../partials/Thread/ThreadHeader';
import Viewing from '../partials/Viewing';
import QuickReply from '../partials/Thread/QuickReply';
import Pagination from '../partials/Pagination';
import FloatingActions from '../partials/Thread/FloatingActions';

import ThreadInterface from '../types/ThreadInterface';
import PostInterface from '../types/PostInterface';
import DailyArticleInterface from '../types/DailyArticleInterface';

import { threadBreadcrumbs } from '../types/BreadcrumbInterface';
import { pageNumber } from '../helpers/PageHelpers';

import PostWrapper from '../partials/Post/PostWrapper';
import PostModal from '../partials/PostModal';
import ModerationModal from '../partials/Thread/ModerationModal';

import newcoreApi, { handleNewcoreError, NewcoreErrorCode } from '../bridge/newcoreApi';
import { getDailyArticle } from '../bridge/dailyApi';
import PostVisibility from '../types/PostVisibility';

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
  error: NewcoreErrorCode;
  selectedPosts: Set<number>;
  linkedDailyArticle?: DailyArticleInterface;
}

export default class ThreadPage extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = this.stateForNewlyLoadedThread();
  }

  async componentDidMount() {
    await this.queryForThread();
  }

  // react doesn't actually re-render the component when the :id param changes. it only triggers a props update. so, if the user jumps straight from one thread to another, this method gets called instead
  async componentDidUpdate(prevProps: IProps) {
    if (prevProps.match.params.id !== this.props.match.params.id || prevProps.location.search !== this.props.location.search) {
      this.setState(this.stateForNewlyLoadedThread(), async () => {
        await this.queryForThread();
      });
    }
  }

  stateForNewlyLoadedThread(): IState {
    return {
      thread: undefined,
      error: null,
      editorOpen: false,
      moderationOpen: false,
      selectedPosts: new Set(),
    };
  }

  async queryForThread() {
    try {
      const response = await newcoreApi({
        method: 'get',
        url: `/threads/${this.props.match.params.id}`,
      });

      this.setState({ thread: response.data }, async () => {
        await this.getLinkedDailyArticle();
      });
    } catch (e) {
      handleNewcoreError(e, error => this.setState({ error }));
    }
  }

  async getLinkedDailyArticle(): Promise<DailyArticleInterface> {
    const { thread } = this.state;
    if (!thread || !thread.contentMeta || !thread.contentMeta.dailyArticle) {
      return;
    }

    try {
      const linkedDailyArticle = 
        await getDailyArticle(thread.contentMeta.dailyArticle);

      this.setState({ linkedDailyArticle })
    } catch {
      this.setState({ linkedDailyArticle: null });
    }
  }

  render() {
    const { thread } = this.state;

    return (
      <Page
        name="Thread"
        loading={!thread}
        newBanner={thread && this.getBanner()}
        appCurrentBanner={this.props.appCurrentBanner}
        setAppBanner={this.props.setAppBanner}
        breadcrumbs={thread && this.getBreadcrumbs()}
        htmlTitle={this.getHtmlTitle()}
        error={this.state.error}
        searchScope={thread && ({
          threadName: thread.title,
          forumName: thread.forum.title,
        })}
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
        threadid={this.state.thread.id}
        currentPage={this.getCurrentPage()}
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
        threadOpen={thread.open}
        username={thread.username}
        created={thread.created}
        poll={thread.poll}
        forumTitle={thread.forum.title}
        forumIcon={thread.forum.icon}
        threadIcon={thread.contentMeta
          && thread.contentMeta
          && thread.contentMeta.smallThumbnail
        }
        linkedDailyArticle={this.state.linkedDailyArticle}
        openEditor={this.openEditorToNew}
        openModeration={this.openModerationModal}
        selectPostsByFilter={this.selectPostsByFilter}
        prefix={thread.prefix}
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
        setPost={this.setPost}
        openEditor={this.openEditorToEdit}
        {...post}
      />
    ));
  }

  getQuickReply() {
    const { thread } = this.state;
    return <QuickReply
      threadOpen={thread.open}
      canReply={thread.canReply}
      openEditor={this.openEditorToNew}
    />
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

  setPost = (index: number, post: PostInterface, callback?: (thread: ThreadInterface) => void) => {
    let { thread } = this.state;
    if (!thread) {
      return;
    }

    thread = { ...thread };
    thread.posts[index] = post;
    this.setState({ thread }, () => {
      if (callback) {
        callback(thread);
      }
    });
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
      if (!post || post.visible !== PostVisibility.Published) {
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

    return `${thread.forum.id}_${thread.id}_${post
      ? `edit_${post.id}`
      : 'reply'
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

  getCurrentPage() {
    const { thread } = this.state;
    const searchPage = pageNumber(this.getQueryParams().page);

    if (!thread) {
      return searchPage;
    }

    return Math.min(searchPage, thread.totalPages);
  }

  getQueryParams() {
    return queryString.parse(this.props.location.search);
  }
}