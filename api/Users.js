const router = require("express").Router();
const { db, Users} = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//make sure to export the router
module.exports = router;

// router.get("/", async (req, res, next) => {
//   Users.findAll({ limit: 200 })
//     .then(userResponse => {
//       res.status(200).json(userResponse);
//     })
//     .catch(error => {
//       res.status(400).send(error);
//     });
// });

// router.get("/login", async (req, res, next) => {
//   let found = Users.findOne({
//     where: {
//       email: req.query.email
//     }
//   });
//   Users.findOne({
//     where: {
//       email: req.query.email
//     }
//   })
//     .then(userResponse => {
//       console.log(userResponse);
//       res.status(200).json(userResponse);
//     })
//     .catch(error => {
//       res.status(400).send(error);
//     });
// });

router.get("/find", async (req, res, next) => {
  console.log(req.query.email)
  Users.findAndCountAll({
    where: {
      email: req.query.email
    }
  })
    .then(userResponse => {
      console.log(userResponse);
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

// router.post("/create", async (req, res, next) => {
//   const { password, email } = req.body;
//   console.log(req.body);
//   Users.findOne({
//     where: {
//       email
//     }
//   })
//     .then(async found => {
//       try {
//         const created = await Users.create({
//           password,
//           email
//         });
//         console.log(`created ${created.email}!`);
//         res.status(201).send({
//           password,
//           email
//         });
//       } catch (err) {
//         // res.status(400).send(error);
//         console.error(err);
//       }
//     })
//     .catch(error => {
//       console.log("USER NOT CREATED");
//       res.status(400).send(error);
//     });
// });

router.post("/create", async (req, res, next) => {
  const { name, password, email } = req.body;
  console.log(req.body);

  try {
    const created = await Users.create({
        name,
        email,
        password
    });
    console.log(`created ${created.email}!`);
    res.status(201).send({
        name,
        email,
        password
    });
  } 
  catch (err) {
    res.status(400).send(error);
    console.error(err);
  }
});