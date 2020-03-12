const db = require("./db");
const Sequelize = require("sequelize");

const Users = db.define(
  "users",
  {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: true
        }
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    balance:{
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 5000.00,
        validate: {
            notEmpty: true
        }
    }
  },
  {
    tableName: "users",
    timestamps: false
  }
);

// Users.


module.exports = Users;