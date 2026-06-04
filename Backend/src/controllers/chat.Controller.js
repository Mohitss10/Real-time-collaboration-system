const Message = require("../models/message.Model");
const Project = require("../models/projectCard");


// ==============================
// SEND MESSAGE (TEXT + FILES)
// ==============================
exports.sendMessage = async (req, res) => {
  try {
    const { projectId, text, files } = req.body;

    // CHECK PROJECT
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // VALIDATION: must have text OR files
    if ((!text || text.trim() === "") && (!files || files.length === 0)) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    // DETERMINE MESSAGE TYPE
    let messageType = "text";

    if (files && files.length > 0 && text) {
      messageType = "mixed";
    } else if (files && files.length > 0) {
      messageType = "file";
    }

    // CREATE MESSAGE
    const message = await Message.create({
      projectId,
      sender: req.user._id,
      text: text || "",
      files: files || [],
      messageType,
    });

    // POPULATE SENDER
    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "name email");

    return res.status(201).json({
      success: true,
      message: populatedMessage,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==============================
// GET ALL MESSAGES
// ==============================
exports.getMessages = async (req, res) => {
  try {
    const { projectId } = req.params;

    const messages = await Message.find({ projectId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};