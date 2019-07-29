import { createContext } from 'react';

import UserInterface from './types/UserInterface';

interface AppContextProps {
  currentUser?: UserInterface;
  setCurrentUser: (user: UserInterface) => void;
}

export default createContext<Partial<AppContextProps>>({});
