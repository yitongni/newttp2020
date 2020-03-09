import React, { Component } from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Login.css";
// import Footer from "./Footer";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      hidden: true,
      redirect: false
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangePass = event => {
    this.setState({ password: event.target.value });
  };

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }


  onSubmit = event => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(this.state.email);
    console.log(data);

    let url = "http://localhost:5000/api/users/login";
    axios
      .get(url, {params:data})
      .then(res => {
        console.log(res.data)
        if(res.data){
          alert("Signing in");
          // this.props.setUser(res.data);
          this.props.history.push(`/home/${this.state.email}`);
          this.setState({ redirect: true });
        }
        else{
          alert("Wrong Username or Password");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }

    return (
      <div>
        <div className = "titleName" style={{paddingTop:"70px"}}>
          <span>Health Tracker</span>
          
        </div>
        <div id="loginform">
          <div
            className="container login-container"
            style={{ marginTop: "2%", marginBottom: "5%" }}
          >
            <form onSubmit={this.onSubmit}>
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "5%",
                  fontSize: "50px"
                }}
              >
                Log In
              </h3>
              <div className="form-group">
                <label style={{ fontWeight: "bold" }} for="email1">
                  Email:
                </label>
                <input
                  className="form-control"
                  type="text"
                  required
                  id="email1"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label style={{ fontWeight: "bold" }} for="pw">
                  Password:
                </label>
                <input
                  className="form-control"
                  type={this.state.hidden ? "password" : "text"}
                  required
                  id="pw"
                  value={this.state.password}
                  onChange={this.onChangePass}
                />
              </div>

              <div className="form-group text-center">
                <input
                  className="btn btn-primary btn-lg #1e1e6e"
                  type="submit"
                  value="Log In"
                  style={{ backgroundColor: "#1e1e6e" }}
                />
              </div>
              <Link
                className="nav-link"
                to={`/register`}
                style={{ textAlign: "center" }}
              >
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

/* 
*** Email validation check, omitted for now
<input className="form-control" type= "email" required id= "email1" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}" value= {this.state.email} onChange= {this.onChangeEmail} />

*** Password validation check, omitted for now
<input className="form-control" type= {this.state.hidden ? "password": "text"} required id= "pw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value= {this.state.password} onChange= {this.onChangePass} />
*/
