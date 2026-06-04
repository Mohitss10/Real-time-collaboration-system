const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    // =========================
    // PROJECT NAME
    // =========================
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // PROJECT DESCRIPTION
    // =========================
    description: {
      type: String,
      default: "",
    },

    // =========================
    // PROJECT TYPE
    // web -> rocket icon
    // mobile -> mobile icon
    // =========================
    projectType: {
      type: String,
      enum: ["web", "mobile"],
      default: "web",
    },

    // =========================
    // PROJECT STATUS
    // =========================
    status: {
      type: String,
      enum: ["planning", "in-progress", "completed"],
      default: "planning",
    },

    // =========================
    // PROGRESS BAR %
    // =========================
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // =========================
    // PRIVATE / PUBLIC
    // =========================
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },

    // =========================
    // CARD COLOR
    // =========================
    color: {
      type: String,
      default: "#8b5cf6",
    },

    // =========================
    // UNIQUE PROJECT CODE
    // =========================
    projectCode: {
      type: String,
      unique: true,
    },

    // =========================
    // PROJECT THUMBNAIL
    // =========================
    thumbnail: {
      type: String,
      default: "",
    },

    // =========================
    // OWNER
    // =========================
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =========================
    // MEMBERS
    // =========================
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        role: {
          type: String,
          enum: ["leader", "member"],
          default: "member",
        },
      },
    ],

    // =========================
    // TASKS
    // =========================
    tasksCount: {
      type: Number,
      default: 0,
    },

    completedTasks: {
      type: Number,
      default: 0,
    },

    // =========================
    // LAST ACTIVITY
    // =========================
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectCard", projectSchema);