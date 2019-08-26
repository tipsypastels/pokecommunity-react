export default interface DeletionLogInterface {
  id: number;
  type: 'post' | 'thread';
  userid: number;
  username: string;
  reason: string;
  deletedAt: number;
}