const FavoriteList = require("../models/favoriteList");
const FavoriteOpportunity = require("../models/favoriteOpportunity");
const Opportunity = require("../models/opportunity");
const User = require("../models/user");
const mongoose = require("mongoose");
const createOpportunity = async (req, res) => {
  try {
    let {
      opportunityname,
      industry,
      fundingamount,
      reqfunding,
      description,
      goal,
      address,
      role,
      user, 
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
      goal,
      address,
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
  const userId = req.user._id;
  let op;
  if (!role) {
     op = await Opportunity.find({ isDeleted: false }).populate("user");
  }
  if (role) {
     op = await Opportunity.find({
      role: role,
      isDeleted: false,
    }).populate("user");
  }
  const favoriteList = await FavoriteList.findOne({ userId: userId });
  const opportunities = await FavoriteOpportunity.find({
    favoriteListId: favoriteList._id,
  });

  const filteredOp = op.filter((op) => {
    return !opportunities.includes(op);
  });

  return res.status(200).json({ filteredOp });
};

const updateOpportunity = async (req, res) => {
  try {
    const {
      opportunityname,
      industry,
      fundingamount,
      reqfunding,
      description,
      goal,
      address,
    } = req.body;
    const opportunityId = req.params.id;
    console.log(opportunityId);
    Opportunity.findByIdAndUpdate({},{})
    const opportunity = await Opportunity.findByIdAndUpdate(opportunityId, {
     opportunityname:opportunityname,
      industry:industry,
      fundingamount:fundingamount,
      reqfunding:reqfunding,
      description:description,
      goal:goal,
      address:address,
    },
  {new:true});
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
     
    },
  {
    isDeleted:true
  },
{
  new:true
});
    console.log(opportunity);
    return res.status(200).json(opportunity);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const getOpportunityByUser = async (req, res) => {
  let userId = req.params.userId;
console.log(userId);

  let opportunity = await Opportunity.find().populate("user");
console.log(opportunity);

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
