const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    // PROJECT ID
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // FIELD NAME
    // Example:
    // Research
    // Engineering
    // QA
    // Design
    fieldName: {
      type: String,
      required: true,
      enum: ["Research", "Engineering", "QA", "Design"],
    },

    // TASK NAME
    taskName: {
      type: String,
      required: true,
      trim: true,
    },

    // TASK DESCRIPTION
    taskDescription: {
      type: String,
      default: "",
    },

    // TASK ADD DATE
    taskAddDate: {
      type: Date,
      default: Date.now,
    },

    // ATTACH FILE
    attachedFile: {
      fileName: {
        type: String,
        default: "",
      },

      fileUrl: {
        type: String,
        default: "",
      },
    },

    // TASK PHASE
    phase: {
      type: String,
      enum: ["Not Started Yet", "In Process", "Completed"],
      default: "Not Started Yet",
    },

    // CREATED BY
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);