const router = require("express").Router();
const { db, Users} = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

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

router.get("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.query.email)
  console.log(email)
  console.log(password);
  console.log("Hello")


  // Users.findOne({ email: email})
  //   .then(user=>{
  //     if(user){
  //       console.log(user.password);
  //       bcrypt.hash(req.body.password, salt, function (err, hash){ //hashes the password
  //         console.log("Password" + hash);
  //         bcrypt.compare(password, hash, function(err, res) {
  //           if(res===true){
  //             console.log("Hello" + user);
  //             res.status(200).json(user);
  //           }
  //             // res === true
  //         });
  //       });
  //     }
  //   })
  //     .catch(error => {
  //       res.status(400).send(error);
  //     });
});

// router.get("/find", async (req, res, next) => {
//   console.log(req.query.email)
//   Users.findAndCountAll({
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

router.post("/create", async (req, res, next) => {
  const { name, email } = req.body;
  console.log(req.body);

  //Checks to see if an account with email already exists
  try{ 
    const userExist = await Users.findOne({
      where: {
        email
      }
    });
    if(userExist){
      console.log("Please use a different email");
      res.status(400).send("Please use a different email");
      
    }
    else{
      bcrypt.hash(req.body.password, salt, async function (err, hash){ //Hashes the password
        console.log(hash);
        try { //Creates user
          const user= await Users.create({
              name,
              email,
              password: hash
          });
          console.log("User is created");
          res.status(200).send({
              name,
              email,
              password: hash
          });
        } 
        catch (err0r) {
          res.status(400).send(error);
          console.error(error);
        }
      });
    }
  }
  catch (error) {
    res.status(400).send(error);
  }
});