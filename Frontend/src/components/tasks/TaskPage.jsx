import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Plus,
  X,
  ListChecks,
  CheckCircle2,
  Loader,
  CircleX,
  Clock,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { showSuccess, showError, showLoading } from "../../utils/toast";
import { showToast } from "../../utils/toast";
import Loaders from "../../ui/Loader";

const TaskPage = () => {
  const { projectId } = useParams();
  const token = localStorage.getItem("token");

  // ================= STATES =================
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showModal]);

  const phaseConfig = {
    "Not Started Yet": {
      color: "bg-red-100 text-red-600",
      icon: <CircleX size={14} />,
    },
    "In Process": {
      color: "bg-yellow-100 text-yellow-600",
      icon: <Clock size={14} />,
    },
    Completed: {
      color: "bg-green-100 text-green-600",
      icon: <CheckCircle2 size={14} />,
    },
  };

  const [form, setForm] = useState({
    fieldName: "Engineering",
    taskName: "",
    taskDescription: "",
  });

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      setFetching(true);

      const res = await axios.get(
        `http://localhost:5000/api/tasks/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setTasks(res.data.tasks || []);
    } catch (err) {
  console.log(err);

  showError(
    err.response?.data?.message ||
      "Failed to load tasks"
  );
} finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  // ================= CREATE TASK =================
const createTask = async () => {
  if (!form.taskName.trim()) {
    showError("Task name is required");
    return;
  }

  const loadingId = showLoading("Creating task...");

  try {
    setLoading(true);

    await axios.post(
      "http://localhost:5000/api/tasks/create",
      {
        projectId,
        fieldName: form.fieldName,
        taskName: form.taskName,
        taskDescription: form.taskDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showSuccess("Task created successfully ✅", {
      id: loadingId,
    });

    setForm({
      fieldName: "Engineering",
      taskName: "",
      taskDescription: "",
    });

    setShowModal(false);

    fetchTasks();
  } catch (err) {
    console.log(err);

    showError(
      err.response?.data?.message ||
        "Failed to create task",
      {
        id: loadingId,
      }
    );
  } finally {
    setLoading(false);
  }
};

  const filteredTasks = tasks.filter((task) => {
    const search = searchTerm.toLowerCase();

    return (
      task.taskName?.toLowerCase().includes(search) ||
      task.fieldName?.toLowerCase().includes(search) ||
      task.taskDescription?.toLowerCase().includes(search)
    );
  });

  // ================= UPDATE PHASE =================
const updatePhase = async (id, phase) => {
  const loadingId = showLoading("Updating task status...");

  try {
    await axios.patch(
      `http://localhost:5000/api/tasks/${id}/phase`,
      { phase },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, phase } : t
      )
    );

    showSuccess(`Task moved to "${phase}"`, {
      id: loadingId,
    });
  } catch (err) {
    console.log(err);

    showError("Failed to update task status", {
      id: loadingId,
    });
  }
};

  // ================= STATS =================
  const total = tasks.length;
  const completed = tasks.filter((t) => t.phase === "Completed").length;
  const inProgress = tasks.filter((t) => t.phase === "In Process").length;
  const notStarted = tasks.filter((t) => t.phase === "Not Started Yet").length;


  // ================= PAGINATION =================
const tasksPerPage = 3;

const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

const startIndex = (currentPage - 1) * tasksPerPage;

const currentTasks = filteredTasks.slice(
  startIndex,
  startIndex + tasksPerPage
);

useEffect(() => {
  fetchTasks();
}, [projectId]);

