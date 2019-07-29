import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import UserInterface from './types/UserInterface';
import { getCurrentTheme } from './bridge/Theme';
import AppContext from './AppContext';

import IndexPage from './pages/IndexPage';
import ThreadPage from './pages/ThreadPage';

import '../styles/base/utilities.scss';
import '../styles/base/buttons.scss';

interface IState {
  theme: string;
  banner?: string;
  currentUser?: UserInterface,
}

export const POKECOMM3_ROUTES = {
  '/':            IndexPage,
  '/threads/:id': ThreadPage,
};

class App extends Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      theme: getCurrentTheme(),
      banner: null,
      currentUser: null,
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.getContextFromState()}>
        <div className="App" data-theme={this.state.theme}>
          <Router>
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
          </Router>
        </div>
      </AppContext.Provider>
    );
  }

  setAppBanner = (banner: string) => {
    this.setState({ banner });
  }

  setCurrentUser = (currentUser: UserInterface) => {
    this.setState({ currentUser });
  }

  getContextFromState() {
    return {
      currentUser: this.state.currentUser,
      setCurrentUser: this.setCurrentUser,
    };
  }
}

export default App;
