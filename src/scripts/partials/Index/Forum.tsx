import React, { Component } from 'react';
import Icon from '../Icon';
import ForumInterface from '../../types/ForumInterface';
import { relativeDateOf } from '../../helpers/DateHelpers';
import SmartLink from '../SmartLink';


export default class Forum extends Component<ForumInterface>{
  // TODO probably change the default icon
  defaultIcon = "https://www.pokecommunity.com/uploads/imageshare/31_1564205383355311634.png";

  render() {
    const {
      id,
      title,
      description,
      viewers,
      hasThreads,
      hasSubforums,
      icon,
    } = this.props;

    const forumLink = `/forumdisplay.php?f=${id}`;

    return (
      <div className="Forum">
        <SmartLink to={forumLink} className="forum-icon">
          <img src={icon || this.defaultIcon} alt={title} />
        </SmartLink>
        <div className="info">
          <header>
            <SmartLink to={forumLink} className="title">
              <aside className="forum-description">{description}</aside>
              <h2>
                {title}
                {viewers > 0 && this.getViewers()}
              </h2>
            </SmartLink>
            {hasSubforums && this.getSubforums() }
          </header>
          {hasThreads && this.getLastPosts() } 
        </div>
      </div> 
    )
  }

  getViewers() {
    const viewers = this.props.viewers;
    return (
      <small className="viewers"><Icon fw name="eye" /> {viewers}</small>
    )
  }

  getSubforums() {
    return this.props.subforums.map(forum => (
      <ul className="subforums" key={forum.id}>
        <div>
          <SmartLink 
            to={`/forumdisplay.php?f=${forum.id}`} 
            title={forum.title} 
            className="subforum"
          >
            <img 
              src={forum.icon || this.defaultIcon} 
              alt={forum.title} 
            />
          </SmartLink>
        </div>
      </ul>
    ));
  }

  getLastPosts() {
    const { 
      lastPostDate,
      lastPostUsername,
      lastThreadTitle,
      lastThreadId,
    } = this.props;

    const newPostsLink = `/threads/${lastThreadId}?goto=new`;
    const authorLink = `/member.php?username=${lastPostUsername}`;

    return (
      <div className="last-posts">
        <div className="last-posts-meta">
          <SmartLink 
            className="last-post-title" 
            to={newPostsLink}
            title={lastThreadTitle}
          >
            {lastThreadTitle}
          </SmartLink>

          <span className="author align-right">
            <SmartLink to={newPostsLink} className="last-post-link-time">
              <span className="time">
                {relativeDateOf(lastPostDate)}
              </span>
            </SmartLink>

            <span className="by"> 
              &nbsp;by&nbsp;
              <SmartLink to={authorLink} className="by-line">
                {lastPostUsername}
              </SmartLink>
              
              &nbsp;

              <SmartLink to={newPostsLink} className="last-post-link">
                <Icon fw name="chevron-circle-right" />
              </SmartLink>
            </span>
          </span>
        </div>
      </div>
    )
  }
}