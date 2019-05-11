import PostInterface from './PostInterface';

export default interface ThreadInterface {
  threadid: number;
  postuserid: number;
  forumid: number;

  title: string;
  postusername: string;

  open: boolean;
  views: number;

  banner?: string;

  posts: PostInterface[];
}