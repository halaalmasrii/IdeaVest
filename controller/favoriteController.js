const FavoriteList = require("../models/favoriteList");
const FavoriteOpportunity = require("../models/favoriteOpportunity");

const mongoose = require("mongoose");
const createFavoriteOpportunity = async (req, res) => {
  const { opportunityId } = req.body;
  const favoriteOpportunity = new FavoriteOpportunity({ opportunityId });
  await favoriteOpportunity.save();

  const favoriteList = await FavoriteList.findOneAndUpdate(
      { userId: req.params.userId },
      { $addToSet: { opportunity: favoriteOpportunity._id } },
      { new: true, upsert: true }
  );

  res.status(201).send(favoriteList);
};

const getFavoriteList = async (req, res) => {
  const  favoriteList = await FavoriteOpportunity.find({  isDeletedFromList: false }).populate(
    "FavoriteList"
  );
  return res.status(200).json({  favoriteList });
};

const DeleteFavoriteOpportunity = async (req, res) => {
  const { userId, opportunityId } = req.params;

  await FavoriteProduct.deleteOne({ opportunityId });
  
  const updatedFavoriteList = await FavoriteList.findOneAndUpdate(
      { userId },
      { $pull: { opportunity: { $in: [opportunityId] } } },
      { new: true }
  );

  return res.status(200).json({ updatedFavoriteList });
};

  module.exports = {
    createFavoriteOpportunity,
    getFavoriteList,
    DeleteFavoriteOpportunity
  }