const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
  registerUser,
  loginUser,
  googleLogin,
} = require("../controllers/auth.Controller");

const protect = require("../middleware/auth.Middleware");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail")

// ========================
// AUTH ROUTES
// ========================
router.post("/register", registerUser);
router.post("/login", loginUser);

// ========================
// GOOGLE OAUTH LOGIN
// ========================

// START GOOGLE LOGIN
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// GOOGLE CALLBACK
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // redirect to frontend
    res.redirect(
      `http://localhost:5173/login-success?token=${token}`
    );
  }
);

// ========================
// 💳 ACTIVATE PRO SUBSCRIPTION (30 DAYS)
// ========================
router.post("/activate-pro", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // 30 days

    user.subscription = {
      plan: "pro",
      status: "active",
      startDate,
      endDate,
    };

    await user.save();

    res.json({
      success: true,
      message: "Pro subscription activated for 30 days",
      subscription: user.subscription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// ========================
// DOWNGRADE TO FREE PLAN
// ========================
router.post("/deactivate-pro", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.subscription = {
      plan: "free",
      status: "active",
      startDate: null,
      endDate: null,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully switched to Free Plan",
      subscription: user.subscription,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// ========================
// PROTECTED ROUTE
// ========================
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;