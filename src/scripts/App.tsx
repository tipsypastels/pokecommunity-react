import React, { Component, createContext } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import UserInterface from './types/UserInterface';
import { getCurrentTheme } from './bridge/Theme';
import AppContext from './AppContext';

import ThreadPage from './pages/ThreadPage';
import Spheal from './pages/Spheal';

import '../styles/base/utilities.scss';
import '../styles/base/buttons.scss';

interface IProps {}
interface IState {
  theme: string;
  banner?: string;
  currentUser?: UserInterface,
}

class App extends Component<IProps, IState> {
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
            <Route path ="/" exact component ={Spheal}/>
            <Route path="/threads/:id" exact render={route => (
              <ThreadPage 
                appCurrentBanner={this.state.banner}
                setAppBanner={this.setAppBanner}
                {...route} 
              />
            )}/>
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
