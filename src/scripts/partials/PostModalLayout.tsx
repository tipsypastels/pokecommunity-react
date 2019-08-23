import React, { ReactNode, useState } from 'react'
import { Modal } from 'react-bootstrap';
import LayoutSwitcher from './PostModal/LayoutSwitcher';
import TabbedLayout from './PostModal/LayoutItems/TabbedLayout';
import LayoutContainer from './PostModal/LayoutContainer';

export type EditorLayout = 'columns' | 'rows' | 'tabbed';

// layout is forced to switch on mobile
export const DEFAULT_LAYOUT: EditorLayout = 'tabbed';
export const LAYOUT_LOCALSTORAGE_KEY = 'pokecomm3_editorlayout';

export const EDITOR_LAYOUTS_AVAILABLE_AT = 'md';

interface IProps {
  className: string;
  title: string | ReactNode;
  content: string;
  setContent: (content: string, callback?: () => void) => void;
  setMentions: (mentions: Set<string>) => void;

  show: boolean;
  close: () => void;

  submitButton?: ReactNode;
  draftIndicator?: ReactNode;
}

/**
 * Component wraps much of the content of the post editor, but in a generic way that does not depend on the current thread, drafts, or ability to submit. This lets it be used generically for pages like the BBCode docs, which include a popup that lets you sample BBCode, but with no ability to submit.
 * 
 * Components that want a submit button or other functionality can provide ReactNodes to specified props which will be rendered as part of the modal.
 */

function getInitialLayout(): EditorLayout {
  const layout = localStorage.getItem(LAYOUT_LOCALSTORAGE_KEY)
    || DEFAULT_LAYOUT;

  return layout as EditorLayout;
}

export default function PostModalLayout(props: IProps) {
  const [layout, setLayout] = useState<EditorLayout>(getInitialLayout())

  const setLayoutCallback = (layout: EditorLayout): (() => void) => {
    return () => {
      setLayout(layout);
      localStorage.setItem(LAYOUT_LOCALSTORAGE_KEY, layout);
    }
  }

  const ifLayoutsAreAvailable = `
    d-none d-${EDITOR_LAYOUTS_AVAILABLE_AT}-block
  `;

  const unlessLayoutsAreAvailable = `
    d-block d-${EDITOR_LAYOUTS_AVAILABLE_AT}-none
  `;

  return (
    <Modal dialogClassName={`PostModalLayout ${props.className} modal-dialog-centered`} show={props.show} onHide={props.close} keyboard={false}>
      <Modal.Header className="flex flex-v-center">
        <Modal.Title>
          {props.title}
        </Modal.Title>

        {props.draftIndicator}

        <div className="flex-grows" />

        <div className={ifLayoutsAreAvailable}>
          <LayoutSwitcher
            layout={layout}
            setLayoutCallback={setLayoutCallback}
          />
        </div>

        {props.submitButton}
      </Modal.Header>

      {/*
          doing it this way is fine, but it means you're rendering two 
          <Preview /> elements which is what does the actual bbcode parsing
          this may be inefficient, and if you ever experience lag when using this menu you may want to add a method to *this* component to do the parsing and pass it down as a prop - so it only gets done once

          alternatively you could give the parser a way to memoize strings so parsing the same thing twice is instant, maybe? look into this if possible.
        */}

      <div className={unlessLayoutsAreAvailable}>
        <TabbedLayout
          content={props.content}
          setContent={props.setContent}
          setMentions={props.setMentions}
        />
      </div>

      <div className={ifLayoutsAreAvailable}>
        <LayoutContainer
          layout={layout}
          content={props.content}
          setContent={props.setContent}
          setMentions={props.setMentions}
        />
      </div>
    </Modal>
  )
}