const express = require("express");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
require("./config/passport");
const session = require("express-session");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.Routes");
const userRoutes = require("./routes/user.Routes");
const projectRoutes = require("./routes/project.Routes");
const inviteRoutes = require("./routes/invite.Routes");
const chatRoutes = require("./routes/chat.Routes");
const documentRoutes = require("./routes/document.Routes");
const taskRoutes = require("../src/routes/task.Routes");
const MeetingRoutes = require("./routes/meeting.Routes");
const aiRoutes = require("./routes/ai.Routes");

const path = require("path");

const app = express();


// ============================================
// DATABASE CONNECTION
// ============================================
connectDB();


// ============================================
// MIDDLEWARES
// ============================================

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());


// ============================================
// CORS
// ============================================
app.use(cors({
  origin: "https://nexusrealtimeteamcollaboration.vercel.app",
  credentials: true
}));


// ============================================
// STATIC FILES (UPLOADS)
// ============================================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// ============================================
// ROUTES
// ============================================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/invites", inviteRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/meeting", MeetingRoutes);
app.use("/api/ai", aiRoutes);


// ============================================
// TEST ROUTE
// ============================================
app.get("/", (req, res) => {
  res.send("API Running Successfully 🚀");
});


// ============================================
// ✅ PRODUCTION FIX (SAFE REACT ROUTING)
// ============================================

if (process.env.NODE_ENV === "production") {

  const buildPath = path.join(__dirname, "../../frontend/dist");

  app.use(express.static(buildPath));

  // ❌ DO NOT use "*" (breaks in Express 5)
  // ✅ SAFE FIX USING REGEX
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

module.exports = app;