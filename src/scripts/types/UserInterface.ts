import UsergroupInterface from "./UsergroupInterface";
import MinimalUserInterface from "./MinimalUserInterface";
import OldUsernameInterface from "./OldUsernameInterface";

export default interface UserInterface extends MinimalUserInterface {
  usertitle?: string;

  created: number;
  birthday: string;
  lastOnline: number;
  lastPosted: number;
  postCount: number;

  usergroups?: UsergroupInterface[];

  oldUsernames: OldUsernameInterface[];
  friendCode: string;
}