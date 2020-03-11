import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import e from "cors";
import Modal from "./Modal.js"


class MakeStockPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            costpershare: this.props.costpershare,
            quantity: "",
            symbol: this.props.symbol,
        }
      }

    refresh = () => {
    
    };

    inputHandler = e => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
    };

  // inputHandler = e => {
  //   e.preventDefault();
  //   this.setState({ [e.target.name]: e.target.value });
  // };

    onSubmit = event => {
      event.preventDefault();
      this.getStock(this.state.search).then(data => {
      });
    };

    // buystock(quantity){ 
    //   console.log(quantity)
    //   let addPurchase = `http://localhost:5000/api/transaction/addPurchase`;
    //   axios
    //     .put(addPurchase, {
    //     //   symbol, quantityofshares, costpershare, dateofpurchase, email
    //   })
    //   .then(res => {})
    //   .catch(error => {
    //     console.log(error);
    //   });
    // }
    // componentDidMount() {
    // }

  render() {

    let addForm = (
      <div>
        <form
          className="col-md-4 mb-3"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2%"
          }}
        //   onSubmit={this.buystock(this.state.quantity)}
        >
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>
              Quantity
            </label>
            <input
            id="quantity"
              type="text"
              className="form-control form-control-lg"
              name="quantity"
              pattern="[0-9]*"
              onChange={this.inputHandler}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Buy"
              className="btn btn-primary"
              style={{ backgroundColor: "#91b0ff" }}
            />
          </div>
        </form>
      </div>
    );


    return (
      <div>
          <Modal
                form={addForm}
                label={"Buy Stock"}
                title={`Buy ${this.state.symbol}`}
                refresh={this.refresh}
          />
      </div>
    );
  }
}

export default MakeStockPurchase;