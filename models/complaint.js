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
  complainterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
    },
 

});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
