import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import ThreadPage from './pages/ThreadPage';
import Spheal from './pages/Spheal';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path ="/" exact component ={Spheal}/>
        <Route path="/thread/:threadid" exact component={ThreadPage}/>
      </Router>
    );
  }
}

export default App;
