import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/Portfolio.css"
import NavBar from "./NavBar.js"
import e from "cors";
import { Button } from "react-bootstrap";

class Portfolio extends Component {
    state = {
        email: this.props.match.params.email,
        name: "",
        balance: "",
        portfolio: [],
        prices: [],
        stocksymbols: [],
        mystocks: []
    };
    async getPortfolio(){

    }
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
            let symbols=res.data.map(symbol=>{
              return symbol.symbol
            })
            // console.log(symbols)
            this.setState({ stocksymbols: symbols}, () => {
              console.log(this.state.stocksymbols);
            });
            const token="Tpk_c81be31f1ba942bda5076850b4e33cb4"
              let getLatestPriceUrl = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=price&token=${token}`;
                 axios
                  .get(getLatestPriceUrl)
                  .then(res => {
                    this.setState({ prices: res.data}, () => {
                      console.log(this.state.prices);
                      let myStocks = this.state.portfolio.map(stock => {
                        return (
                          <tr key={stock.symbol}>
                            <td>{stock.symbol}</td>
                            <td>{stock.total}</td>
                            <td>${(this.state.prices[stock.symbol].price).toFixed(2)}</td>
                            <td>${(this.state.prices[stock.symbol].price*stock.total).toFixed(2)}</td>
                          </tr>
                        );
                        
                      })
                      this.setState({ myStocks: myStocks}, () => {
                        console.log(this.state.myStocks);
                      })
                      let getOpenPriceUrl = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}/ohlc&token=${token}`;
                      axios
                        .get(getOpenPriceUrl)
                        .then(res => {
                          console.log(res)
                        })
                        .catch(error => {
                          console.log(error);
                        });
            
                    });
                  })
                  .catch(error => {
                    console.log(error);
                  });
          })
      .catch(error => {
        console.log(error);
      });

      
    }


  render() { 
    return (
      <div>
        <NavBar/>
        <h1 class="title">Portfolio</h1>
        <h1 class="balance">Current balance: ${this.state.balance}</h1>
        <table class="datatable">
          <thead class="thead-light">
            <tr>
              <th>Symbol</th>
              <th>Shares</th>
              <th>Price per share</th>
              <th>Total price</th>
            </tr>
          </thead>
          <tbody>{this.state.myStocks}</tbody>
        </table>
      </div>
    );
  }
}

export default Portfolio;