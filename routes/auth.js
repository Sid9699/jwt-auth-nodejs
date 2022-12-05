const express = require("express");
const router = express.Router();
const { login, register, verifyToken } = require("../controllers/auth");
const isAuthenticated = require("../middelwares/authMiddelware");

router.post("/register", register);
router.post("/login", login);
router.get("/verify", isAuthenticated, verifyToken);

module.exports = router;
