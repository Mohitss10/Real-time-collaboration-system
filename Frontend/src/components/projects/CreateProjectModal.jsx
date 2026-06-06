import React, { useState } from "react";
import axios from "axios";
import { Globe, Smartphone, X } from "lucide-react";
import { showSuccess, showError, showLoading } from "../../utils/toast";

const CreateProjectModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectType: "web",
    visibility: "private",
    color: "#6366f1",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // ================================
  // HANDLE INPUT
  // ================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================================
  // SUBMIT PROJECT
  // ================================
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.title.trim()) {
    showError("Project title is required");
    return;
  }

  const loadingId = showLoading("Creating project...");
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/projects/create`,
  {
    ...formData,
    status: "planning",
    progress: 0,
  },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Success Toast
    showSuccess("Project created successfully 🚀", {
      id: loadingId,
    });

    onCreate?.(response.data.project);

    // Reset Form
    setFormData({
      title: "",
      description: "",
      projectType: "web",
      visibility: "private",
      color: "#6366f1",
    });

    onClose();
  } catch (error) {
    console.log(error.response?.data || error.message);

    showError(
      error?.response?.data?.message ||
        "Failed to create project ❌",
      {
        id: loadingId,
      }
    );
  } finally {
    setLoading(false);
  }
};

  // ================================
  // MODAL UI
  // ================================
  return (
<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto p-4 flex justify-center">

  <div className="w-full sm:mt-20 mt-15 sm:fixed max-w-4xl mx-auto my-4 sm:my-8 bg-[var(--bg-card)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

    {/* HEADER */}
    <div className="flex items-center justify-between gap-3 py-5 mx-8 border-b border-[var(--border-color)] flex-shrink-0">

      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Create New Project
        </h2>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
          Create a new project to start organizing your work and
          collaborating with your team.
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-secondary)] transition"
      >
        <X size={24} className="text-[var(--text-secondary)]" />
      </button>

    </div>

    {/* SCROLLABLE BODY */}
    <form
      onSubmit={handleSubmit}
      className="p-4 sm:p-6 overflow-y-auto"
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* TITLE */}
          <div className="px-4">

            <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">
              Project Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
              className="
 w-full
              px-4 py-4
              rounded-2xl
              bg-[var(--bg-secondary)]
              border border-[var(--border-color)]
              outline-none
              text-[var(--text-primary)]
              focus:ring-2 focus:ring-[var(--primary)]/30
              transition
              "
            />
          </div>

          {/* DESCRIPTION */}
          <div className="px-4">

            <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write project description..."
              className="
                w-full
                mt-1
                p-3
                min-h-[180px]
                md:min-h-[260px]              
              rounded-2xl
              bg-[var(--bg-secondary)]
              border border-[var(--border-color)]
              outline-none
              text-[var(--text-primary)]
              focus:ring-2 focus:ring-[var(--primary)]/30
              transition
              "
            />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* PROJECT TYPE */}
          <div className="px-4">

            <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">
              Project Type
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">

              {/* WEB */}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    projectType: "web",
                  })
                }
                className={`
                  p-4 rounded-xl flex flex-col items-center gap-2 transition border
                  ${
                    formData.projectType === "web"
                      ? "bg-[var(--primary)]/10 border-[var(--primary)]"
                      : "bg-[var(--bg-card)] border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
                  }
                `}
              >
                <Globe size={22} className="text-[var(--primary)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Web
                </span>
              </button>

              {/* MOBILE */}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    projectType: "mobile",
                  })
                }
                className={`
                  p-4 rounded-xl flex flex-col items-center gap-2 transition border
                  ${
                    formData.projectType === "mobile"
                      ? "bg-[var(--primary)]/10 border-[var(--primary)]"
                      : "bg-[var(--bg-card)] border-[var(--border-color)] hover:bg-[var(--bg-secondary)]"
                  }
                `}
              >
                <Smartphone size={22} className="text-[var(--primary)]" />
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  Mobile
                </span>
              </button>

            </div>

          </div>

          {/* VISIBILITY */}
<div className="px-4">

  <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block mx-2">
    Visibility
  </label>

  <select
    name="visibility"
    value={formData.visibility}
    onChange={handleChange}
    className="
 w-full
              px-4 py-4
              rounded-2xl
              bg-[var(--bg-secondary)]
              border border-[var(--border-color)]
              outline-none
              text-[var(--text-primary)]
              focus:ring-2 focus:ring-[var(--primary)]/30
              transition
    "
  >
    <option value="private">Private</option>
    <option value="public">Public</option>
  </select>

</div>

{/* THEME COLOR */}
<div className="px-4">

  <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block mx-2">
    Theme Color
  </label>

  <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 px-5">

    {[
      "#6366f1",
      "#8b5cf6",
      "#a78bfa",
      "#ec4899",
      "#14b8a6",
      "#22c55e",
    ].map((color) => (
      <button
        key={color}
        type="button"
        onClick={() =>
          setFormData({ ...formData, color })
        }
        className={`
          w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all 
          ${
            formData.color === color
              ? "ring-2 ring-[var(--primary)] ring-offset-2 scale-110"
              : "hover:scale-110"
          }
        `}
        style={{ backgroundColor: color }}
      />
    ))}

  </div>

  <div className="mt-4 flex items-center gap-3 px-4">

    <div
      className="w-10 h-10 rounded-full border border-[var(--border-color)]"
      style={{ backgroundColor: formData.color }}
    />

    <span className="text-sm text-[var(--text-secondary)] break-all ">
      Selected: {formData.color}
    </span>

  </div>

</div>

        </div>
      </div>

      {/* ACTIONS */}
<div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-3 border-t border-[var(--border-color)] pt-5 px-4">

  <button
    type="button"
    onClick={onClose}
    className="
      w-full sm:w-auto px-6 py-3 rounded-xl
      border border-[var(--border-color)]
      text-[var(--text-primary)]
      hover:bg-[var(--bg-secondary)]
      transition
    "
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={loading}
    className="
      w-full sm:w-auto px-6 py-3 rounded-xl
      bg-[var(--primary)]
      text-white
      hover:opacity-90
      transition
    "
  >
    {loading ? "Creating..." : "Create Project"}
  </button>

</div>
    </form>
  </div>
</div>
  );
};

export default CreateProjectModal;
