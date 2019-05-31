export default interface ForumInterface {
  id: number;
  title: string;
  banner?: string;

  canCreateThreads: boolean;
  canModerate: boolean;
}