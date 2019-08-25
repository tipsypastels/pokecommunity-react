export default interface DailyArticleInterface {
  id: number;
  title: string;
  link: string;
  thumbnail: string;
  excerpt: string;
  author: string;
  authorSlug: string;
  content: string;
  date: Date;
  status: 'publish' 
    | 'future' 
    | 'draft' 
    | 'pending' 
    | 'private' 
    | 'trash' 
    | 'auto-draft'
    | 'inherit';
}