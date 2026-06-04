const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.Middleware");

const {
  sendMessage,
  getMessages,
} = require("../controllers/chat.Controller");


// ==============================
// SEND MESSAGE (TEXT + FILES)
// ==============================
router.post("/:projectId/send", protect, sendMessage);


// ==============================
// GET ALL MESSAGES OF PROJECT
// ==============================
router.get("/:projectId", protect, getMessages);

module.exports = router;