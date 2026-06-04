import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import LoginSuccess from "./Pages/LoginSuccess";
import UpdateProfile from "./Pages/UpdateProfile";

import Projects from "./components/projects/projects";
import ProjectDetails from "./components/projects/ProjectDetails";
import ChatRoomPage from "./components/chats/ChatRoomPage";
import Team from "./components/team/team";
import TaskPage from "./components/tasks/TaskPage";
import ProjectDocuments from "./components/documents/ProjectDocuments";
import Meeting from "./components/meetings/meetings";

import DashboardLayout from "./components/layouts/dashboard";
import ProtectedRoute from "./Pages/ProtectedRouted";
import PublicRoute from "./Pages/PublicRoute";

import Navbar from "./Pages/Navbar";
import ToastProvider from "./ui/ToastProvider";

const App = () => {
  // ✅ GLOBAL SIDEBAR STATE
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* ✅ GLOBAL NAVBAR (IMPORTANT) */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/update-profile" element={<UpdateProfile />} />

        {/* PROTECTED ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </ProtectedRoute>
          }
        >
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/team/:projectId" element={<Team />} />
          <Route path="/task/:projectId" element={<TaskPage />} />
          <Route path="/chat/:projectId" element={<ChatRoomPage />} />
          <Route
            path="/project/:projectId/documents"
            element={<ProjectDocuments />}
          />
          <Route path="/meeting/:projectId" element={<Meeting />} />
        </Route>
      </Routes>
<ToastProvider/>
    </>
  );
};

export default App;
