const UserOpportunity = require("../models/userOpportunity");
const Opportunity = require("../models/opportunity");
const User = require("../models/user");

const mongoose = require("mongoose");

const createUserOpportunity = async (req,res) => {
    try{
    let {
        investorId,
        partnerId,
        OpportunityId,
      } = req.body;
      const userId = req.user.id;

      const userOpportunity = new UserOpportunity({
        investorId,
        partnerId,
        OpportunityId,
        user: req.user._id,
      });
      const savedUserOpportunity = await userOpportunity.save();
      return res.status(201).json(savedUserOpportunity);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
      }



};

const removeFromAvailableOpportunities = async (req,res) => {

 try{
    const { opportunityId } = req.params;
      
        await opportunity.deleteOne({ opportunityId });
      
        const removeOpportunity = await Opportunity.findOneAndUpdate(
          
          { $pull: { opportunity: { $in: [opportunityId] } } },
          { new: true }
        );
      
        return res.status(200).json({ removeOpportunity });
      }
      catch (err) {
        return res.status(400).json({ error: err.message });
      }
    };


module.exports = {
    createUserOpportunity,
    removeFromAvailableOpportunities
};