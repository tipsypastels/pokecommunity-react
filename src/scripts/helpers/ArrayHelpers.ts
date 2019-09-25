export function mapNumericRange<T>(min: number, max: number, callback: (cur: number) => T): T[] {
  const ary: T[] = [];

  for (let i = min; i < max; i++) {
    ary.push(callback(i));
  }

  return ary;
}

export function partitionThenMap<T, R = T>(ary: T[], partition: number, callback: (current: T[], key: number) => R): R[] {
  const result: R[] = [];

  for (let i = 0; i < Math.ceil(ary.length / partition); i++) {
    const slice = ary.slice(i * partition, i * partition + partition);
    result.push(callback(slice, result.length));
  }

  return result;
}