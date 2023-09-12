const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { saltRounds, handleHash } = require("../helpers/encodePassword");

const userModel = new Schema({
  username: { type: String },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, unique: true },
  permission: { type: Object },
  isDeleted: { type: Boolean, require: true, default: false },
  isActive: { type: Boolean, require: true, default: false },
  create: { type: Object, default: {} },
  modified: { type: Object, default: {} },
});

userModel.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(this.password, salt);
    this.password = newPassword;
    next();
  } catch (err) {
    next(err);
  }
});


module.exports = model("user", userModel);
