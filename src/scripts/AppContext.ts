// This stuff was all in App, but that causes a cannot access uninitialized variable error when importing into another file. This works for some reason :/
// TODO investigate further

import { createContext } from 'react';

import UserInterface from './types/UserInterface';

interface AppContextProps {
  currentUser?: UserInterface;
  setCurrentUser: (user: UserInterface) => void;
}

export default createContext<Partial<AppContextProps>>({});
