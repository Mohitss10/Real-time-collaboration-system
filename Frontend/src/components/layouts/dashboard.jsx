import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "../../Pages/Navbar";
import AIChatbot from "../ai/AIChatbot";

const DashboardLayout = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="flex min-h-screen bg-purple-50">

      {/* NAVBAR (IMPORTANT) */}
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          lg:hidden fixed top-[60px] left-0 z-40
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block fixed left-0 z-40">
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </div>

      {/* CONTENT */}
      <div className="flex-1 lg:ml-[300px]">
        <div className="min-h-screen p-2 bg-[var(--bg-sidebar1)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
     <AIChatbot/>
    </div>
  );
};

export default DashboardLayout;