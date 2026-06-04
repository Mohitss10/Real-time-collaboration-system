const Document = require("../models/document.Model");
const Project = require("../models/projectCard");
const path = require("path");
const fs = require("fs");
// ======================================
// UPLOAD DOCUMENT
// ======================================
exports.uploadDocument = async (req, res) => {
  try {
    const { projectId, title } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const project = await Project.findById(projectId);

    const document = await Document.create({
      projectId,

      title,

      originalName: req.file.originalname,

      fileName: req.file.filename,

      fileUrl: `http://localhost:5000/uploads/${req.file.filename}`,

      uploadedBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      document,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET PROJECT DOCUMENTS
// ======================================
exports.getProjectDocuments = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (member) => member.user.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const documents = await Document.find({
  projectId,
})
.populate("uploadedBy", "name email")
.populate("downloadedBy.user", "name")
.sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      documents,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// DOWNLOAD FILE
// ======================================

exports.downloadDocument = async (req, res) => {
  try {
    const fileName = decodeURIComponent(req.params.fileName);

    // 🔥 ALWAYS POINT FROM ROOT PROJECT FOLDER
    const filePath = path.resolve("uploads", fileName);

    console.log("FILE PATH:", filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    return res.download(filePath);

  } catch (error) {
    console.log("DOWNLOAD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};