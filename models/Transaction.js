const db = require("./db");
const Sequelize = require("sequelize");

const Transaction = db.define(
  "transactions",
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
        type: Sequelize.DATE,
        allowNull: false
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
    tableName: "transactions",
    timestamps: false
  }
);

/***/
// Transaction.belongsTo(User, {as: 'user'});
// User.hasMany(Transaction, {as: 'Transaction'});
/***/

// export Transaction modules
module.exports = Transaction;