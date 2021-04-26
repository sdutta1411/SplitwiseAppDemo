const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    default: "0000000000",
  },

  currency: {
    type: String,
    default: "USD",
  },

  timezone: {
    type: String,
    default: "PST",
  },

  language: {
    type: String,
    default: "English",
  },
});

module.exports = mongoose.model("users", UserSchema);
