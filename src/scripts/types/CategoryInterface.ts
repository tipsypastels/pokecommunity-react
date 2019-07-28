import ForumInterface from './ForumInterface';

export default interface CategoryInterface {
  id: number;
  title: string;
  forums?: ForumInterface[];
}