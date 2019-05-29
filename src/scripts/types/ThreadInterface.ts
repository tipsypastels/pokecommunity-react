import PostInterface from './PostInterface';
import ForumInterface from './ForumInterface';
import UserInterface from './UserInterface';
import PollInterface from './PollInterface';

export default interface ThreadInterface {
  id: number;
  userid: number;
  forumid: number;

  title: string;
  username: string;
  created: number;

  open: number;
  sticky: boolean;
  views: number;

  banner?: string;

  poll?: PollInterface;

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