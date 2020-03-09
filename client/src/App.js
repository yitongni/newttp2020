import React, { Component }from 'react';
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import Home from "./components/Home.js"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
  )};
}

export default App;
