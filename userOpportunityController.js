const UserOpportunity = require("../models/userOpportunity");
const Opportunity = require("../models/opportunity");
const User = require("../models/user");

const mongoose = require("mongoose");

const createUserOpportunity = async (req, res) => {
  const opportunityId = req.params.opportunityId;
  const userId = req.user._id;
  try {
    const opportunity = await Opportunity.findOne({ userId: userId });
    const userOpportunity = new UserOpportunity({
      userId: userId, 
      opportunityId: opportunityId, });
    await userOpportunity.save();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  res.status(201).json({ message: "Successfull investing " });
};
const removeFromAvailableOpportunities = async (req, res) => {
  try {
    const opportunitytId = req.params.id;
    const opportunity = await Opportunity.findByIdAndUpdate(
      { _id: opportunitytId },
      { isDeleted: true },
      { new: true } );
    console.log(opportunity);
    return res.status(200).json(opportunity);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
module.exports = {
  createUserOpportunity,
  removeFromAvailableOpportunities,
};