if (fetching) {
  return (
    <div className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-[var(--bg-primary)]
      ">
      <Loaders />

      <p className="text-[var(--text-secondary)] text-sm">
        Loading tasks...
      </p>
    </div>
  );
}

  return (
  <div className="py-3 px-3 pt-15 sm:pt-15 space-y-8 sm:fixed sm:w-[79vw] ">

  {/* ================= HEADER ================= */}
  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4">

    <div>
      <h1 className="sm:text-3xl text-2xl  text-[var(--text-primary)]">
        Product Launch Roadmap
      </h1>

      <p className="text-[var(--text-secondary)] mt-1 text-[15px]">
        End-to-End Product Launch Roadmap from Idea to Deployment
      </p>
    </div>

    <button
      onClick={() => setShowModal(true)}
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
      <Plus size={18} />
      Create New Task
    </button>

  </div>

  {/* ================= STATS ================= */}
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 border-t border-[var(--border-color)] pt-4">

    {/* TOTAL */}
    <div className="bg-[var(--primary)]/10 p-5 rounded-xl shadow flex justify-between items-center border border-[var(--border-color)]">

      <div>
        <p className="text-[var(--text-secondary)] text-md">
          Total Tasks
        </p>
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">
          {total}
        </h3>
      </div>

      <ListChecks className="text-[var(--primary)] w-8 h-8" />

    </div>

    {/* COMPLETED */}
    <div className="bg-[var(--primary)]/10 p-5 rounded-xl shadow flex justify-between items-center border border-[var(--border-color)]">

      <div>
        <p className="text-[var(--text-secondary)] text-sm">
          Completed
        </p>

        <h3 className="text-2xl font-bold text-green-500">
          {completed}
        </h3>
      </div>

      <CheckCircle2 className="text-green-500 w-8 h-8" />

    </div>

    {/* IN PROGRESS */}
    <div className="bg-[var(--primary)]/10 p-5 rounded-xl shadow flex justify-between items-center border border-[var(--border-color)]">

      <div>
        <p className="text-[var(--text-secondary)] text-sm">
          In Progress
        </p>

        <h3 className="text-2xl font-bold text-yellow-500">
          {inProgress}
        </h3>
      </div>

      <Loader className="text-yellow-500 w-8 h-8 animate-spin" />

    </div>

    {/* NOT STARTED */}
    <div className="bg-[var(--primary)]/10 p-5 rounded-xl shadow flex justify-between items-center border border-[var(--border-color)]">

      <div>
        <p className="text-[var(--text-secondary)] text-sm">
          Not Started
        </p>

        <h3 className="text-2xl font-bold text-red-500">
          {notStarted}
        </h3>
      </div>

      <CircleX className="text-red-500 w-8 h-8" />

    </div>

  </div>

  {/* ================= SEARCH ================= */}
  <div className="relative w-full md:w-[350px] mb-5">

    <input
      type="text"
      placeholder="Search tasks by name, field or description..."
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



{/* ================= TASK LIST ================= */}
<div className="overflow-x-auto overflow-y-hidden pb-4">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 min-w-max">

    {fetching ? (
      <p className="text-[var(--text-secondary)]">Loading tasks...</p>
    ) : currentTasks.length === 0 ? (
      <p className="text-[var(--text-secondary)]">No tasks found</p>
    ) : (
      currentTasks.map((task) => (
        <div
          key={task._id}
          className="
            relative group
            bg-[var(--bg-card)]
            border border-[var(--border-color)]
            border-l-4 border-l-[var(--primary)]
            shadow-sm hover:shadow-xl
            rounded-2xl
            px-10 py-5
            transition-all duration-300
            hover:-translate-y-1
            overflow-hidden
            sm:w-[380px]
          "
        >

          {/* TOP BADGE */}
          <div className="flex items-center justify-between mb-3">

            <span
              className="
                text-xs font-bold uppercase tracking-wider
                px-2 py-1 rounded-full
                bg-[var(--primary)]/10 text-[var(--primary)]
              "
            >
              {task.fieldName}
            </span>

            <span className="text-[var(--text-secondary)] group-hover:text-[var(--primary)]">
              ⠿
            </span>

          </div>

          {/* TITLE */}
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            {task.taskName}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-4">
            {task.taskDescription || "No description"}
          </p>

          {/* META */}
          <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] mb-4">

            <span className="flex items-center gap-2 text-xs">
              <Calendar size={14} />
              {new Date(task.taskAddDate).toLocaleDateString()}
            </span>

            <span
              className={`
                px-2 py-1 text-xs rounded-full font-semibold
                ${
                  task.phase === "Completed"
                    ? "bg-green-500/10 text-green-500"
                    : task.phase === "In Process"
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-red-500/10 text-red-500"
                }
              `}
            >
              {task.phase}
            </span>

          </div>

          {/* PROGRESS BAR */}
          <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full mb-4 overflow-hidden">

            <div
              className={`
                h-full rounded-full transition-all duration-300
                ${
                  task.phase === "Completed"
                    ? "w-full bg-green-500"
                    : task.phase === "In Process"
                    ? "w-1/2 bg-blue-500"
                    : "w-1/6 bg-red-400"
                }
              `}
            />

          </div>

          {/* PHASE SELECT */}
          <select
            value={task.phase}
            onChange={(e) => updatePhase(task._id, e.target.value)}
            className="
              w-full
              text-sm
              border border-[var(--border-color)]
              rounded-xl
              px-3 py-2
              outline-none
              bg-[var(--bg-secondary)]
              text-[var(--text-primary)]
              focus:ring-2 focus:ring-[var(--primary)]/30
              transition
            "
          >

            <option value="Not Started Yet">Not Started Yet</option>
            <option value="In Process">In Process</option>
            <option value="Completed">Completed</option>

          </select>

        </div>
      ))
    )}

  </div>

