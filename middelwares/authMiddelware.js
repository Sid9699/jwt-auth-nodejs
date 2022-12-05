const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthenticated = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.decode(token, "secret123");
      if (decoded) {
        await User.findOne({
          email: decoded.email,
        });
      } else {
         return res.status(401).json({
          message: "Invalid token.",
        });
      }
      next();
    } else {
      return res.status(401).json({
        message: "Token does not exists.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Invalid token.",
    });
  }
};

module.exports = isAuthenticated;
