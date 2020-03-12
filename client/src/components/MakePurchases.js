import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import NavBar from "./NavBar.js"
import styles from "../styles/MakePurchases.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


class Makepurchases extends Component {
    state = {
        email: this.props.match.params.email,
        name: "",
        balance: "",
        search: "",
        stocks: [],
        amountofshares: ""
    };

    async getStock(search) {
        const token="Tpk_c81be31f1ba942bda5076850b4e33cb4"
  
        let url=`https://sandbox.iexapis.com/stable/search/${search}?token=${token}`
        
        //Get Stocks with name user entered
        let stock = await axios.get(url)
            .then(stock => stock.data)
            .catch(error => {
                console.log(error);
            });
            console.log(stock)
  
        let stocksymbol = stock.map(stock => stock.symbol)
          console.log(stocksymbol);
  
          //Gets the price of each stock
          let url2=`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${stocksymbol}&types=price&token=${token}`
          let price = await axios
            .get(url2)
            .then(data => data.data)
            .catch(error => {
                console.log(error);
            });
            console.log(price)
          let stocksnameandprice = stock.map(stock => {
            return {stockname: stock.symbol, price: price[stock.symbol].price}
          })
  
          console.log(stocksnameandprice)
            this.setState({ stocks: stocksnameandprice}, ()=>{
              console.log(this.state.stocks)
            })
    }
  
    onChangeSearch = event => {
        this.setState({ search: event.target.value }, ()=>{
          console.log(this.state.search)
        })
      };
  
      inputHandler = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
      };
    

      onSubmit = event => {
        event.preventDefault();
        this.getStock(this.state.search)
      };

      getUserInfo(){
        const data={
            email: this.state.email
        }
    
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
    }

    async buyStock(symbol, price){ 
        if(price*this.state.amountofshares>this.state.balance){
          console.log("You dont have enough money")
          alert("You dont have enough balance")
        }
        else{
          const data = {
            symbol: symbol, 
              quantityofshares: this.state.amountofshares, 
              costpershare: price,
              email: this.state.email
          }
          let addPurchaseUrl = "https://ttp2020-fullstack-app.herokuapp.com/api/transaction/add";
           await axios.post(addPurchaseUrl, data)
            .then(res => {
              console.log(res)
            })
            .catch(error => {
              console.log(error);
            });
          
          let updateBalanceUrl = "https://ttp2020-fullstack-app.herokuapp.com/api/users/updateBalance";
          await axios.put(updateBalanceUrl, {
              balance: this.state.balance-price*this.state.amountofshares,
              email: this.state.email
            })
            .then(res => {
              console.log(res)
            })
            .catch(error => {
              console.log(error);
            });
          
        }
      }

  render() {
    let records = this.state.stocks.map(stock => {
        return (
          <tr key={stock.stockname}>
            <td>{stock.stockname}</td>
            <td>${parseFloat(stock.price).toFixed(2)}</td>
            <td>
              <form>
                <input
                  className="form-control"
                  type="text"
                  pattern="[0-9]*"
                  placeholder="Amount of shares"
                  name="amountofshares"
                  onChange={this.inputHandler}
                />
              </form>
            </td>
            <td>
              <Button class="purchaseButton" onClick={() => {this.buyStock(stock.stockname, stock.price)}}>
                Buy Stock
              </Button>
            </td>
          </tr>
        );
      })

    return (
      <div>
        <NavBar/>
        <h1 class="title">Purchase</h1>
        <h1 class="balance">Current balance: ${this.state.balance}</h1>
        <form class="inputForm" onSubmit={this.onSubmit}>
          <input
            class="input-input"
            type="text"
            placeholder="Look for a stock"
            required
            name="search"
            onChange={this.onChangeSearch}
          />
          <button class="inputbutton">Search</button>
        </form>
        <table class="mytable">
          <thead class="thead">
            <tr>
              <th>Symbol</th>
              <th>Price per share</th>
              <th>Quantity</th>
              <th>Buy stock</th>
            </tr>
          </thead>
          <tbody>{records}</tbody>
        </table>    
      </div>
    );
  }
}

export default Makepurchases;