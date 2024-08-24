const mongoose = require("mongoose");

const userOpportunitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opportunity",
  },
});

const UserOpportunity = mongoose.model(
  "UserOpportunity",
  userOpportunitySchema
);

module.exports = UserOpportunity;
