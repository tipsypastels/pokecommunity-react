import React, { Component } from 'react'
import Icon from '../Icon';
import { Badge } from 'react-bootstrap';

interface IProps {
  canModerate: boolean;
  canReply: boolean;
  selectedPostsCount: number;
  openEditor: () => void;
  openModerationModal: () => void;
  deselectPosts: () => void;
}

export default class FloatingActions extends Component<IProps> {
  render() {
    return (
      <div className="FloatingActions">
        {this.getModerationAction()}
        {this.getCloseAction()}
        {this.getReplyAction()}
      </div>
    )
  }

  getModerationAction() {
    if (this.props.canModerate) {
      return (
        <div className="action action-secondary" onClick={this.props.openModerationModal}>
          <Icon name="cog" fw />
        </div>
      );
    }
  }

  getReplyAction() {
    if (this.props.canReply) {
      let replyBadge;
      if (this.props.selectedPostsCount > 0) {
        replyBadge = (
          <Badge
            variant="light" 
            className="action action-reply-badge"
          >
            {this.props.selectedPostsCount}
          </Badge>
        );
      }

      return (
        <div className="action-reply-container">
          {replyBadge}
          <div
            className="action action-reply"
            onClick={this.props.openEditor}
          >
            <Icon name="pencil" fw />
          </div>
        </div>

      );
    }
  }

  getCloseAction() {
    if (this.props.selectedPostsCount > 0) {
      return (
        <div
          className="action action-secondary"
          onClick={this.props.deselectPosts}
        >
          <Icon name="times" fw />
        </div>
      );
    }
  }
}