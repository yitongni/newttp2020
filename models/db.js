const Sequelize = require("sequelize");
require('dotenv').config()

module.exports = new Sequelize(process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  }
);