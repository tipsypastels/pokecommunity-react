import { createContext } from 'react';

import UserInterface from './types/UserInterface';

interface AppContextProps {
  currentUser?: UserInterface;
  setCurrentUser: (user: UserInterface) => void;
  theme: string;
  openThemePicker: () => void;
  closeThemePicker: () => void;
  setTheme: (theme: string) => void;
}

export default createContext<Partial<AppContextProps>>({});
