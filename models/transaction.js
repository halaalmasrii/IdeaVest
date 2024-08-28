const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  price: {
    type: Number, 
    required: true,
  },
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opportunity",
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
