import React, { Component }from 'react';
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
  )};
}

export default App;
