import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { getCurrentTheme } from './bridge/Theme';

import ThreadPage from './pages/ThreadPage';
import Spheal from './pages/Spheal';

import '../styles/base/utilities.scss';
import '../styles/base/buttons.scss';

interface IProps {}
interface IState {
  theme: string;
  banner?: string;
}

class App extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      theme: getCurrentTheme(),
      banner: null,
    }
  }

  render() {
    return (
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
    );
  }

  setAppBanner = (banner: string) => {
    this.setState({ banner });
  }
}

export default App;
