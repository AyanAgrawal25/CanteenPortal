const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  Type: {
    type: String,
    required: false,
  },
  stall: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  batch: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: false,
  },
  opening_time: {
    type: String,
    required: false,
  },
  closing_time: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  pwd: {
    type: String,
    required: false,
  },
  wallet: {
    type: String,
    required: false,
  },
  count: {
    type: String,
    required: false,
  },
});

module.exports = User = mongoose.model("Users", UserSchema);
