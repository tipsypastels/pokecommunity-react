import MinimalUserInterface from "./MinimalUserInterface";

export interface MinimalReactionInterface {
  userId: number;
  created: number;
}

export type MinimalReactionCollectionInterface = {
  [reaction: string]: MinimalReactionInterface[];
}

export default interface ReactionInterface extends MinimalReactionInterface {
  user: MinimalUserInterface;
}

export type ReactionCollectionInterface = {
  [reaction: string]: ReactionInterface[];
}