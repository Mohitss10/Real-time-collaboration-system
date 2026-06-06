import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

/* Pages */
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import LoginSuccess from "./Pages/LoginSuccess";
import UpdateProfile from "./Pages/UpdateProfile";

/* Components */
import Projects from "./components/projects/Projects";
import ProjectDetails from "./components/projects/ProjectDetails";
import ChatRoomPage from "./components/chats/ChatRoomPage";
import Team from "./components/team/team";
import TaskPage from "./components/tasks/TaskPage";
import ProjectDocuments from "./components/documents/ProjectDocuments";
import Meeting from "./components/meetings/meetings";

/* Layout + Auth */
import DashboardLayout from "./components/layouts/dashboard";
import ProtectedRoute from "./Pages/ProtectedRouted";
import PublicRoute from "./Pages/PublicRoute";

/* UI */
import Navbar from "./Pages/Navbar";
import ToastProvider from "./ui/ToastProvider";
import PageTransition from "./ui/PageTransition";
import Pricing from "./components/Home/Pricing";

/* =========================
   ANIMATED ROUTES WRAPPER
========================= */
function AnimatedRoutes({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        

        <Route
          path="/login"
          element={
            <PublicRoute>
              <PageTransition>
                <Login />
              </PageTransition>
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <PageTransition>
                <Signup />
              </PageTransition>
            </PublicRoute>
          }
        />



        <Route
          path="/login-success"
          element={
            <PageTransition>
              <LoginSuccess />
            </PageTransition>
          }
        />

        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />

        <Route
          path="/projects"
          element={
            <PageTransition>
              <Projects />
            </PageTransition>
          }
        />

        <Route
          path="/update-profile"
          element={
            <PageTransition>
              <UpdateProfile />
            </PageTransition>
          }
        />

                <Route
          path="/pricing"
          element={
            <PageTransition>
              <Pricing />
            </PageTransition>
          }
        />

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
          <Route
            path="/project/:projectId"
            element={
              <PageTransition>
                <ProjectDetails />
              </PageTransition>
            }
          />

          <Route
            path="/team/:projectId"
            element={
              <PageTransition>
                <Team />
              </PageTransition>
            }
          />

          <Route
            path="/task/:projectId"
            element={
              <PageTransition>
                <TaskPage />
              </PageTransition>
            }
          />

          <Route
            path="/chat/:projectId"
            element={
              <PageTransition>
                <ChatRoomPage />
              </PageTransition>
            }
          />

          <Route
            path="/project/:projectId/documents"
            element={
              <PageTransition>
                <ProjectDocuments />
              </PageTransition>
            }
          />

          <Route
            path="/meeting/:projectId"
            element={
              <PageTransition>
                <Meeting />
              </PageTransition>
            }
          />
        </Route>

      </Routes>
    </AnimatePresence>
  );
};

/* =========================
   MAIN APP
========================= */
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* GLOBAL NAVBAR */}
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* ROUTES */}
      <AnimatedRoutes
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* TOAST */}
      <ToastProvider />
    </>
  );
};

export default App;