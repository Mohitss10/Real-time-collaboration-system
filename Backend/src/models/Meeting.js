const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    dateTime: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      default: 30, // minutes
    },

    meetingLink: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// TIME LEFT (virtual field)
meetingSchema.virtual("timeLeft").get(function () {
  const now = new Date();
  const diff = this.dateTime - now;

  if (diff <= 0) return "Started / Passed";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return `${hours}h ${minutes}m left`;
});

meetingSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Meeting", meetingSchema);