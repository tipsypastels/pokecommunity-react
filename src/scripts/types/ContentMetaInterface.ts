export default interface ContentMetaInterface {
  id: number;
  type: string;
  excerpt?: string;
  dailyArticle: number;

  thumbnail?: {
    small?: string;
    medium?: string;
    large?: string;
  }
}