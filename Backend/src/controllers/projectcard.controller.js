const Project = require("../models/projectCard");

// ============================================
// CREATE PROJECT
// ============================================
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      projectType,
      visibility,
      color,
      status,
      progress,
      thumbnail,
    } = req.body;

    // VALIDATION
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    // GENERATE UNIQUE PROJECT CODE
    const projectCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    // CREATE PROJECT
    const project = await Project.create({
      title,
      description,
      projectType,
      visibility,
      color,
      status,
      progress,
      thumbnail,
      projectCode,

      owner: req.user.id,

      // ADD OWNER AS LEADER
      members: [
        {
          user: req.user.id,
          role: "leader",
        },
      ],

      tasksCount: 0,
      completedTasks: 0,
    });

    // POPULATE DATA
    const populatedProject = await Project.findById(project._id)
      .populate("owner", "name email profileImage")
      .populate("members.user", "name email profileImage");

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: populatedProject,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// GET ALL PROJECTS
// ============================================
const getProjects = async (req, res) => {
  try {

    const projects = await Project.find({
      "members.user": req.user.id,
    })

      // NEWEST FIRST
      .sort({ createdAt: -1 })

      // OWNER DETAILS
      .populate("owner", "name email profileImage")

      // MEMBERS DETAILS
      .populate(
        "members.user",
        "name email profileImage"
      );

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// GET SINGLE PROJECT BY ID
// ============================================
const getProjectById = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id)

      // OWNER DETAILS
      .populate(
        "owner",
        "name email profileImage"
      )

      // MEMBERS DETAILS
      .populate({
        path: "members.user",

        select:
          "name email profileImage address gender age collegeName isStudent",
      });

    // CHECK PROJECT
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // CHECK ACCESS
    const isMember = project.members.some(
      (member) => member.user._id.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
};