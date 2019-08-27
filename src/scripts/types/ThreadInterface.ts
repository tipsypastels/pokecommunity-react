import PostInterface from './PostInterface';
import ForumInterface from './ForumInterface';
import PollInterface from './PollInterface';
import ContentMetaInterface from './ContentMetaInterface';
import UserInterface from './UserInterface';

export default interface ThreadInterface {
  id: number;
  userid: number;
  forumid: number;

  title: string;
  username: string;
  created: number;

  open: number;
  sticky: number;
  visible: number;
  views: number;

  poll?: PollInterface;
  contentMeta?: ContentMetaInterface;

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