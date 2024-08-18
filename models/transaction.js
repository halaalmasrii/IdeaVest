const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
