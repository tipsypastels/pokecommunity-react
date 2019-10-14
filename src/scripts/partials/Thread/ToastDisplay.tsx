import React, { useContext } from 'react'
import AppContext from '../../AppContext';
import { Toast } from 'react-bootstrap';
import { TOAST_TIMEOUT } from '../../helpers/Toasts/ToastsContainer';
import Icon from '../Icon';

export default function ToastDisplay() {
  const [{ toasts }, appDispatch] = useContext(AppContext);

  return (
    <div className="ToastDisplay">
      {toasts.map(toast => (
        <Toast 
          id={`toast-${toast.slug}`} 
          key={toast.slug}
          show={toast.visible} 
          delay={TOAST_TIMEOUT} 
          autohide 
          onClose={() => {
            appDispatch({ 
              type: 'HIDE_TOAST', 
              slug: toast.slug 
            });
          }} 
        >
          <Toast.Header>
            <Icon name={toast.icon} mr={1} fw />

            <strong className="mr-auto">
              {toast.title}
            </strong>
          </Toast.Header>

          <Toast.Body>
            {toast.body}
          </Toast.Body>
        </Toast>
      ))}
    </div>
  )
}