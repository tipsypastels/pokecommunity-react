import PostUserInterface from './PostUserInterface';

export default interface PostInterface {
  postid: number;
  threadid: number;
  userid: number;
  indexInThread: number;

  username: string;
  content: string;
  dateline: number;

  canEdit: boolean;

  user: PostUserInterface;
}