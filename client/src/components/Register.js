import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        hidden: true,
        redirect: false
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onChangePass2 = this.onChangePass2.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeName= event => {
    this.setState({ name: event.target.value });
  };

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangePass = event => {
    this.setState({ password: event.target.value });
  };

  onChangePass2 = event => {
    this.setState({ password2: event.target.value });
  };

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  //Have to make sure user enters the same password
  onSubmit = async event => {
    event.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    let url = "https://ttp2020-fullstack-app.herokuapp.com/api/users/create";
    axios
      .post(url, data)
      .then(res => {
        console.log(res.data)
        alert("Account created");
        this.setState({ redirect: true });
      })
      .catch(error => {
        console.log(error);
        alert("User already exists.");
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
          <div class="logincontainer">
            <form onSubmit={this.onSubmit}>
              <h3>Register</h3>
              <div className="form-group">
                <label name="pw2">Name</label>
                <input
                  className="form-control"
                  type="text"
                  required
                  id="name"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </div>
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
                <label for="pw">Password</label>
                <input
                  className="form-control"
                  type={this.state.hidden ? "password" : "text"}
                  required
                  id="pw"
                  value={this.state.password}
                  onChange={this.onChangePass}
                />
              </div>
              <div className="form-group">
                <label for="pw2">Re-enter Password</label>
                <input
                  className="form-control"
                  type={this.state.hidden ? "password" : "text"}
                  required
                  id="pw2"
                  value={this.state.password2}
                  onChange={this.onChangePass2}
                />
              </div>
              <div className="form-group text-center">
                <input
                  class="registerButton"
                  type="submit"
                  value="Register"
                />
              </div>
              <Link class="register-login-link" to={`/`}>
                Login
              </Link>
            </form>
        </div>
      </div>
    );
  }
}

export default Register;