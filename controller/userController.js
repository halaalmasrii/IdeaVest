const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const protect = require("../middlewares/authMiddleware");
const createUser = async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;
  const image = req.files.image[0].path;
  const cv = req.files.cv[0].path;
  if (!username || !email || !password || !phoneNumber) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassowrd = await bcrypt.hash(password, 12);
    
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassowrd,
      phoneNumber: phoneNumber,
      profileImage:image,
      cv:cv
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to login", error: error.message });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
};

const updateUserProfile = async (req, res) => {
  const userId = req.params.id;
  const username = req.body.username;
  const phoneNumber = req.body.phoneNumber;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (username) user.username = username;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  const updateUser = await user.save();
  res.json({
    updateUser,
  });
};

const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const profileImagePath = req.file.path; 
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: profileImagePath },
      { new: true }
    );

    return res.json(updatedUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const uploadCV = async (req, res) => {
  try {
    const userId = req.params.id;
    const cvPath = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cv: cvPath },
      { new: true }
    );

    return res.json(updatedUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const test = async (req , res)=>{
  console.log(req.files.image)
  return req.files
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  updateUserProfile,
  updateUserProfile,
  uploadProfileImage,
  uploadCV,
  test
};
