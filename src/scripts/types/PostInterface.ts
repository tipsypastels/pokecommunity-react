import PostUserInterface from './PostUserInterface';
import StaffPostGroupInterface from './StaffPostGroupInterface';
import DeletionLogInterface from './DeletionLogInterface';
import PostEditInterface from './PostEditInterface';

export default interface PostInterface {
  id: number;
  threadid: number;
  userid: number;

  username: string;
  content: string;
  created: number;
  visible: number;

  staffPostGroup?: StaffPostGroupInterface;
  deletion?: DeletionLogInterface;

  canEdit: boolean;

  everEdited: boolean;
  edits?: PostEditInterface[];

  user: PostUserInterface;
}