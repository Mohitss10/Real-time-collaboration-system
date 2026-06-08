const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const sendEmail = require("../utils/sendEmail");
const {
  welcomeEmailTemplate,
  loginEmailTemplate,
} = require("../utils/emailTemplate");

// REGISTER
const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();

    // NAME VALIDATION
    if (!name || name.length < 3) {
      return res.status(400).json({
        message: "Name must be at least 3 characters",
      });
    }

    // EMAIL VALIDATION
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, number and special character",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

sendEmail(
  user.email,
  "Welcome to Nexus 🚀",
  welcomeEmailTemplate(user.name)
).catch((err) =>
  console.log("Welcome email failed:", err.message)
);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    // After passport callback, user will already be in req.user
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Google authentication failed",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // PASSWORD CHECK
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

sendEmail(
  user.email,
  "New Login Detected 🔐",
  loginEmailTemplate(user.name)
).catch((err) =>
  console.log("Login email failed:", err.message)
);

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deactivatePro = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.isPro = false;

  await user.save();

  res.json({
    success: true,
    isPro: false,
  });
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  deactivatePro,
};
