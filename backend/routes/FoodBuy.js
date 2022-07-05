var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const FoodBuy = require("../models/FoodBuy");

router.get("/", function (req, res) {
  FoodBuy.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/foodbuy", (req, res) => {
  const Food = new FoodBuy({
    item: req.body.item,
    price: req.body.price,
    quantity: req.body.quantity,
    cost: req.body.cost,
    rating: req.body.rating,
    shop: req.body.shop,
    vnv: req.body.vnv,
    status: req.body.status,
    addon: req.body.addon,
    placed_time: req.body.placed_time,
    tags: req.body.tags,
    buyer: req.body.buyer,
    buyer_id: req.body.buyer_id,
    buyer_age: req.body.buyer_age,
    buyer_batch : req.body.buyer_batch,
  });

  Food.save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/accFood", (req, res) => {
  console.log(req.body);
  FoodBuy.findOneAndUpdate(
    { _id: req.body.id },
    { status: "Accepted" },
    { new: true },
    (err, docs) => {
      if (err) {
        res.status(500).json(error);
      } else {
        res.status(200).json(docs);
      }
    }
  );
});

router.post("/rejFood", (req, res) => {
  FoodBuy.findOneAndUpdate(
    { _id: req.body.id },
    { status: "Rejected" },
    { new: true },
    (err, docs) => {
      if (err) {
        res.status(500).json(error);
      } else {
        res.status(200).json(docs);
      }
    }
  );
});

router.post("/cookFood", (req, res) => {
  FoodBuy.findOneAndUpdate(
    { _id: req.body.id },
    { status: "Cooking" },
    { new: true },
    (err, docs) => {
      if (err) {
        res.status(500).json(error);
      } else {
        res.status(200).json(docs);
      }
    }
  );
});

router.post("/pickupFood", (req, res) => {
  FoodBuy.findOneAndUpdate(
    { _id: req.body.id },
    { status: "Ready to pickup" },
    { new: true },
    (err, docs) => {
      if (err) {
        res.status(500).json(error);
      } else {
        res.status(200).json(docs);
      }
    }
  );
});

router.post("/buyerPickupFood", (req, res) => {
  FoodBuy.findOneAndUpdate(
    { _id: req.body.id },
    { status: "Completed" },
    { new: true },
    (err, docs) => {
      if (err) {
        res.status(500).json(error);
      } else {
        res.status(200).json(docs);
      }
    }
  );
});

module.exports = router;
