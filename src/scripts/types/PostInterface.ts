import PostUserInterface from './PostUserInterface';
import StaffPostGroupInterface from './StaffPostGroupInterface';

export default interface PostInterface {
  id: number;
  threadid: number;
  userid: number;

  username: string;
  content: string;
  created: number;
  visible: number;

  staffPostGroup?: StaffPostGroupInterface;

  canEdit: boolean;

  user: PostUserInterface;
}