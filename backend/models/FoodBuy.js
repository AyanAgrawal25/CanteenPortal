const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodBuy = new Schema({
  item: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: false,
    default: "0",
  },
  shop: {
    type: String,
    required: false,
  },
  vnv: {
    type: String,
    required: false,
  },
  addon: {
    type: [String],
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  quantity: {
    type: String,
    required: false,
  },
  cost: {
    type: String,
    required: false,
  },
  buyer: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  placed_time: {
    type: String,
    required: false,
  },
  buyer_id : {
    type: String,
    required: false,
  },
  buyer_age : {
    type: String,
    required: false,
  },
  buyer_batch : {
    type: String,
    required: false,
  },
});

module.exports = Buy = mongoose.model("Buy", FoodBuy);
