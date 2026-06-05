import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Rocket,
  Smartphone,
  Users,
  CalendarDays,
} from "lucide-react";

const ProjectCard = ({ project }) => {

  const navigate = useNavigate();

  return (
<div
  className="
    bg-[var(--bg-card)]
    rounded-3xl
    border border-[var(--border-color)]
    shadow-sm
    hover:shadow-xl
    transition-all
    duration-300
    overflow-hidden
  "
>

  {/* TOP COLOR BAR */}
  <div
    className="h-2 w-full"
    style={{
      backgroundColor: project.color,
    }}
  />

  <div className="p-6">

    {/* HEADER */}
    <div className="flex items-start justify-between gap-3">

      {/* LEFT */}
      <div className="flex items-start gap-3">

        {/* ICON */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            backgroundColor: `${project.color}20`,
          }}
        >
          {project.projectType === "web" ? (
            <Rocket size={22} style={{ color: project.color }} />
          ) : (
            <Smartphone size={22} style={{ color: project.color }} />
          )}
        </div>

        {/* TITLE */}
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] line-clamp-1">
            {project.title}
          </h2>

          <p className="text-sm text-[var(--text-secondary)] mt-1 capitalize">
            {project.projectType} project
          </p>
        </div>
      </div>

    </div>

    {/* DESCRIPTION */}
    <p className="text-[var(--text-secondary)] text-sm mt-5 line-clamp-3 min-h-[60px] pb-10">
      {project.description || "No description provided"}
    </p>

        {/* ============================================
            PROGRESS
        ============================================ */}
        <div className="mt-6">

          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">
              Progress
            </p>

            <p className="text-sm font-semibold text-gray-700">
              {project.progress || 0}%
            </p>
          </div>

          {/* BAR */}
          <div className="w-full bg-[var(--border-color)] h-2 rounded-full overflow-hidden">

            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${project.progress || 0}%`,
                backgroundColor: project.color,
              }}
            />

          </div>
        </div>



        {/* >
</div>

{/* FOOTER */}
<div
  className="
    mt-6
    pt-5
    border-t
    border-[var(--border-color)]
    flex
    items-center
    justify-between
  "
>

  {/* CREATED DATE */}
  <div className="flex items-center gap-2 text-[var(--text-secondary)]">

    <CalendarDays size={16} />

    <div>
      <p className="text-xs">
        Created
      </p>

      <p className="text-sm font-medium text-[var(--text-primary)]">
        {new Date(project.createdAt).toLocaleDateString()}
      </p>
    </div>
  </div>

  {/* BUTTON */}
  <button
    onClick={() => navigate(`/project/${project._id}`)}
className="
  px-5
  py-2.5
  rounded-2xl
  text-white
  font-medium
  shadow-md

  transform
  transition-all
  duration-300
  ease-out

  hover:scale-[1.08]
  hover:shadow-xl
"
    style={{
      backgroundColor: project.color,
    }}
  >
    Open
  </button>

</div>
      </div>
    </div>
  );
};

export default ProjectCard;