const mongoose = require("mongoose");

const userOpportunitySchema = new mongoose.Schema({

    investorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
        },

    partnerId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
            },

    investingOpportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opportunity",
  },

     ideaOpportunityId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Opportunity",
  },

});

const UserOpportunity = mongoose.model("UserOpportunity", userOpportunitySchema);

module.exports = UserOpportunity;
