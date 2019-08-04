import React, { Component } from 'react';

import Icon from '../Icon';

import ForumInterface from '../../types/ForumInterface';

import { relativeDateOf } from '../../helpers/DateHelpers';

import '../../../styles/modules/Index/Forum.scss';

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
    return (
      <div className="Forum">
        <a className="forum-icon" href={"/forums/" + id}>
          <img src={icon || this.defaultIcon} alt={title} />
        </a>
        <div className="info">
          <header>
            <a className="title" href={"/forums/" + id}>
              <aside className="forum-description">{description}</aside>
              <h2>
                {title}
                {viewers > 0 && this.getViewers()}
              </h2>
            </a>
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
      <ul className="subforums">
        <div>
          <a 
            href={"/forums/" + forum.id} 
            title={forum.title} 
            className="subforum"
          >
            <img 
              src={forum.icon || this.defaultIcon} 
              alt={forum.title} 
            />
          </a>
        </div>
      </ul>
    ));
  }
  getLastPosts() {
    const { 
      lastPostDate,
      lastPostUsername,
      lastThreadTitle,
      // TODO link to post with => lastThreadId,
    } = this.props;
    return (
      <div className="last-posts">
        <div className="last-posts-meta">
          <a 
            className="last-post-title" 
            href="TODO link to specific post" 
            title={lastThreadTitle}
          >
            {lastThreadTitle}
          </a>
          <span className="author align-right">
            <a className="last-post-link-time" href="1">
              <span className="time">{relativeDateOf(lastPostDate)}</span>
            </a>
            <span className="by"> 
              &nbsp;by&nbsp;
              <a href="TODO user profile link" className="by-line">{lastPostUsername}</a>
              &nbsp;
              <a href="TODO thread link" className="last-post-link"><Icon fw name="chevron-circle-right" /></a>
            </span>
          </span>
        </div>
      </div>
    )
  }
}