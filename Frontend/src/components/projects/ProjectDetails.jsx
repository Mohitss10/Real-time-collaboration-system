import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../ui/Loader";

import {
  Rocket,
  Smartphone,
  Users,
  CalendarDays,
  Lock,
  Globe,
  BarChart3,
  Mail,
} from "lucide-react";

const ProjectDetails = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [inviting, setInviting] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const isLeader = project?.members?.some(
    (member) =>
      member.user?._id?.toString() === currentUser?._id?.toString() &&
      member.role === "leader",
  );

  const images = [
    "https://r4.wallpaperflare.com/wallpaper/346/806/481/geometry-abstract-blue-digital-art-wallpaper-132f1757fea2177446ca6a94746d5f1a.jpg",
  ];

  const getProjectImage = (id) => {
    const index = parseInt(id?.slice(-2), 16) % images.length;
    return images[index];
  };

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/projects/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setProject(response.data.project);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    if (!email) return;

    try {
      setInviting(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/invites/invite",
        { projectId, email },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setEmail("");
      fetchProject();
    } catch (error) {
      console.log(error.message);
    } finally {
      setInviting(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

 if (loading) {
  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-[var(--bg-primary)]
      "
    >
      <Loader />

      <p className="mt-4 text-[var(--text-secondary)] text-sm">
        Loading project...
      </p>
    </div>
  );
}

  if (!project) {
    return (
      <div className="min-h-screen flex  items-center justify-center text-red-500">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 pt-15 sm:pt-15 sm:fixed sm:w-[79vw]">

  {/* HEADER */}
  <div className=" p-3]">

    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

      {/* LEFT */}
      <div className="flex items-start gap-5">

        <div>

          <h1 className="text-3xl  text-[var(--text-primary)]">
            {project.title}
          </h1>

          <p className="text-[var(--text-secondary)] mt-2 max-w-2xl leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">

            {/* TYPE */}
            <span className="px-3 py-1 rounded-full text-sm  bg-[var(--primary)]/10
    text-[var(--primary)]">
              {project.projectType}
            </span>

            {/* STATUS */}
            <span className="px-3 py-1 rounded-full text-sm  bg-[var(--primary)]/10
    text-[var(--primary)]">
              {project.status}
            </span>

            {/* VISIBILITY */}
            <span className="px-3 py-1 rounded-full text-sm  bg-[var(--primary)]/10
    text-[var(--primary)]">
              {project.visibility}
            </span>

          </div>

        </div>

      </div>


          {/* PROJECT CODE */}
<div className="flex flex-col sm:flex-row flex-wrap gap-3">

  <div className="bg-[var(--bg-secondary)] p-4 sm:p-5 rounded-2xl shadow-sm flex-1 min-w-[160px] border border-[var(--border-color)]">
    <p className="text-[var(--text-secondary)] text-sm">Created</p>
    <p className="font-semibold text-[var(--text-primary)]">
      {new Date(project.createdAt).toLocaleDateString()}
    </p>
  </div>

  <div className="bg-[var(--bg-secondary)] p-4 sm:p-5 rounded-2xl shadow-sm flex-1 min-w-[160px] border border-[var(--border-color)]">
    <p className="text-[var(--text-secondary)] text-sm">Members</p>
    <p className="font-semibold text-[var(--text-primary)]">
      {project.members?.length || 0}
    </p>
  </div>

  <div className="bg-[var(--bg-secondary)] p-4 sm:p-5 rounded-2xl shadow-sm flex-1 min-w-[180px] border border-[var(--border-color)]">
    <p className="text-sm text-[var(--text-secondary)]">Project Code</p>
    <p className="text-lg sm:text-xl font-bold tracking-widest text-[var(--primary)] break-all">
      {project.projectCode}
    </p>
  </div>

</div>

        </div>

        <div className="w-full mb-6 pt-5">
          <img
            src={getProjectImage(project._id)}
            alt="project"
            className="w-full h-120 object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* ================= PROGRESS ================= */}
<div className="mt-8">

  <div className="flex justify-between mb-2">

    <p className="text-[var(--text-secondary)] font-medium flex items-center gap-2">
      <BarChart3 size={18} /> Progress
    </p>

    <p className="font-bold text-[var(--text-primary)]">
      {project.progress || 0}%
    </p>

  </div>

  <div className="w-full h-3 bg-[var(--border-color)] rounded-full overflow-hidden">

    <div
      className="h-full rounded-full transition-all duration-500"
      style={{
        width: `${project.progress || 0}%`,
        backgroundColor: project.color,
      }}
    />

  </div>

</div>
      
      </div>
      </div>
    
  );
};

export default ProjectDetails;
