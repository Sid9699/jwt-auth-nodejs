const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const model = mongoose.Model("users", User);

module.exports = model;
