const Opportunity = require("../models/opportunity");
const mongoose = require("mongoose");
const createOpportunity = async (req, res) => {
  try {
    let {
      opportunityname,
      industry,
      fundingamount,
      reqfunding,
      description,
      role,
    } = req.body;
    const userId = req.user.id;
    if (role === "investing") {
      reqfunding = 0;
    } else if (role === "idea") {
      fundingamount = 0;
    } else {
      return res.status(400).json({ message: "Role name is not correct" });
    }
    const opportunity = new Opportunity({
      opportunityname,
      industry,
      fundingamount,
      reqfunding,
      description,
      role,
      user: req.user._id,
    });
    const savedOp = await opportunity.save();
    return res.status(201).json(savedOp);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const getOpportunity = async (req, res) => {
  const role = req.params.role;

  if (!role) {
    const op = await Opportunity.find({ isDeleted: false }).populate("user");
    return res.status(200).json(op);
  }
  const op = await Opportunity.find({ role: role, isDeleted: false }).populate(
    "user"
  );
  return res.status(200).json({ op });
};

const updateOpportunity = async (req, res) => {
  try {
    const {
      opportunityname,
      industry,
      fundingamount,
      reqfunding,
      description,
    } = req.body;
    const opportunityId = req.params.id;
    const opportunity = await opportunity.findByIdAndUpdate(opportunityId, {
      opportunityname,
      industry,
      fundingamount,
      reqfunding,
      description,
    });
    return res.json(opportunity);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const softDeleteOpportunity = async (req, res) => {
  try {
    const opportunitytId = req.params.id;
    const opportunity = await Opportunity.findByIdAndUpdate({
      _id: opportunitytId,
      isDeleted: true,
    });
    console.log(opportunity);
    return res.status(200).json(opportunity);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const getOpportunityByUser = async (req, res) => {
  let userId = req.params.userId;

  let opportunity = await Opportunity.find().populate("user");

  const filteredOp = opportunity.filter((op) => {
    return op.user._id.toString() === userId;
  });
  res.status(200).json({ filteredOp });
};

module.exports = {
  createOpportunity,
  updateOpportunity,
  softDeleteOpportunity,
  getOpportunity,
  getOpportunityByUser,
};
