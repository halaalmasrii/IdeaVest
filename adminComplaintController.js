const Complaint = require("../models/complaint");
const mongoose = require("mongoose");

const getComplaint = async (req, res) => {
  const co = await Complaint.find().populate("user");
  return res.status(200).json({ co });
};

const getComplaintByUser = async (req, res) => {
  let userId = req.params.userId;

  let complaint = await Complaint.find().populate("user");

  const filteredCo = complaint.filter((co) => {
    return co.user._id.toString() === userId;
  });
  res.status(200).json({ filteredCo });
};

const replayComplaintByEmail = async (req, res) => {
  try {
    const replay = await req.user.email;
    return res.status(200).json({ message: "replay by email to ", user });
  } catch (error) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getComplaint,
  getComplaintByUser,
  replayComplaintByEmail,
};
