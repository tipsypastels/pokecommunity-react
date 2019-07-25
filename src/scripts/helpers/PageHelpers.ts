export const pageNumber = (page) => {
  let pageNumber = Number(page);
  return pageNumber >= 1 ? pageNumber : 1;
}