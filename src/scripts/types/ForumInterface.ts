export default interface ForumInterface {
  id: number;
  title: string;
  description: string;
  viewers: number;

  /* Check if forum is a link redirect or empty category */
  hasThreads: boolean;
  lastPostDate?: number;
  lastPostUsername?: string;
  lastThreadTitle?: string;
  lastThreadId?: number;

  hasSubforums: boolean;
  subforums?: ForumInterface[];

  icon?: string;
  banner?: string;

  canCreateThreads: boolean;
  canModerate: boolean;
}