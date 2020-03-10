import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class Transaction extends Component {
    state = {
        email: this.props.match.params.email,
        name: "",
        balance: ""
    };

    getUserInfo(){
        // const data={
        //     email: this.state.email
        // }
    
        // let url = "http://localhost:5000/api/users/find";
        // axios
        //   .get(url, {params:data})
        //   .then(res => {
        //     console.log(res.data)
        //     if(res.data){
        //         this.setState({ balance: res.data.balance, }, () => {
        //             console.log(this.state.balance);
        //         });
        //         this.setState({ name: res.data.name, }, () => {
        //             console.log(this.state.name);
        //         });
        //     }
        //     else{
        //       alert("Error retreiving user information");
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
    }



    componentDidMount() {
        this.getUserInfo()
    }

  render() {
    return (
      <div>
        <h1>Transaction</h1>
        <h1>{this.state.name}</h1>
        <h1>Your current balance: {this.state.balance}</h1>
      </div>
    );
  }
}

export default Transaction;