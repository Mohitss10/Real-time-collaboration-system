const Project = require("../models/projectCard");
const User = require("../models/User");

const inviteUserToProject = async (req, res) => {
  try {
    const { projectId, email } = req.body;

    // CHECK LOGIN USER
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    // FIND PROJECT
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // CHECK MEMBERS ARRAY EXISTS
    if (!project.members || !Array.isArray(project.members)) {
      return res.status(400).json({
        success: false,
        message: "Project members data invalid",
      });
    }

    // CHECK IF USER IS LEADER
    const isLeader = project.members.some(
      (m) =>
        m?.user &&
        m.user.toString() === req.user.id.toString() &&
        m.role === "leader"
    );

    if (!isLeader) {
      return res.status(403).json({
        success: false,
        message: "Only leader can add members",
      });
    }

    // FIND USER BY EMAIL
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // CHECK IF ALREADY MEMBER
    const alreadyMember = project.members.some(
      (m) =>
        m?.user &&
        m.user.toString() === user._id.toString()
    );

    if (alreadyMember) {
      return res.status(400).json({
        success: false,
        message: "User already in project",
      });
    }

    // ADD NEW MEMBER
    project.members.push({
      user: user._id,
      role: "member",
    });

    await project.save();

    return res.status(200).json({
      success: true,
      message: "User added successfully",
      project,
    });

  } catch (error) {
    console.log("INVITE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { inviteUserToProject };