import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import ThreadPage from './pages/ThreadPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/thread/:threadid" exact component={ThreadPage}/>
      </Router>
    );
  }
}

export default App;
