const db = require("./db");
const Sequelize = require("sequelize");

const Transaction = db.define(
  "transaction",
  {
    transactionid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    symbol: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    quantityofshares: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    costpershare: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    dateofpurchase: {
        type: Sequelize.DATEONLY,
        allowNull: true, 
        defaultValue:  Sequelize.NOW
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    tableName: "transaction",
    timestamps: false
  }
);

module.exports = Transaction;