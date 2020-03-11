import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import e from "cors";
import { Button } from "react-bootstrap";

class Portfolio extends Component {
    state = {
        email: this.props.match.params.email,
        name: "",
        balance: "",
        portfolio: []
    };

    componentDidMount(){
      const data={
        email: this.state.email
      }

      let url = "http://localhost:5000/api/users/find";
        axios
          .get(url, {params:data})
          .then(res => {
            console.log(res.data)
            if(res.data){
            this.setState({ balance: res.data.balance, }, () => {
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


      let getPortfolioUrl = "http://localhost:5000/api/transaction/getPortfolio";
      axios
          .get(getPortfolioUrl, {params:data})
          .then(res => {
            this.setState({ portfolio: res.data}, () => {
              console.log(this.state.portfolio);
            });
          })
      .catch(error => {
        console.log(error);
      });
    }


  render() {
    let myStocks = this.state.portfolio.map(stock => {
      return (
        <tr key={stock.symbol}>
          <td>{stock.symbol}</td>
          <td>{stock.total} Shares</td>
          <td>{stock.costpershare}</td>
        </tr>
      );
    })

    return (
      <div>
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
        <h1>Portfolio</h1>
        <h1>{this.state.name}</h1>
        <h1>Your current balance: {this.state.balance}</h1>
        {myStocks}
      </div>
    );
  }
}

export default Portfolio;