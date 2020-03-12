import React, { Component } from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Login.css";

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

    let url = "https://ttp2020-fullstack-app.herokuapp.com/api/users/login";
    axios
      .get(url, {params:data})
      .then(res => {
        console.log(res.data)
        if(res.data){
          alert("Signing in");
          this.props.history.push(`/portfolio/${this.state.email}`);
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
      return <Redirect to="/portfolio"/>;
    }

    return (
      <div>
        <div class="logincontainer">
          <form onSubmit={this.onSubmit}>
            <h3>Log In</h3>
              <div className="form-group">
                <label for="email1">Email</label>
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
                <label for="pw">Password:</label>
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
                  class="loginButton"
                  type="submit"
                  value="Log In"
                />
              </div>
              <Link class="register-login-link" to={`/register`}>
                Register
              </Link>
            </form>
        </div>
      </div>
    );
  }
}

export default Login;