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
        <Link
            className="nav-link"
            to={`/portfolio/${this.state.email}`}
            style={{ textAlign: "center" }}
        >
            Portfolio
        </Link>
        <Link
            className="nav-link"
            to={`/transaction/${this.state.email}`}
            style={{ textAlign: "center" }}
        >
            Transaction
        </Link>
        <Link
            className="nav-link"
            to={`/makepurchases/${this.state.email}`}
            style={{ textAlign: "center" }}
        >
            Purchase
        </Link>
      </div>
    );
  }
}

export default Home;