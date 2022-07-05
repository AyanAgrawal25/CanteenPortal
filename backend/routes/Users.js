var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Input validations
// const ids = require("../config/keys");

// Load User model
const User = require("../models/Users");

// GET request
// Getting all the users
router.get("/", function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
router.post("/register", async (req, res) => {
  // const salt = await bcrypt.genSalt();
  // const passwordHash = await bcrypt.hash(req.body.pwd, salt);
  const newUser = new User({
    name: req.body.name,
    Type: req.body.Type,
    email: req.body.email,
    contact: req.body.contact,
    stall: req.body.stall,
    opening_time: req.body.opening_time,
    closing_time: req.body.closing_time,
    date: req.body.date,
    batch: req.body.batch,
    age: req.body.age,
    pwd: req.body.pwd,
    wallet: "0",
    count: "0",
  });

  newUser
    .save()
    .then((user) => {
      res.status(200).json(user);
      console.log(user);
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.pwd;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user email exists
    if (!user) {
      res.status(404).json({
        error: "Email not found",
      });
    } else {
      if (password == user.pwd) {
        res.status(200).json(user);
      } else {
        console.log(user.pwd);
        console.log(password);
        res.status(400).send(err);
      }
    }
  });
});

router.post("/profileEdit", (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      name: req.body.name,
      Type: req.body.Type,
      email: req.body.email,
      contact: req.body.contact,
      stall: req.body.stall,
      opening_time: req.body.opening_time,
      closing_time: req.body.closing_time,
      batch: req.body.batch,
      age: req.body.age,
      date: req.body.date,
      pwd: req.body.pwd,
    },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        res.send(docs);
        console.log("Updated successfully");
      }
    }
  );
});

router.post("/updwallet", (req, res) => {
  const email = req.body.email;
  console.log(req.body);
  // Find user by email
  User.findOne({ email }).then((user) => {
    user.wallet = +user.wallet + +req.body.amt;
    User.findOneAndUpdate(
      { email: req.body.email },
      user,
      { new: true },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
          res.send(docs);
          console.log("Updated successfully");
        }
      }
    );
  });
});

router.post("/decwallet", (req, res) => {
  const email = req.body.email;
  // Find user by email
  User.findOne({ email }).then((user) => {
    user.wallet = +user.wallet - +req.body.cost;
    User.findOneAndUpdate(
      { email: req.body.email },
      user,
      { new: true },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
          res.send(docs);
          console.log("Updated successfully");
        }
      }
    );
  });
});

router.post("/incct", (req, res) => {
  const email = req.body.email;
  // Find user by email
  User.findOne({ email }).then((user) => {
    user.count = +user.count + 1;
    User.findOneAndUpdate(
      { email: req.body.email },
      user,
      { new: true },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
          res.send(docs);
          console.log("Updated successfully");
        }
      }
    );
  });
});

router.post("/decct", (req, res) => {
  const email = req.body.email;
  // Find user by email
  User.findOne({ email }).then((user) => {
    user.count = +user.count - 1;
    User.findOneAndUpdate(
      { email: req.body.email },
      user,
      { new: true },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
          res.send(docs);
          console.log("Updated successfully");
        }
      }
    );
  });
});

module.exports = router;
