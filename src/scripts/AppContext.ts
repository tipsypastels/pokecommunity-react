import { createContext } from 'react';
import UserInterface from './types/UserInterface';
import { Notification } from './partials/Header/Omnibar/Tools/Notifications';

interface AppContextProps {
  currentUser?: UserInterface;
  setCurrentUser: (user: UserInterface) => void;
  
  theme: string;
  setTheme: (theme: string) => void;

  themePickerOpen: boolean;
  setThemePickerOpen: (open: boolean) => void;

  banner: string;
  setBanner: (banner: string) => void;

  notifications: Notification[];
  setNotifications: (list: Notification[]) => void;
}

export default createContext<Partial<AppContextProps>>({});
