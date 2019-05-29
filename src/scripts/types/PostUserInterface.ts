import UserInterface from './UserInterface';
import TextFieldInterface from './TextFieldInterface';
import ProfileFieldInterface from './ProfileFieldInterface';

export default interface PostUserInterface extends UserInterface {
  textFields: TextFieldInterface;
  profileFields: ProfileFieldInterface;
}