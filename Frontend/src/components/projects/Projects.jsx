import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { Funnel, ChevronDown } from "lucide-react";

import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";
import Notification from "../../Pages/Notification";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);

  // SORT FILTER
  const [sortType, setSortType] = useState("all");

  // ============================================
  // FETCH PROJECTS
  // ============================================
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProjects(response.data.projects);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ============================================
  // AFTER CREATE
  // ============================================
  const handleCreate = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  // ============================================
  // FILTER PROJECTS
  // ============================================
  const filteredProjects = useMemo(() => {
    if (sortType === "all") {
      return projects;
    }

    return projects.filter((project) => project.projectType === sortType);
  }, [projects, sortType]);

  return (
    <div className="min-h-screen pt-18 sm:pt-17 px-3 sm:px-6 lg:px-7 bg-[var(--bg-primary)]">
      {/* ============================================
      HEADER
  ============================================ */}
      <div className="mb-5 pb-4 border-b border-[var(--border-color)]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* LEFT */}
          <div className="flex-1">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-2xl font-semibold sm:text-3xl text-[var(--text-primary)]">
                Active Projects
              </h1>
            </div>

            <p className="text-[var(--text-secondary)] text-sm sm:text-md mt-3 sm:mt-4 max-w-3xl leading-relaxed">
              Manage and monitor your team's current initiatives. Track
              progress, collaborate with members, and stay updated on every
              milestone.
            </p>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full lg:w-auto">
            {/* CREATE BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="
          w-fit

    flex items-center justify-center gap-2

    bg-[var(--primary)]/10
    text-[var(--primary)]

    hover:bg-[var(--primary)]
    hover:text-white

    px-5 py-3
    rounded-xl

    shadow-md
    hover:shadow-xl

    transition-all
    duration-300
    ease-out

    hover:scale-105
    active:scale-95

    whitespace-nowrap
    "
            >
              + Create Project
            </button>

            {/* SORT */}
            <div className="relative w-full sm:w-auto"></div>
          </div>
        </div>
      </div>

      {/* ============================================
          EMPTY STATE
      ============================================ */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col bg-[var(--bg-card)] items-center justify-center py-24 text-center border border-[var(--border-color)] rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            No Projects Found
          </h2>

          <p className="text-[var(--text-secondary)] mt-2">
            Create a project or change the filter.
          </p>
        </div>
      ) : (
        /* ============================================
      PROJECT GRID
  ============================================ */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      <Notification />

      {/* ============================================
    MODAL
============================================ */}
      <CreateProjectModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default Project;
