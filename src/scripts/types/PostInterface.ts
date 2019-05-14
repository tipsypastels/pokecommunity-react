import UserInterface from './UserInterface';

export default interface PostInterface {
  postid: number;
  threadid: number;
  userid: number;

  username: string;
  content: string;
  dateline: number;

  canEdit: boolean;

  user: UserInterface;
}