const mongoose = require("mongoose");
const { updateSearchIndex } = require("./favoriteOpportunity");

const opportunitySchema = new mongoose.Schema({
  opportunityname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
  },
  address: {
    type: String,
  },
  goal: {
    type: String,
  },
  reqfunding: {
    type: Number,
  },
  fundingamount: {
    type: Number,
  },
  role: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require:true,
   },
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bought_by:[{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"User"
}]
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

module.exports = Opportunity;
