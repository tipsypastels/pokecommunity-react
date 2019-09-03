import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import SubmitButton from './PostModal/SubmitButton';
import ThreadInterface from '../types/ThreadInterface';
import PostInterface from '../types/PostInterface';
import AppContext from '../AppContext';
import Pronoun from './Pronoun';
import PostModalLayout from './PostModalLayout';

// attachment stuff
import AttachmentMenu from './PostModal/AttachmentMenu';
import FileCollection from '../helpers/FileCollection';
import { attachments } from '../../configs/config.json';
import StaffPostOptions from './PostModal/StaffPostOptions';
import UsergroupInterface from '../types/UsergroupInterface';


// each post/new tracks its content seperately
// they're cached in here
// this won't actually persist across reloads etc
// but we do that too (drafts)
const CONTENT_CACHE = {};

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
  mentions: Set<string>;
  files: FileCollection;
  loadedDraftIndicator: boolean;
  lastInvalidFileType: string;
  staffPostGroup: UsergroupInterface;
}

// the key used for localstorage
const lsKey = (key: string) => `pokecomm3_draft_${key}`;

export default class PostModal extends Component<IProps, IState> {
  static contextType = AppContext;

  constructor(props) {
    super(props);

    const files = new FileCollection([])
      .setAllowed(attachments.allowedTypes)
      .onTypeSuccess(() => this.setState({ lastInvalidFileType: null }))
      .onTypeFailure(type => this.setState({ lastInvalidFileType: type }));

    this.state = {
      files,
      content: '',
      mentions: new Set<string>(),
      loadedDraftIndicator: false,
      lastInvalidFileType: null,
      staffPostGroup: null,
    }
  }
  
  // this can't be inside a state initializer, as getInitialContent can also *change* state, so we need to make sure the component is mounted. trying to set state in a constructor is a memory leak
  componentDidMount() {
    this.setContent(this.getInitialContent());
  }
  
  componentDidUpdate(oldProps: IProps) {
    if (oldProps.cacheKey !== this.props.cacheKey || oldProps.quotedContent !== this.props.quotedContent) {
      this.setContent(this.getInitialContent());
    }
  }
  
  render() {
    return (
      <PostModalLayout
        className="PostModal"
        title={this.getModalTitle()}
        show={this.props.show}
        close={this.props.close}
        content={this.state.content}
        setContent={this.setContentAndResetDraftIndicator}
        setMentions={this.setMentions}
        staffPostGroup={this.state.staffPostGroup}
        draftIndicator={this.getDraftIndicator()}
        topRightMenus={
          <React.Fragment>
            <AttachmentMenu 
              files={this.state.files}
              addFiles={this.addFiles}
              removeFile={this.removeFile}
              lastInvalidType={this.state.lastInvalidFileType}
            />
  
            <StaffPostOptions
              staffPostGroup={this.state.staffPostGroup}
              setStaffPostGroup={this.setStaffPostGroup}
            />
          </React.Fragment>
        }
        submitButton={
          <SubmitButton
            isEditingPost={this.isEditingPost()}
            disabled={!this.canSubmitPost()}
          />
        }
      />
    );
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
        {this.isEditingPost() ? 'Revert' : 'Clear'} Draft
      </Button>
    )
  }

  getInitialContent(skipDrafts = false): string {
    const { cacheKey: key, post, quotedContent } = this.props;
    
    let defaultContent;
    if (post) {
      defaultContent = post.content;
    } else if (quotedContent && !post) {
      defaultContent = quotedContent;
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

    // never cache just quotes, since that would take precendence over the user closing and opening the menu to change which posts are selected
    if (content && content !== this.props.quotedContent) {
      CONTENT_CACHE[cacheKey] = content;
      localStorage.setItem(lsKey(cacheKey), content);
    } else {
      delete CONTENT_CACHE[cacheKey];
      localStorage.removeItem(lsKey(cacheKey));
    }

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

  setMentions = (mentions: Set<string>) => {
    this.setState({ mentions });
  }

  addFiles = (newFiles: File[]) => {
    this.setState({ files: this.state.files.with(newFiles) })
  }

  removeFile = (removingFile: File) => {
    this.setState({ 
      files: this.state.files.without(removingFile),
      lastInvalidFileType: null,
    });
  }

  setStaffPostGroup = (staffPostGroup: UsergroupInterface) => {
    this.setState({ staffPostGroup });
  }
}
