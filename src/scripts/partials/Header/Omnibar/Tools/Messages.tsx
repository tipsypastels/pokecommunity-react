import React, { useContext } from 'react';
import LazyAsyncDropdown from './LazyAsyncDropdown';
import AppContext from '../../../../AppContext';
import ClickableNotification from './ClickableNotification';
import Action from '../../../Action';

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
      additionalControls={
        <React.Fragment>
          <Action 
            name="Inbox"
            icon="inbox"
            href="/private.php"
          />

          <Action
            name="New Message"
            icon="pencil"
            href="/private.php?do=newpm"
          />
        </React.Fragment>
      }
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