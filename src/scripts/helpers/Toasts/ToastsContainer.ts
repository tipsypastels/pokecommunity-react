import ToastMessage, { ToastMessageOrOpts } from "./ToastMessage";

export const TOAST_TIMEOUT = 4000; // 4 seconds

/**
 * Wraps a list of toasts, providing logic for adding and removing
 */
export default class ToastContainer {
  private toasts: Map<string, ToastMessage>;

  constructor(toasts: Map<string, ToastMessage> = new Map(), removalQueue: string[] = []) {
    this.toasts = toasts;

    if (removalQueue.length) {
      setTimeout(() => {
        for (let slug of removalQueue) {
          this.toasts.delete(slug);
        }
      }, TOAST_TIMEOUT);
    }
  }

  /**
   * Adds a new toast to the list or replaces an existing one, without mutation.
   * @param toastOrOpts A ToastMessage object or the options to create such.
   */
  with(toastOrOpts: ToastMessageOrOpts): ToastContainer {
    const toast = this.resolve(toastOrOpts);

    // duplicate the map so we don't make mutating changes
    const dupMap = new Map(this.toasts);
    dupMap.set(toast.slug, toast);

    return new ToastContainer(dupMap);
  }

  /**
   * Removes a toast from the list, without mutation. TODO delay.
   * @param slug the unique name of the toast.
   */
  without(slug: string): ToastContainer {
    const toast = this.toasts.get(slug);
    if (!toast) {
      return this;
    }

    const dupToast = { ...toast, visible: false };
    const dupMap = new Map(this.toasts);
    
    dupMap.set(slug, new ToastMessage(dupToast));
    return new ToastContainer(dupMap, [slug]);
  }

  /**
   * Takes something that may be an instanceof ToastMessage, or may be the object literal passed to its constructor, and returns a ToastMessage either way. This is used so people using this api don't have to explicitly wrap every object literal in new ToastMessage to use it.
   * @param toastOrOpts Either a ToastMessage object or the options passed to its constructor.
   */
  private resolve(toastOrOpts: ToastMessageOrOpts): ToastMessage {
    let toast: ToastMessage;

    if (toastOrOpts instanceof ToastMessage) {
      toast = toastOrOpts;
    } else {
      toast = new ToastMessage(toastOrOpts);
    }

    return toast;
  }

  map<T>(callback: (toast: ToastMessage) => T) {
    return [...this.toasts].map(([_, toast]) => {
      return callback(toast);
    });
  }
}