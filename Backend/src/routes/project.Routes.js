const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.Middleware");

const {
  createProject,
  getProjects,
  getProjectById
} = require("../controllers/projectcard.Controller");

// CREATE PROJECT
router.post("/create", protect, createProject);

// GET ALL PROJECTS
router.get("/", protect, getProjects);

router.get("/:id", protect, getProjectById);

module.exports = router;