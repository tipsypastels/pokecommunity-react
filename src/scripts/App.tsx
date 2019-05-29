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
}

class App extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      theme: getCurrentTheme(),
    }
  }

  render() {
    return (
      <div className="App" data-theme={this.state.theme}>
        <Router>
          <Route path ="/" exact component ={Spheal}/>
          <Route path="/threads/:id" exact component={ThreadPage}/>
        </Router>
      </div>
    );
  }
}

export default App;
