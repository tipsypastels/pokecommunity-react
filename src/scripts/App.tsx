import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UserInterface from './types/UserInterface';
import { getCurrentTheme } from './bridge/Theme';
import AppContext from './AppContext';

import IndexPage from './pages/IndexPage';
import ThreadPage from './pages/ThreadPage';
import BBCodePage from './pages/docs/BBCodePage';

import ThemePickerModal from './partials/ThemePickerModal';
import { themeLocalstorageKey } from '../configs/themes.json';
import NotificationInterface from './types/NotificationInterface';

import '../styles/fa/css/all.min.scss';
import '../styles/base/utilities.scss';
import '../styles/base/buttons.scss';
import '../styles/all-themes.scss';

export const POKECOMM3_ROUTES = {
  // FORUMS
  '/':            IndexPage,
  '/threads/:id': ThreadPage,
  
  // DOCS
  '/docs/bbcode': BBCodePage,
};

export default function App() {
  const [theme, _setTheme] = useState<string>(getCurrentTheme);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const [banner, setBanner] = useState<string>(null);
  const [currentUser, setCurrentUser] = useState<UserInterface>(null);
  const [notifications, setNotifications] = useState<NotificationInterface[]>([]);
  const [messages, setMessages] = useState<NotificationInterface[]>([]);

  function setTheme(theme: string) {
    _setTheme(theme);
    localStorage.setItem(themeLocalstorageKey, theme);
  }

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      theme,
      setTheme,
      themePickerOpen,
      setThemePickerOpen,
      banner,
      setBanner,
      notifications,
      setNotifications,
      messages,
      setMessages,
    }}>
      <div className="App">
        <ThemePickerModal />

        <Router>
          <Switch>
            {Object.keys(POKECOMM3_ROUTES).map(path => {
              const Component = POKECOMM3_ROUTES[path];

              return (
                <Route 
                  key={path} 
                  path={path} 
                  exact component={Component}
                />
              );
            })}
          </Switch>
        </Router>
      </div>
    </AppContext.Provider>
  );
}