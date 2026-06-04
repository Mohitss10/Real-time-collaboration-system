const User = require("../models/User");

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      gender,
      age,
      isStudent,
      collegeName,
      city,
      state,
      profileImage,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // UPDATE FIELDS
    user.name = name || user.name;
    user.gender = gender;
    user.age = age;
    user.isStudent = isStudent;
    user.collegeName = collegeName;
    user.profileImage = profileImage;

    user.address.city = city;
    user.address.state = state;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
      profileCompleted: user.isProfileComplete(),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET CURRENT USER
const getCurrentUser = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
      profileCompleted: user.isProfileComplete(),
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// controllers/user.Controller.js

const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select(
      "name email profileImage gender age isStudent collegeName address"
    );

    res.status(200).json({
      success: true,
      users,
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
  updateProfile,
  getCurrentUser,
  getAllUsers
};