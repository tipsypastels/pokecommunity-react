import UserInterface from "./UserInterface";
import GlobalUserPermissionsInterface from "./GlobalUserPermissionsInterface";

export default interface CurrentUserInterface extends UserInterface {
  globalPermissions: GlobalUserPermissionsInterface;
}