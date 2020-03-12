import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
// import styles from "../Styling/navbar.css";

class NavBar extends Component {
  render() {
    const email = this.props.match.params.email;
    console.log(email);
    return (
      <div id="nav-container">
        <nav className="nav">
            <Link
            className="nav-link"
            to={`/portfolio/${email}`}
            style={{ textAlign: "center" }}
        >
            Portfolio
                </Link>
           
            <Link
            className="nav-link"
            to={`/transaction/${email}`}
            style={{ textAlign: "center" }}
        >
            Transaction
        </Link>
            
            <Link
            className="nav-link"
            to={`/makepurchases/${email}`}
            style={{ textAlign: "center" }}
        >
            Purchase
        </Link>
            
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);