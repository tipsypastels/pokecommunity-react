import PostInterface from './PostInterface';
import ForumInterface from './ForumInterface';

export default interface ThreadInterface {
  threadid: number;
  postuserid: number;
  forumid: number;

  title: string;
  postusername: string;

  open: boolean;
  views: number;

  banner?: string;

  forum: ForumInterface;
  posts: PostInterface[];
  repliesCount: number;

  canReactToPosts: boolean;
  canSharePosts: boolean;
  canReply: boolean;
  canModerate: boolean;
}