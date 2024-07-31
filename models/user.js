const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  cv: {
    type: String, 
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
