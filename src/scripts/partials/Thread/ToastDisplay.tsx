import React, { Component } from 'react'
import AppContext from '../../AppContext';

export default class ToastDisplay extends Component {
  static contextType = AppContext

  render() {
    return (
      <div className="ToastDisplay">
        {this.showToast()}
      </div>
    )
  }

  showToast() {
    const [{ toasts }, appDispatch] = this.context
    const toastsToDisplay = (toasts.length > 1) ? '' : (
      toasts.map(function(toast){
        return <div>{toast}</div>
      })
    )
    return <div>{toastsToDisplay}</div>
  }
}