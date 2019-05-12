import ThreadInterface from './ThreadInterface';

export interface PaginationInterface {
  name: string;
  path: string;
}

// TODO make forums a thing
// also look into named routes
export const threadPagination = (thread: ThreadInterface) => (
  [
    { name: thread.forum.title, path: `/forum/${thread.forumid}` },
    { name: thread.title, path: `/thread/${thread.threadid}`}
  ]
);