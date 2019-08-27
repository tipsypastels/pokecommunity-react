import Post from "../partials/Post";

export default interface PostEditInterface {
  id: number;
  postid: number;
  userid: number;
  username: string;
  title: string;
  iconid: number;
  
  dateline: number;
  reason: string;
  original: number;
  content: string;
  
  post?: Post;
}