import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

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
    
        let url = "http://localhost:5000/api/users/find";
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

        let getPortfolioUrl = "http://localhost:5000/api/transaction/getTransaction";
      axios
          .get(getPortfolioUrl, {params:data})
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
          <td>${stock.costpershare}</td>
          <td>{stock.dateofpurchase}</td>
        </tr>
      );
    })
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
        <h1>Transaction</h1>
        <h1>Current balance: {this.state.balance}</h1>
        <table
                className="datatable"
                style={{
                  width: "85vw",
                  boxShadow: "4px 4px 5px grey"
                }}
              >
                <thead className="thead-light">
                  <tr>
                    <th>Symbol</th>
                    <th>Amount of shares</th>
                    <th>Price per share</th>
                    <th>Date of urchase</th>
                  </tr>
                </thead>
                <tbody>{myTransaction}</tbody>
              </table>
        
      </div>
    );
  }
}

export default Transaction;