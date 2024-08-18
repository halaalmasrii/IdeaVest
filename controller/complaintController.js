const Complaint = require("../models/complaint");
const mongoose = require("mongoose");

const createComplaint = async (req, res) => {
  try {
    let {
      accused,
        description,
        date,
    } = req.body;
    const userId = req.user.id;
    const email = req.user.email;

    const complaint = new Complaint({
      accused,
        description,
        date,
        user: req.user._id,
       email : req.user.email,

      });
      const savedCo = await complaint.save();
      return res.status(201).json(savedCo);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

 

  module.exports = {
    createComplaint,
  };
