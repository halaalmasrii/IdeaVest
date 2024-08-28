const mongoose = require("mongoose");

const userResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      answer: String,
    },
  ],
});

const UserResponse = mongoose.model("UserResponse", userResponseSchema);

module.exports = UserResponse;