</div>

{/* ================= PAGINATION ================= */}
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-3 mt-2">

    {Array.from({ length: totalPages }).map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`
          w-10 h-10
          rounded-xl
          font-semibold
          transition

          ${
            currentPage === index + 1
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
          }
        `}
      >
        {index + 1}
      </button>
    ))}

  </div>
)}

{/* ================= MODAL ================= */}
{showModal && (
  <div
    className="
      fixed inset-0 z-50 sm:ml-70
      flex items-center justify-center
      bg-black/40 
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

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">

        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Create New Task
          </h2>

          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Add task details to manage your project workflow
          </p>

        </div>

        <button
          onClick={() => setShowModal(false)}
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

      {/* ================= BODY ================= */}
      <div className="p-6 space-y-5">

        {/* FIELD TYPE */}
        <div>

          <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">
            Field Type
          </label>

          <select
            value={form.fieldName}
            onChange={(e) =>
              setForm({ ...form, fieldName: e.target.value })
            }
            className="
              w-full
              px-4 py-3
              rounded-2xl
              bg-[var(--bg-secondary)]
              border border-[var(--border-color)]
              outline-none
              text-[var(--text-primary)]
              focus:ring-2 focus:ring-[var(--primary)]/30
              transition
            "
          >
            <option value="Research">Research</option>
            <option value="Engineering">Engineering</option>
            <option value="QA">QA</option>
            <option value="Design">Design</option>
          </select>

        </div>

        {/* TASK NAME */}
        <div>

          <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">
            Task Name
          </label>

          <input
            value={form.taskName}
            onChange={(e) =>
              setForm({ ...form, taskName: e.target.value })
            }
            placeholder="Enter task name"
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
        <div>

          <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">
            Task Description
          </label>

          <textarea
            value={form.taskDescription}
            onChange={(e) =>
              setForm({ ...form, taskDescription: e.target.value })
            }
            placeholder="Enter task description"
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
              min-h-[120px]
            "
          />

        </div>

        {/* ================= BUTTONS ================= */}
        <div className="flex justify-end gap-3 pt-2">

          <button
            onClick={() => setShowModal(false)}
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
            onClick={createTask}
            disabled={loading}
            className="
              px-6 py-3
              rounded-2xl
              bg-[var(--primary)]
              text-white
              hover:opacity-90
              transition
            "
          >
            {loading ? "Creating..." : "Create Task"}
          </button>

        </div>

      </div>

    </div>
  </div>
)}
</div>
  );
};

export default TaskPage;
