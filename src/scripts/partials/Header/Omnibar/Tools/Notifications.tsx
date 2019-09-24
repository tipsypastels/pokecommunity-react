import React, { useContext } from 'react';

import LazyAsyncDropdown from './LazyAsyncDropdown';
import AppContext from '../../../../AppContext';
import ClickableNotification from './ClickableNotification';

export default function Notifications() {
  const { notifications, setNotifications } = useContext(AppContext);

  return (
    <LazyAsyncDropdown
      title="Notifications"
      icon="bell"
      refreshUrl="/notifications"
      markAsReadUrl="/notifications/mark-as-read"
      current={notifications}
      setCurrent={setNotifications}
      emptyState={{
        title: 'No Notifications',
        icon: 'comments',
        description: 'You’ll receive notifications when other members respond to or like your posts, when you receive friend requests.',
      }}
    >
      {notif => <ClickableNotification {...notif} />}
    </LazyAsyncDropdown>
  );
}