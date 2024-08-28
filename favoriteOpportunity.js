const mongoose = require("mongoose");

const favoriteOpportunitySchema = new mongoose.Schema({
  favoriteListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FavoriteList",
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
