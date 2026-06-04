const express = require("express");

const {
  updateProfile,
  getCurrentUser,
  getAllUsers
} = require("../controllers/user.Controller.js");

const protect = require("../middleware/auth.Middleware.js");

const router = express.Router();

// GET CURRENT USER
router.get(
  "/me",
  protect,
  getCurrentUser
);

// UPDATE PROFILE
router.put(
  "/update-profile",
  protect,
  updateProfile
);

router.get("/all-users", getAllUsers);

module.exports = router;