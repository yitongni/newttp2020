import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Register.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
        email: ""
    };


  }

  componentDidMount() {
    this.setState({ email: this.props.match.params.email, }, () => {
        console.log(this.state.email);
    });
  }

  render() {
      
    return (
      <div>
        <h1>Portfolio</h1>
      </div>
    );
  }
}

export default Home;