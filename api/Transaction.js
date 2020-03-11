const router = require("express").Router();
const { db, Transaction} = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = router;

router.post("/add", async (req, res, next) => {
    console.log("hello")
    const { symbol, quantityofshares, costpershare, dateofpurchase, email } = req.body;
    console.log(req.body);
  
    try {
      const created = await Transaction.create({ 
            symbol, quantityofshares, costpershare, dateofpurchase, email 
        });
      
      res.status(201).send({
        // symbol, quantityofshares, costpershare, dateofpurchase, email 
      });
    } catch (err) {
      console.error(err);
    }
});

router.get("/getPortfolio", async (req, res, next) => {
  console.log("Hello")
  const { email } = req.query;
  // console.log(req.body);
  
    Transaction.findAll({ 
      attributes: [
        "symbol",
        // "costpershare",
        [Sequelize.fn("sum", Sequelize.col("quantityofshares")), "total"]
      ],
      where: {
        email: req.query.email,
      },
      group: ["symbol"]
    })
    .then(data => {
      console.log(data)
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.get("/getTransaction", async (req, res, next) => {
  console.log("Hello")
  const { email } = req.query;
  // console.log(req.body);
  
    Transaction.findAll({ 
      where: {
        email: req.query.email,
      },
    })
    .then(data => {
      console.log(data)
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});