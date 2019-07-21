import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import LayoutContainer from './NewPostModal/LayoutContainer';
import LayoutSwitcher from './NewPostModal/LayoutSwitcher';
import SubmitButton from './NewPostModal/SubmitButton';
import TabbedLayout from './NewPostModal/LayoutItems/TabbedLayout';

import ThreadInterface from '../types/ThreadInterface';

import '../../styles/modules/NewPostModal.scss';

// TODO allow this to be nil or work in other contexts
// like creating new thread, all that stuff

interface IProps {
  thread: ThreadInterface;
  show: boolean;
  closeModal: () => void;
  quotedContent?: string;
}

export type EditorLayout = 'columns' | 'rows' | 'tabbed';

// layout is forced to switch on mobile
export const DEFAULT_LAYOUT: EditorLayout = 'tabbed';
export const LAYOUT_LOCALSTORAGE_KEY = 'pokecomm3_editorlayout';

export const EDITOR_LAYOUTS_AVAILABLE_AT = 'md';

interface IState {
  content: string;
  mentions: string[];
  layout: EditorLayout;
}

function getInitialLayout(): EditorLayout {
  const layout = localStorage.getItem(LAYOUT_LOCALSTORAGE_KEY) 
    || DEFAULT_LAYOUT;

  return layout as EditorLayout;
}

export default class NewPostModal extends Component<IProps, IState> {
  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.quotedContent && !state.content) {
      return { content: props.quotedContent };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      content: this.props.quotedContent || '',
      mentions: [],
      layout: getInitialLayout(),
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
      <Modal dialogClassName="NewPostModal modal-dialog-centered" show={this.props.show} onHide={this.props.closeModal} keyboard={false}>
        <Modal.Header className="flex">
          <Modal.Title className="flex-grows">
            Reply <span className="d-none d-md-inline">to "{this.props.thread.title}"</span>
          </Modal.Title>

          <div className={ifLayoutsAreAvailable}>
            <LayoutSwitcher
              layout={this.state.layout}
              setLayoutCallback={this.setLayoutCallback}
            />
          </div>

          <SubmitButton
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
            setContent={this.setContent}
          />
        </div>

        <div className={ifLayoutsAreAvailable}>
          <LayoutContainer
            layout={this.state.layout}
            content={this.state.content}
            setContent={this.setContent}
          />
        </div>
      </Modal>
    )
  }

  setContent = (content: string, callback?: () => void) => {
    this.setState({ content }, callback);
  }

  canSubmitPost() {
    return this.state.content.length > 0;
  }

  setLayoutCallback = (layout: EditorLayout): (() => void) => {
    return () => {
      this.setState({ layout });
      localStorage.setItem(LAYOUT_LOCALSTORAGE_KEY, layout);
    }
  }
}
