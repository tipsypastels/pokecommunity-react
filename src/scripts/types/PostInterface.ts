import PostUserInterface from './PostUserInterface';
import UsergroupInterface from './UsergroupInterface';

export default interface PostInterface {
  id: number;
  threadid: number;
  userid: number;

  username: string;
  content: string;
  created: number;

  staffPostGroup?: UsergroupInterface;

  canEdit: boolean;

  user: PostUserInterface;
}