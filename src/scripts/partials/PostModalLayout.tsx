import React, { ReactNode, useState } from 'react'
import { Modal } from 'react-bootstrap';
import LayoutSwitcher from './PostModal/LayoutSwitcher';
import TabbedLayout from './PostModal/LayoutItems/TabbedLayout';
import LayoutContainer from './PostModal/LayoutContainer';
import UsergroupInterface from '../types/UsergroupInterface';

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
  staffPostGroup?: UsergroupInterface;

  show: boolean;
  close: () => void;

  submitButton?: ReactNode;
  draftIndicator?: ReactNode;
  topRightMenus?: ReactNode;
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

        {props.topRightMenus}

        <div className={ifLayoutsAreAvailable}>
          <LayoutSwitcher
            layout={layout}
            setLayoutCallback={setLayoutCallback}
          />
        </div>

        {props.submitButton}
      </Modal.Header>

      <div className={unlessLayoutsAreAvailable}>
        <TabbedLayout
          content={props.content}
          setContent={props.setContent}
          setMentions={props.setMentions}
          staffPostGroup={props.staffPostGroup}
        />
      </div>

      <div className={ifLayoutsAreAvailable}>
        <LayoutContainer
          layout={layout}
          content={props.content}
          setContent={props.setContent}
          setMentions={props.setMentions}
          staffPostGroup={props.staffPostGroup}
        />
      </div>
    </Modal>
  )
}