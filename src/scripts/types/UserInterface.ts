import MiniBiographyInterface from './MiniBiographyInterface';

export default interface UserInterface {
  userid: number;
  username: string;
  avatarURL?: string;
  usertitleHTML?: string;

  postCount: number;
  yearCount: number;

  miniBiography: MiniBiographyInterface;
}