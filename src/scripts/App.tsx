import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CurrentUserInterface from './types/CurrentUserInterface';
import { getCurrentTheme } from './bridge/Theme';
import AppContext from './AppContext';

import IndexPage from './pages/IndexPage';
import ThreadPage from './pages/ThreadPage';
import BBCodePage from './pages/docs/BBCodePage';
import AcknowledgementsPage from './pages/about/AcknowledgementsPage';

import ThemePickerModal from './partials/ThemePickerModal';
import { themeLocalstorageKey } from '../configs/themes.json';
import NotificationInterface from './types/NotificationInterface';

import ToastContainer from './helpers/Toasts/ToastsContainer';
import { ToastMessageOrOpts } from './helpers/Toasts/ToastMessage';

import '../styles/fa/css/all.min.scss';
import '../styles/base/utilities.scss';
import '../styles/base/buttons.scss';
import '../styles/all-themes.scss';

export const POKECOMM3_ROUTES = {
  // FORUMS
  '/':            IndexPage,
  '/threads/:id': ThreadPage,
  
  // ABOUT
  '/about/acknowledgements': AcknowledgementsPage,

  // DOCS
  '/docs/bbcode': BBCodePage,
};

export type AppState = {
  theme: string;
  themePickerOpen: boolean;
  banner: string;
  currentUser: CurrentUserInterface;
  notifications: NotificationInterface[];
  messages: NotificationInterface[];
  toasts: ToastContainer;
}

export type AppAction =
  | { type: 'SET_THEME', theme: string }
  | { type: 'OPEN_THEME_PICKER' }
  | { type: 'CLOSE_THEME_PICKER' }
  | { type: 'SET_BANNER', banner: string }
  | { type: 'SIGN_IN', user: CurrentUserInterface }
  | { type: 'SIGN_OUT' }
  | { type: 'SET_NOTIFICATIONS', notifications: NotificationInterface[] }
  | { type: 'SET_MESSAGES', messages: NotificationInterface[] }
  | { type: 'SET_TOAST', toast: ToastMessageOrOpts }
  | { type: 'HIDE_TOAST', slug: string }

function appReducer(state: AppState, action: AppAction): AppState {
  switch(action.type) {
    case 'SET_THEME': {
      localStorage.setItem(themeLocalstorageKey, action.theme);
      return { ...state, theme: action.theme, themePickerOpen: false };
    }
    case 'OPEN_THEME_PICKER': {
      return { ...state, themePickerOpen: true };
    }
    case 'CLOSE_THEME_PICKER': {
      return { ...state, themePickerOpen: false };
    }
    case 'SET_BANNER': {
      return { ...state, banner: action.banner };
    }
    case 'SIGN_IN': {
      return { ...state, currentUser: action.user };
    }
    case 'SIGN_OUT': {
      return { ...state, currentUser: null };
    }
    case 'SET_NOTIFICATIONS': {
      return { ...state, notifications: action.notifications };
    }
    case 'SET_MESSAGES': {
      return { ...state, messages: action.messages };
    }
    case 'SET_TOAST': {
      return { ...state, toasts: state.toasts.with(action.toast) };
    }
    case 'HIDE_TOAST': {
      return { ...state, toasts: state.toasts.without(action.slug) };
    }
    default: return state;
  }
}

export default function App() {
  
  const [appState, appDispatch] = useReducer(appReducer, {
    theme: getCurrentTheme(),
    themePickerOpen: false,
    banner: null,
    currentUser: null,
    notifications: [],
    messages: [],
    toasts: new ToastContainer(),
  });
  
  useEffect(() => {
    document.body.dataset.theme = appState.theme;
  }, [appState.theme]);
  
  return (
    <AppContext.Provider value={[appState, appDispatch]}>
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