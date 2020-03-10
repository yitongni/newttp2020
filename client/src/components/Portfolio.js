import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class Home extends Component {
    state = {
        email: this.props.match.params.email,
        name: "",
        balance: "",
        search: "",
        stocks: []
    };

    onChangeSearch = event => {
      this.setState({ search: event.target.value }, ()=>{
        console.log(this.state.search)
      })
    };

    async getStock(search) {
      const token="Tpk_c81be31f1ba942bda5076850b4e33cb4"

      let url=`https://sandbox.iexapis.com/stable/search/${search}?token=${token}`
      //Get Stocks with name user entered
      let stock = await axios
          .get(url)
          .then(stock => stock.data)
          .catch(error => {
              console.log(error);
          });
          console.log(stock)

        let stockSymbol = stock.map(stock => stock.symbol)
        console.log(stockSymbol);

          //Gets the price of each stock
        let url2=`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${stockSymbol}&types=price&token=${token}`
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

    onSubmit = event => {
      event.preventDefault();
      this.getStock(this.state.search).then(data => {
      });
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
    }

    buystock(quantiy){ 
      console.log(quantiy)
    }
    componentDidMount() {
        this.getUserInfo()
    }

  render() {

    
    let records = this.state.stocks.map(stock => {
      return (
        <tr key={stock.stockname}>
          <td>{stock.stockname}</td>
          <td>{stock.price}</td>
          <td>
              <input
                type="text"
                refs="quantiy"
                placeholder="Quantity"
              />
          </td>
          <td>
            <button
              onClick={() => this.buystock(this.refs.quantiy.value)}>
              Buy Stock
            </button>
          </td>
        </tr>
      );
    })

    return (
      <div>
        <h1>Portfolio</h1>
        <h1>{this.state.name}</h1>
        <h1>Your current balance: {this.state.balance}</h1>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Look for a stock"
                required
                name="search"
                onChange={this.onChangeSearch}
              />
              <button>Search</button>
            </form>
            {records}
      </div>
    );
  }
}

export default Home;