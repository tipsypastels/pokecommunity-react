interface InsertTagProps {
  textarea: HTMLTextAreaElement;
  content: string;

  tag: string;
  tagValue?: string;
}

export function insertTagInTextarea({ textarea, content, tag, tagValue }: InsertTagProps) {
  textarea.focus();
  
  const { selectionStart, selectionEnd } = textarea;
  const { openTag, closeTag } = openAndCloseTags(tag, tagValue);

  let selectedContent = content.slice(selectionStart, selectionEnd);
  let insertContent = openTag + selectedContent + closeTag;

  document.execCommand('insertText', false, insertContent);

  textarea.selectionStart -= closeTag.length + selectedContent.length;
  textarea.selectionEnd -= closeTag.length;
}

export function openAndCloseTags(tag: string, tagValue?: string) {
  const openTag = tagValue
    ? `[${tag}="${tagValue}"]`
    : `[${tag}]`;

  const closeTag = `[/${tag}]`;
  return { openTag, closeTag };
}