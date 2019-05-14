import MiniBiographyInterface from './MiniBiographyInterface';

export default interface UserInterface {
  userid: number;
  username: string;
  avatarURL?: string;

  postCount: number;
  yearCount: number;

  miniBiography: MiniBiographyInterface;
}