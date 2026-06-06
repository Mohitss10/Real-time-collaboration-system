import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  CheckSquare,
  MessageCircle,
  FileText,
  LayoutDashboard,
  GamepadDirectional,
  LogOut,
} from "lucide-react";

const Sidebar = ({ setSidebarOpen = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const projectId = location.pathname.split("/")[2];
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);

        setProject(res.data.project);
      } catch (error) {
        console.log(error);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const menuItems = [
    {
      name: "Project",
      path: `/project/${projectId}`,
      icon: LayoutDashboard,
    },
    {
      name: "Team",
      path: `/team/${projectId}`,
      icon: Users,
    },
    {
      name: "Tasks",
      path: `/task/${projectId}`,
      icon: CheckSquare,
    },
    {
      name: "Chats",
      path: `/chat/${projectId}`,
      icon: MessageCircle,
    },
    {
      name: "Documents",
      path: `/project/${projectId}/documents`,
      icon: FileText,
    },
    {
      name: "Meetings",
      path: `/meeting/${projectId}/`,
      icon: FileText,
    },
  ];

  // LOGOUT FUNCTION
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

  return (
<div className="w-screen z-40 sm:w-[300px] h-screen bg-[var(--bg-sidebar1)] p-2 flex flex-col sm:pt-16 overflow-y-auto">
      {/* HEADER */}
      <div className="mb-6 mt-1 p-4 rounded-3xl bg-[var(--bg-card)] shadow-sm border border-[var(--border-color)]">
        <div className="flex items-center gap-3">
  <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
        <GamepadDirectional size={22} className="text-[var(--primary)]" />
      </div>

          <div>
          <h2 className="font-semibold text-[var(--text-primary)] text-xl truncate max-w-[180px]">
          {project?.title || "Loading..."}
        </h2>
           <p className="text-xs text-[var(--text-secondary)]">
          Current Project
        </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="flex flex-col px-2 gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = location.pathname === item.path;

          return (
<Link
  key={item.path}
  to={item.path}
  onClick={() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }}
  className={`
    flex items-center gap-3
    px-4 py-4 rounded-xl
    transition-all duration-200
    font-medium

    ${
      isActive
  ? "bg-[var(--primary)]/10 text-[var(--primary)] border-l-4 border-[var(--primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
    }
  `}
>
  <Icon size={20} />
  <span>{item.name}</span>
</Link>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="mt-auto pt-5 ">
        {/* LOGOUT BUTTON */}
        <div className="flex flex-col">
           <span className="text-sm px-2 text-[var(--text-secondary)]">
        Workspace Pro
      </span>
        </div>

     <button
      onClick={handleLogout}
      className="
        w-full flex items-center gap-3 px-2 mt-2 pt-4 p-2
        text-red-500
        transition-all duration-200 font-medium
        border-t border-[var(--border-color)] hover:bg-[var(--primary)]/10 rounded-4xl
      "
    >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
