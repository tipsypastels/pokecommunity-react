export function addOrUpdateToast(id){
    const [{ toasts }, appDispatch] = this.context

    const newToast = this.createNewToast()

    const newToasts = [...toasts.filter(toast => toast.props.id !== id), newToast]

    appDispatch({ type: 'TOAST', toasts: newToasts });
}
