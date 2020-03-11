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