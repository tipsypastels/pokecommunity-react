import React, { useContext } from 'react';
import LazyAsyncDropdown from './LazyAsyncDropdown';
import AppContext from '../../../../AppContext';
import ClickableNotification from './ClickableNotification';

export default function Messages() {
  const [{ messages }, appDispatch] = useContext(AppContext);

  return (
    <LazyAsyncDropdown
      title="Messages"
      icon="envelope"
      refreshUrl="/messages"
      markAsReadUrl="/messages/mark-as-read"
      current={messages}
      setCurrent={messages => {
        appDispatch({ type: 'SET_MESSAGES', messages });
      }}
      emptyState={{
        title: 'No Messages',
        icon: 'envelope',
        description: 'You’ll receive notifications when other members send you messages or post to your profile.',
      }}
    >
      {notif => <ClickableNotification {...notif} />}
    </LazyAsyncDropdown>
  )
}