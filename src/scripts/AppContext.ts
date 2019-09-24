import { createContext } from 'react';
import UserInterface from './types/UserInterface';
import NotificationInterface from './types/NotificationInterface';

interface AppContextProps {
  currentUser?: UserInterface;
  setCurrentUser: (user: UserInterface) => void;
  
  theme: string;
  setTheme: (theme: string) => void;

  themePickerOpen: boolean;
  setThemePickerOpen: (open: boolean) => void;

  banner: string;
  setBanner: (banner: string) => void;

  notifications: NotificationInterface[];
  setNotifications: (list: NotificationInterface[]) => void;

  messages: NotificationInterface[];
  setMessages: (list: NotificationInterface[]) => void;
}

export default createContext<Partial<AppContextProps>>({});
