import MiniBiographyInterface from './MiniBiographyInterface';
import PostFlairInterface from './PostFlairInterface';

export default interface UserInterface {
  userid: number;
  username: string;
  avatarURL?: string;
  usertitleHTML?: string;

  /*
    Below this are aspects of the PostUser interface, which
    is user with post-related associations loaded. PostUsers
    are still valid Users, which is why the fields are
    optional here.
  */

  postCount?: number;
  yearCount?: number;

  miniBiography?: MiniBiographyInterface;
  postFlair?: PostFlairInterface;

  isNewMember?: boolean;
}