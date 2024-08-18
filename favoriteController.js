const FavoriteList = require("../models/favoriteList");
const FavoriteOpportunity = require("../models/favoriteOpportunity");

const mongoose = require("mongoose");
const createFavoriteOpportunity = async (req, res) => {
  try {
    let {
      favoriteListId,
      user,
      userId,
      opportunityId,
    } = req.body;
    
    const favoriteOpportunity = new FavoriteOpportunity({
        favoriteListId,
        userId,
        opportunityId,
      user: req.user._id,
    });
    const savedFo = await favoriteOpportunity.save();
    return res.status(201).json(savedFo);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const getFavoriteList = async (req, res) => {
  const Fo = await favoriteOpportunity.find({  isDeletedFromList: false }).populate(
    "FavoriteList"
  );
  return res.status(200).json({ Fo });
};

const DeleteFavoriteOpportunity = async (req, res) => {
    try {
      const opportunitytId = req.params.id;
      const opportunity = await Opportunity.findByIdAndUpdate({
        _id: opportunitytId,
        isDeletedFromList: true,
      });
      console.log(opportunity);
      return res.status(200).json(opportunity);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  module.exports = {
    createFavoriteOpportunity,
    getFavoriteList,
    DeleteFavoriteOpportunity
  }