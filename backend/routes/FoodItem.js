var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const FoodItem = require("../models/FoodItem");
const FoodBuy = require("../models/FoodBuy");

router.get("/", function (req, res) {
  FoodItem.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/addfood", (req, res) => {
  const Food = new FoodItem({
    item: req.body.item,
    price: req.body.price,
    rating: req.body.rating,
    shop: req.body.shop,
    vnv: req.body.vnv,
    addon: req.body.addon,
    tags: req.body.tags,
  });

  Food.save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/removefood", (req, res) => {
  FoodItem.findByIdAndDelete(req.body._id, function (err, obj) {
    if (err) {
      console.log(err);
    }
    console.log(res);
    res.status(200).json(obj);
  });
});

router.post("/editfood", (req, res) => {
  console.log(req.body);
  FoodItem.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    function (err, doc) {
      if (err) {
        console.log(err);
      }
      res.status(200).json(doc);
    }
  );
});

router.post("/foodbuy", (req, res) => {
  const Food = new FoodBuy({
    item: req.body.item,
    price: req.body.price,
    quantity : req.body.quantity,
    cost: req.body.cost,
    rating: req.body.rating,
    shop: req.body.shop,
    vnv: req.body.vnv,
    addon: req.body.addon,
    tags: req.body.tags,
  });

  Food.save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
