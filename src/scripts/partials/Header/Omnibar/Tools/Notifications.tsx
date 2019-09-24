import React, { useContext } from 'react';

import MinimalUserInterface from '../../../../types/MinimalUserInterface';
import LazyAsyncDropdown from './LazyAsyncDropdown';
import AppContext from '../../../../AppContext';

export interface Notification {
  id: number;
  forUser: MinimalUserInterface;
  fromUser: MinimalUserInterface;
  category: string;
  type: string;
  content: number;
  read: number;
  archived: number;
  seen: number;
  date: string;
  time: string;
}

export default function Notifications() {
  const { notifications, setNotifications } = useContext(AppContext);

  return (
    <LazyAsyncDropdown
      title="Notifications"
      responseKey="notifications"
      refreshUrl="/notifications"
      markAsReadUrl="/notifications/mark-as-read"
      current={notifications}
      setCurrent={setNotifications}
      emptyState={{
        title: 'No Notifications',
        icon: 'comments',
        description: 'You’ll receive notifications when other members respond to or like your posts, when you receive friend requests.',
      }}
    />
  );
}