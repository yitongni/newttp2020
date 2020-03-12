import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Portfolio.css"
import e from "cors";
import { Button } from "react-bootstrap";

class Portfolio extends Component {
    state = {
        email: this.props.match.params.email,
        name: "",
        balance: "",
        portfolio: [],
        prices: []
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

      let getLatestPriceUrl = "http://localhost:5000/api/transaction/getLatestPrice";
      axios
          .get(getLatestPriceUrl, {params:data})
          .then(res => {
            console.log(res)
            this.setState({ prices: res.data}, () => {
              console.log(this.state.prices);
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
          {/* <td>{stock.costpershare}</td> */}
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
        <h1 class="title">Portfolio</h1>
        {/* <h1>{this.state.name}</h1> */}
        <h1 classname="balance">Current balance: ${this.state.balance}</h1>
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
                    <th>Shares</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>{myStocks}</tbody>
              </table>
        
      </div>
    );
  }
}

export default Portfolio;