import UserInterface from './UserInterface';
import MiniBiographyInterface from './MiniBiographyInterface';
import PostFlairInterface from './PostFlairInterface';

export default interface PostUserInterface extends UserInterface {
  postCount: number;
  yearCount: number;

  miniBiography: MiniBiographyInterface;
  postFlair: PostFlairInterface;
}