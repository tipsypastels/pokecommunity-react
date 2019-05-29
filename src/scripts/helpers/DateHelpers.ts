export type Datelike = Date | number | string;

export const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function resolveDate(date: Datelike): Date {
  switch(typeof date) {
    case 'object':
      return date;
    case 'string':
      return new Date(date);
    case 'number':
      return new Date(date * 1000);
  }
}

// Generates the strings like "Posted today", "Seen yesterday" etc
export function lastActionHistory(action: string, date: Datelike) {
  date = resolveDate(date);

  // TODO this doesn't support "Online now" which requires us to do session stuff
  // will have to complicate that when it happens
  return `${action} ${relativeDateOf(date)}`
}

export function numericDateDiff(date1: Datelike, date2: Datelike): number {
  date1 = resolveDate(date1);
  date2 = resolveDate(date2);

  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

// Returns "today", "yesterday", or "tomorrow" if one of those is correct, otherwise just returns the formatted date.
export function relativeDateOf(date: Datelike) {
  date = resolveDate(date);
  const today = new Date();

  switch(numericDateDiff(date, today)) {
    case 0:
      return 'today';
    case -1:
      return 'tomorrow';
    case 1:
      return 'yesterday';
    default:
      return standardFormattedDate(date);
  }
}

export function standardFormattedDate(date: Datelike) {
  date = resolveDate(date);

  return date.toDateString();
}

export function yearsSince(date: Datelike) {
  date = resolveDate(date);
  return (new Date()).getFullYear() - (date).getFullYear();
}