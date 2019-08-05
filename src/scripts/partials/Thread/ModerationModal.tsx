import React, { Component, ReactNode } from 'react'
import { Modal } from 'react-bootstrap';
import Icon from '../Icon';
import { If, Then, Else } from 'react-if';
import pluralize from 'pluralize';

import ThreadInterface from '../../types/ThreadInterface';
import PostInterface from '../../types/PostInterface';
import PostVisibility from '../../types/PostVisibility';
import SmartLink, { SmartLinkFormData } from '../SmartLink';

interface IProps {
  show: boolean;
  thread: ThreadInterface;
  selectedPosts: PostInterface[];
  closeModal: () => void;
}

export interface ModerationTool {
  name: string;
  icon: string;
  action: string | (() => void);
  formData?: SmartLinkFormData;
  if?: boolean | ((post: PostInterface) => boolean);
  method?: 'get' | 'post';
}

export default class ModerationModal extends Component<IProps> {
  render() {
    const { thread, selectedPosts } = this.props;

    return (
      <Modal dialogClassName="ModerationModal modal-dialog-centered" show={this.props.show} onHide={this.props.closeModal} keyboard={false}>
        <Modal.Header className="flex" closeButton>
          <Modal.Title className="flex-grows">
            <span style={{ color: 'steelblue' }}>
              Moderation
            </span> Tools
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="manage-thread">
            <strong>
              Manage this thread:
            </strong>

            <div className="moderation-modal-tools moderate-thread">
              {this.threadTool({
                name: 'Edit Thread',
                icon: 'edit',
                do: 'editthread',
              })}

              {this.threadTool({
                name: 'Publish Thread',
                icon: 'megaphone',
                do: 'publishthread',
                if: thread.visible !== PostVisibility.Published,
              })}

              {this.threadTool({
                name: 'Reject Thread',
                icon: 'angry',
                do: 'rejectthread',
                if: thread.visible === PostVisibility.Moderated,
              })}

              {this.threadTool({
                name: 'Unpublish Thread',
                icon: 'eye-slash',
                do: 'moderatethread',
                if: thread.visible === PostVisibility.Published,
              })}

              <If condition={!!thread.open}>
                <Then>
                  {this.threadTool({
                    name: 'Close Thread', 
                    icon: 'lock',
                    do: 'openclosethread',
                  })}
                </Then>
                <Else>
                  {this.threadTool({
                    name: 'Open Thread',
                    icon: 'unlock',
                    do: 'openclosethread',
                  })}
                </Else>
              </If>

              <If condition={!!thread.sticky}>
                <Then>
                  {this.threadTool({
                    name: 'Unsticky Thread',
                    icon: 'map-marker-times',
                    do: 'stick',
                  })}
                </Then>
                <Else>
                  {this.threadTool({
                    name: 'Sticky Thread',
                    icon: 'map-marker-check',
                    do: 'stick',
                  })}
                </Else>
              </If>

              {this.threadTool({
                name: 'Move Thread',
                icon: 'sign',
                do: 'movethread',
              })}

              {this.threadTool({
                name: 'Copy Thread',
                icon: 'copy',
                do: 'copythread',
              })}

              {this.threadTool({
                name: 'Delete Thread',
                icon: 'trash',
                do: 'deletethread',
              })}

              {this.threadTool({
                name: 'Merge Threads',
                icon: 'code-merge',
                do: 'mergethread',
              })}

              {this.threadTool({
                name: 'Manage Pins',
                icon: 'thumbtack',
                do: 'pinthread',
              })}

              {this.threadTool({
                name: 'Remove Redirects',
                icon: 'unlink',
                do: 'removeredirect',
              })}
            </div>

            {(() => {
              if (selectedPosts.length < 1) {
                return (
                  <strong>
                    Select some posts to view post moderation options! 
                  </strong>
                );
              }

              const postsPhrase = pluralize('Posts', selectedPosts.length);

              return (
                <React.Fragment>
                  <strong>
                    Manage {selectedPosts.length} selected {postsPhrase.toLowerCase()}:
                  </strong>

                  <div className="moderation-modal-tools moderate-posts">
                    {this.postTool({
                      name: `Move ${postsPhrase}`,
                      icon: 'sign',
                      do: 'moveposts',
                    })}

                    {this.postTool({
                      name: `Copy ${postsPhrase}`,
                      icon: 'copy',
                      do: 'copyposts',
                    })}

                    {this.postTool({
                      name: `Delete ${postsPhrase}`,
                      icon: 'trash',
                      do: 'deleteposts',
                      if: post => post.visible !== PostVisibility.Deleted,
                    })}

                    {this.postTool({
                      name: `Spam ${postsPhrase}`,
                      icon: 'robot',
                      do: 'spampost',
                      if: post => post.visible !== PostVisibility.Deleted,
                    })}

                    {this.postTool({
                      name: `Undelete ${postsPhrase}`,
                      icon: 'trash-restore',
                      do: 'undeleteposts',
                      if: post => post.visible === PostVisibility.Deleted,
                    })}

                    {this.postTool({
                      name: 'Merge Posts',
                      icon: 'code-merge',
                      do: 'mergeposts',
                      if: selectedPosts.length > 1,
                    })}
                  </div>
                </React.Fragment>
              )
            })()}
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  threadTool(tool: Partial<ModerationTool> & { do?: string }) {
    const { thread } = this.props;
  
    tool.action || (tool.action = `/postings.php?t=${thread.id}`);
    tool.formData || (tool.formData = { do: tool.do });
    tool.method || (tool.method = 'post');

    return this.toolFor(tool as ModerationTool);
  }

  postTool(tool: Partial<ModerationTool> & { do?: string }) {
    const selectedPostIds = this.props.selectedPosts
      .map(p => p.id.toString());

    tool.action || (tool.action = '/inlinemod.php');
    
    tool.formData || (tool.formData = { 
      do: tool.do, 
      plist: selectedPostIds 
    });
    
    tool.method || (tool.method = 'post');

    return this.toolFor(tool as ModerationTool);
  }

  toolFor(tool: ModerationTool): ReactNode {
    if (tool.if === false) {
      return null;
    } else if (typeof tool.if === 'function') {
      if (!this.anyPostsWith(tool.if)) {
        return false;
      }
    }

    let actionProp;
    if (typeof tool.action === 'string') {
      actionProp = { to: tool.action, formData: tool.formData }
    } else {
      actionProp = { onClick: tool.action };
    }

    return (
      <SmartLink {...actionProp} method={tool.method} className="moderation-tool">
        <div className="icon-wrapper">
          <Icon name={tool.icon} fw />
        </div>

        <div className="tool-name">
          {tool.name}
        </div>
      </SmartLink>
    )
  }

  anyPostsWith(callback: (post: PostInterface) => boolean): boolean {
    return this.props.selectedPosts.some(callback);
  }
}
