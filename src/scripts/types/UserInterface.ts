import UsergroupInterface from "./UsergroupInterface";

export default interface UserInterface {
  id: number;
  username: string;
  avatar?: string;
  usertitle?: string;

  created: number;
  birthday: string;
  lastOnline: number;
  lastPosted: number;
  postCount: number;

  usergroups?: UsergroupInterface[];
}