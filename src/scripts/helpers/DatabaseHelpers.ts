export function idObjectsEqual(a: { id: number }, b: { id: number }) {
  if (!a && !b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  if (a.id === b.id) {
    return true;
  }
}