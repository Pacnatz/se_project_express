const mongoose = require("mongoose");
const validator = require("validator");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
    minlength: 2,
    maxLength: 30,
  },
  weather: {
    type: String,
    required: [true, "Weather type is required"],
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must provide a valid URL for the image.",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Owner is required"],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("item", itemSchema);
