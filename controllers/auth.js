const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    }).lean();
    if (user)
      return res.status(400).json({
        message: "User already exists.",
      });
    const encryptedPassword = await bcrypt.hash(password, 1);
    await User.create({
      email,
      password: encryptedPassword,
    });
    return res.json({
      message: "User created successfully",
      token: generateToken(email),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error encountered, please try again.",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    }).lean();
    if (!user)
      return res.status(400).json({
        message: "User does not exists.",
      });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      return res.json({
        email: user.email,
        token: generateToken(email),
      });
    } else {
      return res.status(400).json({
        message: "Invalid credentials.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error encountered, please try again.",
    });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    return res.json({
      message: "Token verified successfully."
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error encountered, please try again.",
    });
  }
};

const generateToken = (email) => {
  return jwt.sign({ email }, "secret123", {
    expiresIn: "1d",
  });
};
