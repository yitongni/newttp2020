const router = require("express").Router();
const { db, Transaction} = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = router;

//Add a transaction
router.post("/add", async (req, res, next) => {
    const { symbol, quantityofshares, costpershare, dateofpurchase, email } = req.body;
    console.log(req.body);
  
    try {
      const created = await Transaction.create({ 
            symbol, quantityofshares, costpershare, dateofpurchase, email 
        });
      res.status(201).send({});
    } 
    catch (err) {
      console.error(err);
    }
});

//Get users portfolio
router.get("/getPortfolio", async (req, res, next) => {
  console.log("Hello")
  const { email } = req.query;
    Transaction.findAll({ 
      //Gets the symbol as well as the sum of the shares an user own for that symbol
      attributes: [
        "symbol",
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

//Get all of a users transaction
router.get("/getTransaction", async (req, res, next) => {
  const { email } = req.query;
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