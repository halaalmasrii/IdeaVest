const FavoriteList = require("../models/favoriteList");
const FavoriteOpportunity = require("../models/favoriteOpportunity");
const Opportunity = require("../models/opportunity");

const mongoose = require("mongoose");

const createFavoriteOpportunity = async (req, res) => {
  const  opportunityId  = req.params.opportunityId;
  const userId = req.user._id;

  try {
    const favoriteList = await FavoriteList.findOne({ userId: userId });
    const favoriteOpportunity = new FavoriteOpportunity({
      favoriteListId: favoriteList._id,
      opportunityId: opportunityId,
    });
    await favoriteOpportunity.save();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  res.status(201).json({ message: "Successfully added to favorite list" });
};

const getFavoriteList = async (req, res) => {
  const userId = req.user._id;
  const favoriteList = await FavoriteList.findOne({ userId: userId });
  const opportunities = await FavoriteOpportunity.find({
    favoriteListId: favoriteList._id,
    isDeletedFromList: false,
  }).populate("opportunityId");

  return res.status(200).json({ opportunities });
};

const DeleteFavoriteOpportunity = async (req, res) => {
  try {
    const opportunityId = req.params.opportunityId;
    const userId = req.user._id;
    const favoriteList = await FavoriteList.findOne({ userId: userId });
    const updatedFavoriteOpportunity =
      await FavoriteOpportunity.findOneAndDelete(
        { favoriteListId: favoriteList._id, opportunityId: opportunityId },
      
      );

    return res.status(200).json({ updatedFavoriteOpportunity });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createFavoriteOpportunity,
  getFavoriteList,
  DeleteFavoriteOpportunity,
};
