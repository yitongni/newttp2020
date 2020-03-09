const Sequelize = require("sequelize");
require('dotenv').config()

module.exports = new Sequelize(process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  }
//     "stock",
//     process.env.PGUSER,
//     process.env.PGPASSWORD,
// //   "healthtracker@dbproject1",
// //   "Teemoscout1!",
//   {
//     // host: "database-1.c5k9xcxdckbb.us-east-2.rds.amazonaws.com",
//     host: "localhost",
  
//     operatorsAliases: false,
//     port: 5432,
//     ssl: true,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   }
);