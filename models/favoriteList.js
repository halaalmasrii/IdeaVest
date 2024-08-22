const mongoose = require("mongoose");

const favoriteListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  opportunityId: [{
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'FavoriteOpportunity'
     }],
}
);

const FavoriteList = mongoose.model("FavoriteList", favoriteListSchema);

module.exports = FavoriteList;
