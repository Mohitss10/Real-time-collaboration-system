const mongoose = require("mongoose");

// ==============================
// FILE SCHEMA (FOR MULTIPLE FILES)
// ==============================
const fileSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["image", "pdf", "video", "doc", "audio", "other"],
      default: "other",
    },

    fileSize: {
      type: Number, // in bytes
      default: 0,
    },
  },
  { _id: false }
);

// ==============================
// MESSAGE SCHEMA
// ==============================
const messageSchema = new mongoose.Schema(
  {
    // PROJECT
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectCard",
      required: true,
    },

    // SENDER
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // TEXT MESSAGE
    text: {
      type: String,
      default: "",
    },

    // FILES (MULTIPLE SUPPORT)
    files: {
      type: [fileSchema],
      default: [],
    },

    // MESSAGE TYPE
    messageType: {
      type: String,
      enum: ["text", "file", "image", "mixed"],
      default: "text",
    },

    // SEEN STATUS
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);