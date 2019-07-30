import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import UserInterface from './types/UserInterface';
import { getCurrentTheme } from './bridge/Theme';
import AppContext from './AppContext';

import ThreadPage from './pages/ThreadPage';
import Index from './pages/IndexPage';

import '../styles/base/utilities.scss';
import '../styles/base/buttons.scss';

import '../styles/theme-vars.scss';

interface IState {
  theme: string;
  banner?: string;
  currentUser?: UserInterface,
}

class App extends Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      theme: getCurrentTheme(),
      banner: null,
      currentUser: null,
    }
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  render() {
    return (
      <AppContext.Provider value={this.getContextFromState()}>
        <div className={"App " + this.state.theme}>
          <Router>
            <Route path="/" exact component={Index} />
            <Route path="/threads/:id" exact render={route => (
              <ThreadPage
                appCurrentBanner={this.state.banner}
                setAppBanner={this.setAppBanner}
                {...route}
              />
            )} />
          </Router>
          <button onClick={this.toggleTheme}>Change theme</button>
        </div>
      </AppContext.Provider>
    );
  }

  toggleTheme() {
    const theme = (this.state.theme === 'the-vast-quack') ? 'default-orange' : 'the-vast-quack';
    this.setState({ theme });
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
