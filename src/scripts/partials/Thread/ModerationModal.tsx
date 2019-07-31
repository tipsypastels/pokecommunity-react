import React, { Component, ReactNode } from 'react'
import { Modal } from 'react-bootstrap';
import Icon, { IconProps } from '../Icon';
import { If, Then, Else } from 'react-if';
import { Button } from 'react-bootstrap';
import pluralize from 'pluralize';

import ThreadInterface from '../../types/ThreadInterface';
import PostInterface from '../../types/PostInterface';

import '../../../styles/modules/Thread/ModerationModal.scss';
import PostVisibility from '../../types/PostVisibility';

interface IProps {
  show: boolean;
  thread: ThreadInterface;
  selectedPosts: PostInterface[];
  closeModal: () => void;
}

export interface ModerationTool {
  name: string;
  className: string;
  icon: string;
  action: string | (() => void);
  if?: boolean | ((post: PostInterface) => boolean);
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
              When managing the current thread, you can...
            </strong>

            <div className="moderation-modal-tools moderate-thread">
              {this.toolFor({
                name: 'Edit Thread',
                className: 'edit-thread',
                icon: 'edit',
                action: '#',
              })}

              {/* TODO change thread state once newcore outputs that */}

              <If condition={!!thread.open}>
                <Then>
                  {this.toolFor({
                    name: 'Close Thread', 
                    className: 'close-thread', 
                    icon: 'lock',
                    action: '#',
                  })}
                </Then>
                <Else>
                  {this.toolFor({
                    name: 'Open Thread',
                    className: 'open-thread',
                    icon: 'unlock',
                    action: '#',
                  })}
                </Else>
              </If>

              <If condition={!!thread.sticky}>
                <Then>
                  {this.toolFor({
                    name: 'Unsticky Thread',
                    className: 'unstick-thread',
                    icon: 'map-marker-times',
                    action: '#',
                  })}
                </Then>
                <Else>
                  {this.toolFor({
                    name: 'Sticky Thread',
                    className: 'stick-thread',
                    icon: 'map-marker-check',
                    action: '#',
                  })}
                </Else>
              </If>

              {this.toolFor({
                name: 'Move Thread',
                className: 'move-thread',
                icon: 'sign',
                action: '#',
              })}

              {this.toolFor({
                name: 'Copy Thread',
                className: 'copy-thread',
                icon: 'copy',
                action: '#',
              })}

              {this.toolFor({
                name: 'Delete Thread',
                className: 'delete-thread',
                icon: 'trash',
                action: '#',
              })}

              {this.toolFor({
                name: 'Merge Threads',
                className: 'merge-threads',
                icon: 'code-merge',
                action: '#',
              })}

              {this.toolFor({
                name: 'Manage Pins',
                className: 'manage-pins',
                icon: 'thumbtack',
                action: '#',
              })}

              {this.toolFor({
                name: 'Remove Redirects',
                className: 'remove-redirects',
                icon: 'unlink',
                action: '#',
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
                    You have {selectedPosts.length} {postsPhrase.toLowerCase()} selected. When managing, you can...
                  </strong>

                  <div className="moderation-modal-tools moderate-posts">
                    {this.toolFor({
                      name: `Move ${postsPhrase}`,
                      className: 'move-posts',
                      icon: 'sign',
                      action: '#',
                    })}

                    {this.toolFor({
                      name: `Copy ${postsPhrase}`,
                      className: 'copy-posts',
                      icon: 'copy',
                      action: '#',
                    })}

                    {this.toolFor({
                      name: `Delete ${postsPhrase}`,
                      className: 'delete-posts',
                      icon: 'trash',
                      action: '#',
                      if: post => post.visible !== PostVisibility.Deleted,
                    })}

                    {this.toolFor({
                      name: `Spam ${postsPhrase}`,
                      className: 'spam-posts',
                      icon: 'robot',
                      action: '#',
                      if: post => post.visible !== PostVisibility.Deleted,
                    })}

                    {this.toolFor({
                      name: `Undelete ${postsPhrase}`,
                      className: 'undelete-posts',
                      icon: 'trash-restore',
                      action: '#',
                      if: post => post.visible === PostVisibility.Deleted,
                    })}

                    {this.toolFor({
                      name: 'Merge Posts',
                      className: 'merge-posts',
                      icon: 'code-merge',
                      action: '#',
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

  // TODO add the actions
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
      actionProp = { href: tool.action }
    } else {
      actionProp = { onClick: tool.action };
    }

    return (
      <a 
        className={`moderation-tool ${tool.className}`} 
        {...actionProp}
      >
        <div className="icon-wrapper">
          <Icon name={tool.icon} fw />
        </div>

        <div className="tool-name">
          {tool.name}
        </div>
      </a>
    )
  }

  anyPostsWith(callback: (post: PostInterface) => boolean): boolean {
    return this.props.selectedPosts.some(callback);
  }
}
