import React, { Component }from 'react';
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import Home from "./components/Home.js"
import Portfolio from "./components/Portfolio.js"
import Transaction from "./components/Transaction.js"
import Makepurchases from "./components/MakePurchases.js"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home/:email" component={Home} />
          <Route exact path="/portfolio/:email" component={Portfolio} />
          <Route exact path="/transaction/:email" component={Transaction} />
          <Route exact path="/makepurchases/:email" component={Makepurchases} />
        </Switch>
      </Router>
  )};
}

export default App;
