const mongoose = require("mongoose");

const favoriteListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  opportunityname: {
    type: mongoose.Schema.ObjectId,
    ref: "Opportunity",
    required: true,
  },
  opportunityid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opportunity",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const FavoriteList = mongoose.model("FavoriteList", favoriteListSchema);

module.exports = FavoriteList;
