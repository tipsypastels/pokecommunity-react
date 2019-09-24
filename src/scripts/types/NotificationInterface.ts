import MinimalUserInterface from "./MinimalUserInterface";

export default interface Notification {
  id: number;
  url: string;
  action: string;
  content: string;
  forUser: MinimalUserInterface;
  fromUser: MinimalUserInterface;
  read: number;
  archived: number;
  seen: number;
  created: number;
}