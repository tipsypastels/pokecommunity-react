export default interface ForumInterface {
  id: number;
  title: string;
  icon?: string;
  banner?: string;

  canCreateThreads: boolean;
  canModerate: boolean;
}