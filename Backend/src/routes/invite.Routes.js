const express = require("express");
const router = express.Router();

const { inviteUserToProject } = require("../controllers/invite.controller");

const protect = require("../middleware/auth.Middleware")

router.post("/invite",protect, inviteUserToProject);

module.exports = router;