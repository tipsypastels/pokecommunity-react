export interface ToastMessageOpts {
  slug: string;
  title: string;
  body: string;
  icon: string;
  color: string;
  visible?: boolean;
}

/**
 * A concrete class containing all the logic for what to display on the toasts, without being an actual component. These are not interacted with directly, but are stored in bulk in ToastsContainer.
 */
export default class ToastMessage {
  slug: string;
  title: string;
  body: string;
  icon: string;
  color: string;
  visible?: boolean;

  constructor(opts: ToastMessageOpts) {
    this.slug = opts.slug;
    this.title = opts.title;
    this.body = opts.body;
    this.icon = opts.icon;
    this.color = opts.color;
    this.visible = ('visible' in opts) ? opts.visible : true;
  }
}

export type ToastMessageOrOpts =
  | ToastMessage
  | ToastMessageOpts;