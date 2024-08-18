const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  accused: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // timestamp
  date: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
