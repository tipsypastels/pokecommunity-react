import { currentWord, currentWordBounds } from './currentWord';

interface TextareaTransformerOpts {
  textarea: HTMLTextAreaElement;
  onChange: (value: string) => void;
}

export default class TextareaTransformer {
  textarea: HTMLTextAreaElement;
  onChange: (value: string) => void;

  constructor(opts: TextareaTransformerOpts) {
    this.textarea = opts.textarea;
    this.onChange = opts.onChange;
  }

  get value() {
    return this.textarea.value;
  }

  set value(value: string) {
    this.textarea.value = value;
    this.onChange(value);
  }

  get selectionStart() {
    return this.textarea.selectionStart;
  }

  set selectionStart(value: number) {
    this.textarea.selectionStart = value;
  }

  get selectionEnd() {
    return this.textarea.selectionEnd;
  }

  set selectionEnd(value: number) {
    this.textarea.selectionEnd = value;
  }

  get currentWord() {
    if (this.textarea) {
      return currentWord(this.value, this.selectionStart, this.selectionEnd);
    }
  }

  getCurrentWordBounds() {
    if (this.textarea) {
      return currentWordBounds(this.value, this.selectionStart, this.selectionEnd);
    }
  }

  /**
   * Browser compatibility for inserting text is a little inconsistent. Most seem to support insertText, but not firefox. With firefox we can change the value directly, but then need to trigger the callback ourselves so the state gets changed. That's not necessary for insertText.
   */
  insert(text: string) {
    this.textarea.focus();
    
    if (navigator.userAgent.search('Firefox') !== -1) {
      this.insertTextOnFirefox(text);
    } else {
      document.execCommand('insertText', false, text);
    }
  }

  insertTag(tag: string, tagValue?: string) {
    const { textarea } = this;
    textarea.focus();

    const { selectionStart, selectionEnd } = textarea;
    const { openTag, closeTag } = openAndCloseTags(tag, tagValue);

    let selectedContent = this.value.slice(selectionStart, selectionEnd);
    let insertContent = openTag + selectedContent + closeTag;

    this.insert(insertContent);

    textarea.selectionStart -= closeTag.length + selectedContent.length;
    textarea.selectionEnd -= closeTag.length;
  }

  replaceCurrentWordWith(text: string) {
    const { start, end } = this.getCurrentWordBounds();
    
    this.selectionStart = start;
    this.selectionEnd = end;

    this.insert(text);
  }

  focus() {
    if (this.textarea) {
      this.textarea.focus();
    }
  }

  // Firefox doesn't support insertText
  private insertTextOnFirefox(text: string) {
    const { value, selectionStart, selectionEnd } = this;
    const valueBefore = value.slice(0, selectionStart);
    const valueAfter  = value.slice(selectionEnd);
    
    const newValue = valueBefore + text + valueAfter;
    this.value = newValue;
  }
}

function openAndCloseTags(tag: string, tagValue?: string) {
  const openTag = tagValue
    ? `[${tag}="${tagValue}"]`
    : `[${tag}]`;

  const closeTag = `[/${tag}]`;
  return { openTag, closeTag };
}