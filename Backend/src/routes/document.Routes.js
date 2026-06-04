const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth.Middleware");

const upload = require("../middleware/upload.middleware");

const {
  uploadDocument,
  getProjectDocuments,
  downloadDocument,
} = require("../controllers/document.Controller");

// UPLOAD FILE
router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadDocument
);

// GET ALL FILES
router.get(
  "/project/:projectId",
  auth,
  getProjectDocuments
);

// DOWNLOAD FILE
router.get(
  "/download/:fileName",
  downloadDocument
);

module.exports = router;