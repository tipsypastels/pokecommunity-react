import PostUserInterface from './PostUserInterface';

export default interface PostInterface {
  id: number;
  threadid: number;
  userid: number;

  username: string;
  content: string;
  created: number;

  canEdit: boolean;

  user: PostUserInterface;
}