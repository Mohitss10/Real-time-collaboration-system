const express = require("express");
const router = express.Router();

const {
  createMeeting,
  getMeetings,
  getMeetingById,
  deleteMeeting,
} = require("../controllers/meeting.Controller");

const auth = require("../middleware/auth.Middleware");
const requirePro = require("../middleware/requirePro");

// =========================
// GLOBAL MIDDLEWARE (CLEAN)
// =========================
router.use(auth);
router.use(requirePro);

// =========================
// CREATE MEETING (PRO ONLY)
// =========================
router.post("/create", createMeeting);

// =========================
// GET ALL MEETINGS (PRO ONLY)
// =========================
router.get("/", getMeetings);

// =========================
// GET BY ID (PRO ONLY)
// =========================
router.get("/:id", getMeetingById);

// =========================
// DELETE (PRO ONLY)
// =========================
router.delete("/:id", deleteMeeting);

module.exports = router;