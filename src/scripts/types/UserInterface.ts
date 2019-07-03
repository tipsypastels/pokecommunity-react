import UsergroupInterface from "./UsergroupInterface";
import MinimalUserInterface from "./MinimalUserInterface";

export default interface UserInterface extends MinimalUserInterface {
  usertitle?: string;

  created: number;
  birthday: string;
  lastOnline: number;
  lastPosted: number;
  postCount: number;

  usergroups?: UsergroupInterface[];
}