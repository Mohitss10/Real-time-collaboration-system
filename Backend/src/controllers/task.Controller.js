const Task = require("../models/task.Model");
const Project = require("../models/projectCard");

// ================= CREATE TASK =================
exports.createTask = async (req, res) => {
  try {
    const {
      projectId,
      fieldName,
      taskName,
      taskDescription,
      phase,
    } = req.body;

    // CHECK PROJECT
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // FILE DATA
    let attachedFile = {
      fileName: "",
      fileUrl: "",
    };

    // IF FILE EXISTS
    if (req.file) {
      attachedFile = {
        fileName: req.file.originalname,
        fileUrl: `/uploads/${req.file.filename}`,
      };
    }

    // CREATE TASK
    const task = await Task.create({
      projectId,
      fieldName,
      taskName,
      taskDescription,
      phase,
      attachedFile,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET PROJECT TASKS =================
exports.getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ projectId })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= UPDATE TASK PHASE =================
exports.updateTaskPhase = async (req, res) => {
  try {
    const { id } = req.params;
    const { phase } = req.body;

    // VALIDATION
    const validPhases = [
      "Not Started Yet",
      "In Process",
      "Completed",
    ];

    if (!validPhases.includes(phase)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phase",
      });
    }

    // UPDATE
    const task = await Task.findByIdAndUpdate(
      id,
      { phase },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task phase updated",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= DELETE TASK =================
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};