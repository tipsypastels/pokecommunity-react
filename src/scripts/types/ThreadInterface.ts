import PostInterface from './PostInterface';
import ForumInterface from './ForumInterface';
import UserInterface from './UserInterface';

export default interface ThreadInterface {
  threadid: number;
  postuserid: number;
  forumid: number;

  title: string;
  postusername: string;
  dateline: number;

  open: boolean;
  views: number;

  banner?: string;

  // User is optional, as most of the important data like username and id is cached in the thread table.
  // This maybe isn't the best way to work this out..
  // split user interface into User (minimal) and UserWithMetadata?
  // TODO consider this
  user?: UserInterface;

  forum: ForumInterface;
  posts: PostInterface[];
  repliesCount: number;

  canReactToPosts: boolean;
  canSharePosts: boolean;
  canReply: boolean;
  canModerate: boolean;

  totalPages: number;
}