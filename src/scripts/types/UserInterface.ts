import MiniBiographyInterface from './MiniBiographyInterface';
import PostFlairInterface from './PostFlairInterface';

export default interface UserInterface {
  userid: number;
  username: string;
  avatarURL?: string;
  usertitleHTML?: string;

  postCount: number;
  yearCount: number;

  miniBiography: MiniBiographyInterface;
  postFlair: PostFlairInterface;
}