const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ status: "false", message: "Please add all fields" });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ status: "false", message: "User already exists" });
  }

  const user = await User.create({
    username,
    email,
    password,
    newUser: true,
  });
  if (user) {
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res
      .status(400)
      .json({ status: false, message: "Unknown error occured" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ status: false, message: "Please add all fields" });
  }
  const user = await User.findOne({ username });
  if (user) {
    const token = generateToken(user._id);
    if (password === user.password) {
      return res.status(200).json({
        status: true,
        username: username,
        message: "User logged in successfully",
        jwt_token: token,
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Username and password" });
    }
  } else {
    return res
      .status(400)
      .json({ status: false, message: "Please provide auth token" });
  }
};
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};
module.exports = {
  loginUser,
  registerUser,
};
