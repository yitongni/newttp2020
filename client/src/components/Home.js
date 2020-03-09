import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Register.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
        email: this.props.match.params.email,
    };


  }

  componentDidMount() {
    console.log(this.state.email)
  }

  render() {
      
    return (
      <div>
      </div>
    );
  }
}

export default Home;