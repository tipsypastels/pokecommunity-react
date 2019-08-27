import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UserInterface from './types/UserInterface';
import { getCurrentTheme } from './bridge/Theme';
import AppContext from './AppContext';

import IndexPage from './pages/IndexPage';
import ThreadPage from './pages/ThreadPage';
import BBCodePage from './pages/docs/BBCodePage';

import ThemePickerModal from './partials/ThemePickerModal';

import { themeLocalstorageKey } from '../configs/themes.json';

import '../styles/fa/css/all.min.scss';
import '../styles/base/utilities.scss';
import '../styles/base/buttons.scss';
import '../styles/all-themes.scss';

interface IState {
  theme: string;
  themePickerOpen: boolean;
  banner?: string;
  currentUser?: UserInterface;
}

export const POKECOMM3_ROUTES = {
  // FORUMS
  '/':            IndexPage,
  '/threads/:id': ThreadPage,
  
  // DOCS
  '/docs/bbcode': BBCodePage,
};

class App extends Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      theme: getCurrentTheme(),
      themePickerOpen: false,
      banner: null,
      currentUser: null,
    }
  }

  componentDidMount() {
    document.body.dataset.theme = this.state.theme;
  }

  componentDidUpdate() {
    document.body.dataset.theme = this.state.theme;
  }

  render() {
    return (
      <AppContext.Provider value={this.getContextFromState()}>
        <div className="App">
          <ThemePickerModal show={this.state.themePickerOpen} />

          <Router>
            <Switch>
              {Object.keys(POKECOMM3_ROUTES).map(path => {
                const Component = POKECOMM3_ROUTES[path];

                return (
                  <Route key={path} path={path} exact render={route => (
                    <Component
                      appCurrentBanner={this.state.banner}
                      setAppBanner={this.setAppBanner}
                      {...route}
                    />
                  )} />
                );
              })}
            </Switch>
          </Router>
        </div>
      </AppContext.Provider>
    );
  }

  openThemePicker = () => {
    this.setState({ themePickerOpen: true });
  }

  closeThemePicker = () => {
    this.setState({ themePickerOpen: false });
  }

  setTheme = (theme: string) => {
    this.setState({ theme });
    localStorage.setItem(themeLocalstorageKey, theme);
  }

  setAppBanner = (banner: string) => {
    this.setState({ banner });
  }

  setCurrentUser = (currentUser: UserInterface) => {
    this.setState({ currentUser });
  }

  getContextFromState() {
    return {
      currentUser:      this.state.currentUser,
      setCurrentUser:   this.setCurrentUser,
      theme:            this.state.theme,
      openThemePicker:  this.openThemePicker,
      closeThemePicker: this.closeThemePicker,
      setTheme:         this.setTheme,
    };
  }
}

export default App;
