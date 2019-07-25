import ThreadInterface from './ThreadInterface';

export interface BreadcrumbInterface {
  name: string;
  path: string;
  vb?: boolean;
}

// TODO make forums a thing
// also look into named routes
export const threadBreadcrumbs = (thread: ThreadInterface) => (
  [
    { 
      name: thread.forum.title, 
      path: `/forumdisplay.php?f=${thread.forumid}`, 
      vb: true 
    },

    { 
      name: thread.title, 
      path: `/threads/${thread.id}`
    },
  ]
);