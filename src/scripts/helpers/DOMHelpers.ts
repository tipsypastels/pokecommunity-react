export function nodeOrParentMatching(node: HTMLElement, callback: (node: HTMLElement) => boolean) {
  do {
    if (callback(node)) {
      return true;
    }
    node = node.parentElement;
  } while (node);
  return false;
}