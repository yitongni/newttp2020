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
  const { email, password } = req.query;
  //Check if valid email was entered
  try{ 
    const userExist = await Users.findOne({
      where: {
        email
      }
    });
    if(userExist){
      //Compare password user entered with password in database
      bcrypt.compare(password, userExist.password, function(err, result) {

        if(result){
          res.status(200).json(userExist);
        }
        else{
          res.status(200).send(err);
        }
      });
    }
  }
  catch (error) {
    res.status(200).send(error);
  }
});

router.get("/find", async (req, res, next) => {
  console.log(req.query.email)
  const {email} = req.query;
  try{ 
    const userExist = await Users.findOne({
      where: {
        email
      }
    });
    if(userExist){
      res.status(200).json(userExist);
    }
  }
  catch (error) {
    res.status(400).send(error);
  }
});

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
        catch (error) {
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