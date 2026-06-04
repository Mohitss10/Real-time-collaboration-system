const express = require("express");
const router = express.Router();

const {
  createTask,
  getProjectTasks,
  updateTaskPhase,
  deleteTask,
} = require("../controllers/task.Controller");

const auth = require("../middleware/auth.Middleware");

// FILE UPLOAD MIDDLEWARE
const upload = require("../middleware/upload.middleware");

// ================= CREATE TASK =================
// WITH FILE ATTACHMENT
router.post(
  "/create",
  auth,
  upload.single("file"),
  createTask
);

// ================= GET PROJECT TASKS =================
router.get("/:projectId", auth, getProjectTasks);

// ================= UPDATE TASK PHASE =================
router.patch("/:id/phase", auth, updateTaskPhase);

// ================= DELETE TASK =================
router.delete("/:id", auth, deleteTask);

module.exports = router;