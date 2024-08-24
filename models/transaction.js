const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  price: {
    type: String,
    required: true,
  },
  // date: {
  //   type: String,
  //   required: true,
  // },

  //timestamp
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opportunity",
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
