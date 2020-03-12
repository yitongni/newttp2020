import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "../styles/NavBar.css";

class NavBar extends Component {
  render() {
    const email = this.props.match.params.email;
    console.log(email);
    return (
      <div class="nav-container">
        <nav class="nav">
          <Link
            className="nav-link"
            to={`/portfolio/${email}`}>
            Portfolio
          </Link>
          
          <Link
            className="nav-link"
            to={`/transaction/${email}`}>
            Transaction
          </Link>
          
          <Link
            className="nav-link"
            to={`/makepurchases/${email}`}>
            Purchase
          </Link>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);