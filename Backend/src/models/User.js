const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFO
    // =========================
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [30, "Name cannot exceed 30 characters"],
      match: [/^[A-Za-z\s]+$/, "Name can contain only letters and spaces"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
      minlength: [8, "Password must be at least 8 characters"],
    },

    // =========================
    // AUTH SYSTEM
    // =========================
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: {
      type: String,
      default: "",
    },

    resetPasswordExpire: {
      type: Date,
    },

    // =========================
    // PROFILE
    // =========================
    profileImage: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },

    age: {
      type: Number,
      min: [1, "Age must be greater than 0"],
      max: [120, "Age cannot exceed 120"],
      default: null,
    },

    isStudent: {
      type: Boolean,
      default: false,
    },

    collegeName: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      city: {
        type: String,
        trim: true,
        default: "",
      },

      state: {
        type: String,
        trim: true,
        default: "",
      },
    },

    // =========================
    // 💳 SAAS SUBSCRIPTION SYSTEM (FINAL CLEAN VERSION)
    // =========================

    subscription: {
      plan: {
        type: String,
        enum: ["free", "pro"],
        default: "free",
      },

      status: {
        type: String,
        enum: ["active", "inactive", "expired"],
        default: "inactive",
      },

      startDate: {
        type: Date,
        default: null,
      },

      endDate: {
        type: Date,
        default: null,
      },
    },

    // =========================
    // 💳 PAYMENT (FOR FUTURE STRIPE INTEGRATION)
    // =========================

    stripeCustomerId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);