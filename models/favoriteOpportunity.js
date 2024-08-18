const mongoose = require("mongoose");

const favoriteOpportunitySchema = new mongoose.Schema({
  favoriteListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FavoriteList",
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opportunity",
  },

  isDeletedFromList: {
    type: Boolean,
    default: false,
  },
});
const FavoriteOpportunity = mongoose.model(
  "FavoriteOpportunity",
  favoriteOpportunitySchema
);

module.exports = FavoriteOpportunity;
