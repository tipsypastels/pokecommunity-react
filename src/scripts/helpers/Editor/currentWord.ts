type CacheKey = [string, number, number]; // tuple
const CURRENT_WORD_CACHE = new Map<CacheKey, string>();

/**
 * Given a block of text and a cursor start/end position in it, this will extract the current word. It uses memoization, so passing in the same args will be much faster the second time.
 * @param value The entire text of the block
 * @param selectionStart The starting cursor position
 * @param selectionEnd The ending cursor position
 */
export function currentWord(value: string, selectionStart?: number, selectionEnd?: number): string | null {
  const cache = CURRENT_WORD_CACHE
    .get([value, selectionStart, selectionEnd]);

  if (cache) {
    return cache;
  }

  // if the textarea is unfocused, there is no current word
  if (typeof selectionStart === 'undefined' || typeof selectionEnd === 'undefined') {
    return null;
  }

  // if a selection is being made, it is not possible to consistently determine a "current word" as the selection area can encompass multiple words. it's probably fine to just disable it in this case
  if (selectionStart !== selectionEnd) {
    return null;
  }

  let wordEndPos = value.indexOf(' ', selectionEnd);
  if (wordEndPos === -1) {
    wordEndPos = value.length;
  }

  const words = /\S+$/.exec(value.slice(0, wordEndPos));
  if (!words) {
    return null;
  }

  const word = words[0];

  CURRENT_WORD_CACHE.set(
    [value, selectionStart, selectionEnd],
    word,
  );

  return word;
}

export function currentWordBounds(value: string, selectionStart: number, selectionEnd: number): { start: number, end: number } {
  // if the textarea is unfocused, there is no current word
  if (typeof selectionStart === 'undefined' || typeof selectionEnd === 'undefined') {
    return null;
  }

  // if a selection is being made, it is not possible to consistently determine a "current word" as the selection area can encompass multiple words. it's probably fine to just disable it in this case
  if (selectionStart !== selectionEnd) {
    return null;
  }

  let wordEndPos = value.indexOf(' ', selectionEnd);
  if (wordEndPos === -1) {
    wordEndPos = value.length;
  }

  const words = /\S+$/.exec(value.slice(0, wordEndPos));
  if (!words) {
    return null;
  }

  const word = words[0];

  return { start: wordEndPos - word.length, end: wordEndPos };
}