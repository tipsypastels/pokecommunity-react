import UserInterface from './UserInterface';

export interface PollVoteInterface {
  user: UserInterface;
}

export interface PollOptionInterface {
  title: string;
  votes: PollVoteInterface[];
}

export default interface PollInterface {
  id: number;
  question: string;
  created: number;
  active: number;
  voters: number;
  public: number;
  
  options: PollOptionInterface[];
}