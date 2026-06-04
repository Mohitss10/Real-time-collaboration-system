const User = require("../models/User");

const requirePro = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const sub = user.subscription;

    // =========================
    // NO SUBSCRIPTION
    // =========================
    if (!sub || sub.status !== "active") {
      return res.status(403).json({
        message: "Pro subscription required to access Meetings",
      });
    }

    // =========================
    // EXPIRED CHECK
    // =========================
    const now = new Date();
    const expiry = sub.endDate;

    if (!expiry || now > expiry) {
      return res.status(403).json({
        message: "Subscription expired. Please renew to continue.",
      });
    }

    // =========================
    // ALLOW ACCESS
    // =========================
    next();
  } catch (error) {
    console.error("requirePro error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = requirePro;