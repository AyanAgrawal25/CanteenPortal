const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodItems = new Schema({
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
        default : "0"
    },
    shop : {
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
});

module.exports = Food = mongoose.model("Food", FoodItems);