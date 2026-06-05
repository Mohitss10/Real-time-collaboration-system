import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Users, Mail, X, UserPlus } from "lucide-react";
import { showSuccess, showError, showLoading } from "../../utils/toast";
import { showToast } from "../../utils/toast";
import Loader from "../../ui/Loader";

const ProjectDetails = () => {
  const { projectId } = useParams();

  const [email, setEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // MODAL STATE
  const [showInviteModal, setShowInviteModal] = useState(false);

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  // CHECK LEADER
  const isLeader = project?.members?.some(
    (member) =>
      member.user?._id?.toString() === currentUser?._id?.toString() &&
      member.role === "leader",
  );

  // FETCH PROJECT
  const fetchProject = async () => {
    try {
     const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
  {
    headers: { Authorization: `Bearer ${token}` },
  },
);

      setProject(res.data.project);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  // INVITE MEMBER
const handleInvite = async () => {
  if (!email.trim()) {
    showError("Please enter an email address");
    return;
  }

  const loadingId = showLoading("Sending invitation...");

  try {
    setInviting(true);

    const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/invites/invite`,
  { projectId, email: email.trim() },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    showSuccess(
      res.data.message || "Invitation sent successfully 🚀",
      {
        id: loadingId,
      }
    );

    setEmail("");
    setShowInviteModal(false);

    fetchProject();
  } catch (err) {
    showError(
    "User must have a Nexus account before they can be added to your team.",
  {
    id: loadingId,
  }
);
  } finally {
    setInviting(false);
  }
};

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

  if (!project)
    return <div className="p-10 text-red-500">Project not found</div>;

  return (
    <div className="py-3 px-3 pt-15 sm:pt-15 space-y-8 sm:fixed sm:w-[79vw] ">

  <div className="mb-10">

    {/* HEADER */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-3">

      <div>
        <h1 className="text-2xl mb-1 sm:text-3xl text-[var(--text-primary)]">
          Team Members
        </h1>

        <p className="text-[var(--text-secondary)] text-[15px]  max-w-3xl leading-relaxed">
          Manage your workspace members and their roles.
        </p>
      </div>



      {/* INVITE BUTTON */}
     {isLeader && (
  <button
    onClick={() => {
      showToast("Enter an email to invite a team member 👥");
      setShowInviteModal(true);
    }}
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
    <UserPlus size={18} />
    Invite Member
  </button>
)}

    </div>

    {/* MEMBERS SECTION */}
    <div className="border-t border-[var(--border-color)] py-4">

      {/* SEARCH BAR */}
      <div className="flex items-center justify-between mb-6">

        <div className="relative w-full md:w-[350px]">

          <input
            type="text"
            placeholder="Search member by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full
              bg-[var(--bg-card)]
              border border-[var(--border-color)]
              rounded-2xl
              py-3 pl-5 pr-4
              outline-none
              text-[var(--text-primary)]
              focus:ring-2 focus:ring-[var(--primary)]/30
              focus:border-[var(--primary)]
              transition
              shadow-sm
            "
          />

        </div>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {project.members
          ?.filter((member) =>
            member.user?.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
          .map((member, index) => {
            const user = member.user;

            return (
              <div
                key={index}
                className="
                  bg-[var(--bg-card)]
                  rounded-2xl
                  border border-[var(--border-color)]
                  border-l-4 border-l-[var(--primary)]
                  p-7
                  hover:shadow-md
                  transition-all duration-300
                "
              >

                {/* TOP */}
                <div className="flex items-start justify-between">

                  <div className="flex gap-4">

                    {/* PROFILE */}
                    <img
                      src={
                        user?.profileImage ||
                        `https://ui-avatars.com/api/?name=${user?.name}`
                      }
                      alt=""
                      className="w-14 h-14 rounded-full object-cover border border-[var(--border-color)]"
                    />

                    {/* INFO */}
                    <div>

                      <h3 className="text-xl font-semibold text-[var(--text-primary)] leading-none">
                        {user?.name}
                      </h3>

                      <p className="text-md text-[var(--text-secondary)] mt-2 break-all">
                        {user?.email}
                      </p>

                    </div>

                  </div>

                </div>

                {/* BOTTOM */}
                <div className="mt-5 pt-4 border-t border-[var(--border-color)] flex items-center justify-between">

                  {/* ROLE */}
                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        member.role === "leader"
                          ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                          : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                      }
                    `}
                  >
                    {member.role}
                  </span>

                  {/* LAST ACTIVE */}
                  <p className="text-sm text-[var(--text-secondary)]">
                    Last active 2m ago
                  </p>

                </div>

              </div>
            );
          })}

      </div>

    </div>

  </div> 
     {showInviteModal && (
  <div
    className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/40 sm:ml-70
      p-4
    "
  >
    <div
      className="
        w-full max-w-lg
        bg-[var(--bg-card)]
        rounded-3xl
        shadow-2xl
        overflow-hidden
        border border-[var(--border-color)]
      "
    >

      {/* TOP */}
      <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">

        <div>
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
            Invite Team Member
          </h2>

          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Add collaborators to your project workspace
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(false)}
          className="
            w-10 h-10
            rounded-full
            hover:bg-[var(--bg-secondary)]
            flex items-center justify-center
            transition
          "
        >
          <X size={20} className="text-[var(--text-secondary)]" />
        </button>

      </div>

      {/* BODY */}
      <div className="p-6 space-y-5">

        {/* INPUT */}
        <div>
          <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">
            Member Email
          </label>

          <div className="relative">

            <Mail
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-[var(--text-secondary)]
              "
              size={18}
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
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
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-2">

          <button
            onClick={() => setShowInviteModal(false)}
            className="
              px-5 py-3
              rounded-2xl
              border border-[var(--border-color)]
              text-[var(--text-primary)]
              hover:bg-[var(--bg-secondary)]
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              await handleInvite();
              setShowInviteModal(false);
            }}
            disabled={inviting}
            className="
              px-6 py-3
              rounded-2xl
              bg-[var(--primary)]
              text-white
              hover:opacity-90
              transition
            "
          >
            {inviting ? "Inviting..." : "Send Invite"}
          </button>

        </div>

      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default ProjectDetails;
