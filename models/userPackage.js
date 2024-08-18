const mongoose = require("mongoose");

const userpackageSchema = new mongoose.Schema({
  packages: {
    type: mongoose.Schema.ObjectId,
    ref: "Packages",
  },

  packagesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Packages",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },

  uerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Userpackage = mongoose.model("Userpackage", userpackageSchema);

module.exports = Userpackage;
