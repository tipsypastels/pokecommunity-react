export default interface ContentMetaInterface {
  id: number;
  type: string;
  excerpt?: string;

  thumbnail?: {
    small?: string;
    medium?: string;
    large?: string;
  }
}