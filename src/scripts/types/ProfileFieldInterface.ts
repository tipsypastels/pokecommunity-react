import PostLayout from "./PostLayout";
import UserInterface from "./UserInterface";

export default interface ProfileFieldInterface {
  userid: number;
  biography: string;
  location: string;
  postLayout: PostLayout;
  gender: string;
  inGameName: string;
  quickSelfIntro: string;
  discordName: string;

  user?: UserInterface;
}