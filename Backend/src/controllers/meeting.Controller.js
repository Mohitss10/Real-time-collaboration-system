const Meeting = require("../models/Meeting");

// CREATE MEETING
const createMeeting = async (req, res) => {
  try {
    const { title, dateTime, duration, meetingLink } = req.body;

    const meeting = await Meeting.create({
      title,
      dateTime,
      duration,
      meetingLink,
      createdBy: req.user?._id,
    });

    if (!dateTime || !title) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    res.status(201).json({
      success: true,
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL MEETINGS
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ dateTime: 1 });

    res.status(200).json({
      success: true,
      meetings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE MEETING
const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    res.status(200).json({
      success: true,
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE MEETING
const deleteMeeting = async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Meeting deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMeeting,
  getMeetings,
  getMeetingById,
  deleteMeeting,
};
