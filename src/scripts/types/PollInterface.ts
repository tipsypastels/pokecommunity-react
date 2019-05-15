import UserInterface from './UserInterface';

export interface PollVote {
  user: UserInterface;
}

export interface PollOption {
  title: string;
  votes: PollVote[];
}

export default interface PollInterface {
  question: string;
  type: string;
  options: PollOption[];
}