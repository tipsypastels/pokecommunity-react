import React from 'react';
import NotificationInterface from '../../../../types/NotificationInterface';
import { Dropdown } from 'react-bootstrap';
import SmartLink from '../../../SmartLink';
import { notificationDateFormat } from '../../../../helpers/DateHelpers';

export default function ClickableNotification(props: NotificationInterface) {
  return (
    <Dropdown.Item 
      className={`ClickableNotification ${props.read || 'unread'}`}
      {...SmartLink.shim(props.url)}
    >
      <div className="avatar-area">
        <img 
          className="avatar" 
          src={props.fromUser.avatar}
          alt={`${props.fromUser.username}'s Avatar`}
        />
      </div>

      <div className="content-area">
        <div className="top-bar">
          <div className="title">
            <strong>{props.fromUser.username}</strong> {props.action}
          </div>

          <div className="time">
            {notificationDateFormat(props.created)}
          </div>
        </div>

        <div className="content">
          {props.content}
        </div>
      </div>
    </Dropdown.Item>
  )
}
