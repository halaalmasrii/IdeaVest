const Question = require("../models/question");
const UserResponse = require("../models/userResponses");
const User = require("../models/user");
const Answer = require("../models/answer");
const { calculateCosineSimilarity } = require("../utils/cosineSimilarity");

const getQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };



const saveUserResponse = async (req, res) => {
  const { userId, responses } = req.body;

  try {
    if (!userId || !responses) {
      return res.status(400).json({ message: "User ID and responses are required." });
    }

    const userResponse = new UserResponse({ userId, responses });
    await userResponse.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Promise.all(responses.map(async (response) => {
      if (!response.questionId || !response.answer) {
        throw new Error("Question ID and answer must be provided.");
      }
      const answer = new Answer({ questionId: response.questionId, answer: response.answer });
      await answer.save();
    }));

    const allUserResponses = await UserResponse.find({});
    const similarities = [];
    
    const currentUserAnswers = responses.map(rep => rep.answer);
    const currentUserFactor = currentUserAnswers.map(answer => answer === " answer" ? 1 : 0); 

    allUserResponses.forEach(otherResponse => {
      if (otherResponse.userId.toString() !== userId.toString()) {
        const otherUserAnswers = otherResponse.responses.map(rep => rep.answer);
        const otherUserFactor = otherUserAnswers.map(answer => answer === " anwer" ? 1 : 0); 
        const similarity = calculateCosineSimilarity(currentUserFactor, otherUserFactor);
        similarities.push({ userId: otherResponse.userId, similarity });
      }
    });

    similarities.sort((a, b) => b.similarity - a.similarity);

    await User.findByIdAndUpdate(userId, { similarityFactor: currentUserFactor });

    return res.status(201).json({
      message: "Responses saved successfully",
      recommendations: similarities.slice(0, 3), 
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save responses", error: error.message });
  }
};

  
  module.exports = {
    getQuestions,
    saveUserResponse,
  };
  