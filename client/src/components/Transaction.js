import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import NavBar from "./NavBar.js"
import axios from "axios";
import styles from "../styles/Transaction.css"

class Transaction extends Component {
    state = {
        email: this.props.match.params.email,
        name: "",
        balance: "",
        transaction: []
    };

    getUserInfo(){
        const data={
            email: this.state.email
        }

    //Get users info
        let url = "https://ttp2020-fullstack-app.herokuapp.com/api/users/find";
        axios
          .get(url, {params:data})
          .then(res => {
            console.log(res.data)
            if(res.data){
                this.setState({ balance: parseFloat(res.data.balance).toFixed(2), }, () => {
                    console.log(this.state.balance);
                });
                this.setState({ name: res.data.name, }, () => {
                    console.log(this.state.name);
                });
            }
            else{
              alert("Error retreiving user information");
            }
          })
          .catch(error => {
            console.log(error);
          });
    }



    componentDidMount() {
        this.getUserInfo()
        const data={
          email: this.state.email
        }

        //Get users transaction
        let getPortfolioUrl = "https://ttp2020-fullstack-app.herokuapp.com/api/transaction/getTransaction";
      axios.get(getPortfolioUrl, {params:data})
          .then(res => {
            this.setState({ transaction: res.data}, () => {
              console.log(this.state.transaction);
            });
          })
      .catch(error => {
        console.log(error);
      });
    }

  render() {
    let myTransaction = this.state.transaction.map(stock => {
      return (
        <tr key={stock.symbol}>
          <td>{stock.symbol}</td>
          <td>{stock.quantityofshares}</td>
          <td>${parseFloat(stock.costpershare).toFixed(2)}</td>
          <td>${parseFloat(stock.costpershare*stock.quantityofshares).toFixed(2)}</td>
          <td>{stock.dateofpurchase}</td>
        </tr>
      );
    })

    return (
      <div>
        <NavBar/>
        <h1 class="title">Transactions</h1>
        <h1 class="balance">Current balance: ${this.state.balance}</h1>
        <table class="mytable">
          <thead class="thead">
            <tr>
              <th>Symbol</th>
              <th>Amount of shares</th>
              <th>Price per share</th>
              <th>Total price</th>
              <th>Date of purchase</th>
            </tr>
          </thead>
          <tbody>{myTransaction}</tbody>
        </table>
      </div>
    );
  }
}

export default Transaction;