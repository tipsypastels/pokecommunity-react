import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import LayoutContainer from './PostModal/LayoutContainer';
import LayoutSwitcher from './PostModal/LayoutSwitcher';
import SubmitButton from './PostModal/SubmitButton';
import TabbedLayout from './PostModal/LayoutItems/TabbedLayout';

import ThreadInterface from '../types/ThreadInterface';
import PostInterface from '../types/PostInterface';
import AppContext from '../AppContext';
import Pronoun from './Pronoun';

// each post/new tracks its content seperately
// they're cached in here
// this won't actually persist across reloads etc
// but we do that too (drafts)
const CONTENT_CACHE = {};

export type EditorLayout = 'columns' | 'rows' | 'tabbed';

// layout is forced to switch on mobile
export const DEFAULT_LAYOUT: EditorLayout = 'tabbed';
export const LAYOUT_LOCALSTORAGE_KEY = 'pokecomm3_editorlayout';

export const EDITOR_LAYOUTS_AVAILABLE_AT = 'md';

interface IProps {
  thread: ThreadInterface;
  post?: PostInterface;
  cacheKey: string;
  show: boolean;
  close: () => void;
  quotedContent?: string;
}

interface IState {
  content: string;
  mentions: string[];
  layout: EditorLayout;
  loadedDraftIndicator: boolean;
}

// the key used for localstorage
const lsKey = (key: string) => `pokecomm3_draft_${key}`;

interface InitialContentOptions {
  skipDrafts?: boolean;
  isDraftCb?: (isDraft: boolean) => void;
}

export default class PostModal extends Component<IProps, IState> {
  static contextType = AppContext;

  // static getDerivedStateFromProps(props: IProps, state: IState) {
  //   if (props.quotedContent && !state.content) {
  //     return { content: props.quotedContent };
  //   }
  //   return null;
  // }

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      layout: this.getInitialLayout(),
      mentions: [],
      loadedDraftIndicator: false,
    }
  }

  // this can't be inside a state initializer, as getInitialContent can also *change* state, so we need to make sure the component is mounted. trying to set state in a constructor is a memory leak
  componentDidMount() {
    this.setContent(this.getInitialContent());
  }

  componentDidUpdate(oldProps: IProps) {
    if (oldProps.cacheKey !== this.props.cacheKey) {
      this.setContent(this.getInitialContent());
    }
  }

  render() {
    const ifLayoutsAreAvailable = `
      d-none d-${EDITOR_LAYOUTS_AVAILABLE_AT}-block
    `;

    const unlessLayoutsAreAvailable = `
      d-block d-${EDITOR_LAYOUTS_AVAILABLE_AT}-none
    `;

    return (
      <Modal dialogClassName="PostModal modal-dialog-centered" show={this.props.show} onHide={this.props.close} keyboard={false}>
        <Modal.Header className="flex flex-v-center">
          <Modal.Title>
            {this.getModalTitle()}
          </Modal.Title>

          {this.getDraftIndicator()}

          <div className="flex-grows" />

          <div className={ifLayoutsAreAvailable}>
            <LayoutSwitcher
              layout={this.state.layout}
              setLayoutCallback={this.setLayoutCallback}
            />
          </div>

          <SubmitButton
            isEditingPost={this.isEditingPost()}
            disabled={!this.canSubmitPost()}
          />
        </Modal.Header>

        {/*
          doing it this way is fine, but it means you're rendering two 
          <Preview /> elements which is what does the actual bbcode parsing
          this may be inefficient, and if you ever experience lag when using this menu you may want to add a method to *this* component to do the parsing and pass it down as a prop - so it only gets done once

          alternatively you could give the parser a way to memoize strings so parsing the same thing twice is instant, maybe? look into this if possible.
        */}

        <div className={unlessLayoutsAreAvailable}>
          <TabbedLayout
            content={this.state.content}
            setContent={this.setContentAndResetDraftIndicator}
          />
        </div>

        <div className={ifLayoutsAreAvailable}>
          <LayoutContainer
            layout={this.state.layout}
            content={this.state.content}
            setContent={this.setContentAndResetDraftIndicator}
          />
        </div>
      </Modal>
    )
  }

  getModalTitle() {
    if (this.isEditingPost()) {
      return (
        <>
          Edit <Pronoun of={this.props.post.user} /> post
        </>
      )
    } else {
      return (
        <>
          Reply <span className="d-none d-md-inline">to "{this.props.thread.title}"</span>
        </>
      );
    }
  }

  getDraftIndicator() {
    if (!this.state.loadedDraftIndicator) {
      return null;
    }

    return (
      <Button variant="outline-primary" className="revert-draft" onClick={this.revertDraft}>
        Revert Draft
      </Button>
    )
  }

  getInitialContent(skipDrafts = false): string {
    const { cacheKey: key, post } = this.props;

    
    let defaultContent;
    if (post) {
      defaultContent = post.content;
    } else {
      defaultContent = '';
    }
    
    // we don't want to early return, so instead we use this
    let returnValue = defaultContent;
    // there are times when we loaded a draft but don't want to indicate it to the user - typically when the draft is the same as the base content.
    let visiblyLoadedDraft = false;

    if (!skipDrafts) {
      const draft = localStorage.getItem(lsKey(key));
      if (draft) {
        if (draft !== defaultContent) {
          visiblyLoadedDraft = true;
        }
        returnValue = draft;
      }

      const cache = CONTENT_CACHE[key];
      if (cache) {
        if (cache !== defaultContent) {
          visiblyLoadedDraft = true;
        }
        returnValue = cache;
      }
    }

    this.setDraftIndicator(visiblyLoadedDraft);
    return returnValue;
  }

  getInitialLayout(): EditorLayout {
    const layout = localStorage.getItem(LAYOUT_LOCALSTORAGE_KEY)
      || DEFAULT_LAYOUT;

    return layout as EditorLayout;
  }

  isEditingPost(): boolean {
    return !!this.props.post;
  }

  setContent = (content: string, callback?: () => void) => {
    this.setState({ content }, () => {
      this.cacheEdits(content);

      if (callback) {
        callback();
      }
    });
  }

  setContentAndResetDraftIndicator = (content: string, callback?: () => void) => {
    this.setContent(content, () => {
      this.setDraftIndicator(false);
      
      if (callback) {
        callback();
      }
    })
  }

  cacheEdits = (content: string) => {
    const { cacheKey } = this.props;

    CONTENT_CACHE[cacheKey] = content;
    localStorage.setItem(lsKey(cacheKey), content);
  }

  setDraftIndicator = (loadedDraftIndicator: boolean) => {
    this.setState({ loadedDraftIndicator });
  }

  revertDraft = () => {
    this.setContent(this.getInitialContent(true));
  }

  canSubmitPost() {
    const gt0 = this.state.content.length > 0; 
    
    if (this.isEditingPost()) {
      return gt0 && this.state.content !== this.props.post.content;
    }

    return gt0;
  }

  setLayoutCallback = (layout: EditorLayout): (() => void) => {
    return () => {
      this.setState({ layout });
      localStorage.setItem(LAYOUT_LOCALSTORAGE_KEY, layout);
    }
  }
}
