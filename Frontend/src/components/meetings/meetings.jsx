import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X,Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showLoading } from "../../utils/toast";
import { showToast } from "../../utils/toast";

const Meetings = () => {
  const [showModal, setShowModal] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProModal, setShowProModal] = useState(false);

  // FRONTEND MODEL
  const [meetingData, setMeetingData] = useState({
    title: "",
    date: "",
    startTime: "",
    duration: 30,
    meetingLink: "",
  });

  const navigate = useNavigate();

  // INPUT CHANGE
  const handleChange = (e) => {
    setMeetingData({
      ...meetingData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= FETCH MEETINGS =================
  const fetchMeetings = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/meeting",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMeetings(res.data.meetings || []);
  } catch (error) {
    console.log(error.response?.data || error.message);

    if (error.response?.status === 403) {
      setShowProModal(true);
      return;
    }

    showError("Failed to load meetings");
  } finally {
    setLoading(false);
  }
};

  // RUN ON PAGE LOAD
  useEffect(() => {
    fetchMeetings();
  }, []);

  // ================= CREATE MEETING =================
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!meetingData.title.trim()) {
    showError("Meeting title is required");
    return;
  }

  const loadingId = showLoading("Scheduling meeting...");

  try {
    const token = localStorage.getItem("token");

    const dateTime = new Date(
      `${meetingData.date}T${meetingData.startTime}`
    );

    const payload = {
      title: meetingData.title,
      dateTime,
      duration: meetingData.duration,
      meetingLink: meetingData.meetingLink,
    };

    await axios.post(
      "http://localhost:5000/api/meeting/create",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showSuccess("Meeting scheduled successfully 🎥", {
      id: loadingId,
    });

    setMeetingData({
      title: "",
      date: "",
      startTime: "",
      duration: 30,
      meetingLink: "",
    });

    setShowModal(false);

    fetchMeetings();
  } catch (error) {
    console.log(error.response?.data || error.message);

    if (error.response?.status === 403) {
      setShowProModal(true);

      showError(
  "Upgrade to Workspace Pro to create and manage meetings 🚀",
  {
    id: loadingId,
  }
);

      return;
    }

    showError(
      error.response?.data?.message ||
        "Failed to schedule meeting",
      {
        id: loadingId,
      }
    );
  }
};
  return (
    <div className="py-3 px-3 pt-15 sm:pt-15 space-y-8 sm:fixed sm:w-[79vw] ">
      {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b pb-3 border-[var(--border-color)]">

  <div>
    <h1 className="text-2xl sm:text-3xl text-[var(--text-primary)]">
      Scheduled Meetings
    </h1>

    <p className="text-[var(--text-secondary)] mt-1 text-sm sm:text-base">
      Plan and manage your team meetings easily
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
  "
>
  <Plus size={18} />
  Schedule Meeting
</button>

</div>

{/* ================= MEETING LIST ================= */}
<div className="mt-6">
  {loading ? (
    <p className="text-[var(--text-secondary)]">Loading meetings...</p>
  ) : meetings.length === 0 ? (
    <div className="flex items-center justify-center py-20 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
      <p className="text-[var(--text-secondary)] text-lg">
        No meetings scheduled
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meetings.map((meeting) => (
        <div
          key={meeting._id}
          className="
            relative group
            bg-[var(--bg-card)]
            backdrop-blur-xl
            border-l-4 border-l-[var(--primary)]
            shadow-sm hover:shadow-xl
            rounded-2xl
            p-6
            transition-all duration-300
            hover:-translate-y-1
          "
        >
          {/* HEADER ROW */}
          <div className="flex items-center justify-between mb-3">
            
            {/* TIME LEFT */}
            <span
              className="
                text-xs px-3 py-1
                bg-[var(--primary)]/10
                text-[var(--primary)]
                rounded-full
              "
            >
              {meeting.timeLeft || "Upcoming"}
            </span>

            <span className="text-xs text-[var(--text-secondary)]">
              {meeting.duration} min
            </span>

          </div>
                {/* TITLE */}
                {/* TITLE */}
<h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
  {meeting.title}
</h3>

{/* DATE */}
<p className="text-sm text-[var(--text-secondary)] mb-1">
  📅 {new Date(meeting.dateTime).toLocaleDateString()}
</p>

{/* TIME */}
<p className="text-sm text-[var(--text-secondary)] mb-3">
  ⏰ {new Date(meeting.dateTime).toLocaleTimeString()}
</p>

{/* CREATED BY */}
<div className="mb-4">
  <span
    className="
      flex items-center gap-2
      text-xs px-3 py-1
      bg-[var(--primary)]/10
      text-[var(--primary)]
      rounded-full
      w-fit
    "
  >
    {/* avatar */}
    <span
      className="
        w-5 h-5 rounded-full
        bg-[var(--primary)]
        text-white
        flex items-center justify-center
        text-[10px] font-bold
      "
    >
      {(meeting.createdBy?.name?.charAt(0) || "U").toUpperCase()}
    </span>

    {/* name */}
    <span className="font-medium">
      {meeting.createdBy?.name || "You"}
    </span>
  </span>
</div>

{/* JOIN BUTTON */}
{meeting.meetingLink ? (
  <a
    href={meeting.meetingLink}
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-block w-full text-center
      bg-[var(--primary)] hover:bg-[var(--primary-hover)]
      text-white py-2 rounded-xl
      font-medium transition
    "
  >
    Join Meeting
  </a>
) : (
  <button
    disabled
    className="
      w-full py-2 rounded-xl
      bg-[var(--bg-secondary)]
      text-[var(--text-secondary)]
      border border-[var(--border-color)]
      cursor-not-allowed
    "
  >
    No Link Available
  </button>
)}
 </div>
            ))}
          </div>
        )}
      </div>
     {/* ================= MODAL ================= */}
{showModal && (
  <div
    className="
      fixed inset-0
      bg-black/40
      flex items-center justify-center
      z-50
      p-4
      sm:ml-70
    "
  >
    <div
      className="
        w-full max-w-lg
        bg-[var(--bg-card)]
        rounded-[32px]
        shadow-2xl
        border border-[var(--border-color)]
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          px-7 py-5
          border-b border-[var(--border-color)]
          flex items-center justify-between
        "
      >
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Schedule Meeting
          </h2>

          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Create and schedule a new team meeting
          </p>
        </div>

        <button
          onClick={() => setShowModal(false)}
          className="
            w-10 h-10
            rounded-xl
            hover:bg-[var(--bg-secondary)]
            flex items-center justify-center
            transition
          "
        >
          <X size={20} className="text-[var(--text-primary)]" />
        </button>
      </div>

      {/* BODY */}
      <form onSubmit={handleSubmit} className="p-7 space-y-5">

        {/* TITLE */}
        <div>
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
            Meeting Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter meeting title"
            value={meetingData.title}
            onChange={handleChange}
            required
            className="
              w-full
              border border-[var(--border-color)]
              rounded-2xl
              px-5 py-4
              bg-[var(--bg-secondary)]
              text-[var(--text-primary)]
              outline-none
              focus:ring-2 focus:ring-[var(--primary)]/30
              focus:border-[var(--primary)]
              transition
            "
          />
        </div>

        {/* DATE + TIME GRID */}
        <div className="grid grid-cols-2 gap-4">

          {/* DATE */}
          <div>
            <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={meetingData.date}
              onChange={handleChange}
              required
              className="
                w-full
                border border-[var(--border-color)]
                rounded-2xl
                px-4 py-3
                bg-[var(--bg-secondary)]
                text-[var(--text-primary)]
                outline-none
                focus:ring-2 focus:ring-[var(--primary)]/30
                focus:border-[var(--primary)]
                transition
              "
            />
          </div>
               {/* TIME */}
<div>
  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
    Time
  </label>

  <input
    type="time"
    name="startTime"
    value={meetingData.startTime}
    onChange={handleChange}
    required
    className="
      w-full
      border border-[var(--border-color)]
      rounded-2xl
      px-4 py-3
      bg-[var(--bg-secondary)]
      text-[var(--text-primary)]
      outline-none
      focus:ring-2 focus:ring-[var(--primary)]/30
      focus:border-[var(--primary)]
      transition
    "
  />
</div>
</div>

{/* DURATION */}
<div>
  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
    Duration (minutes)
  </label>

  <input
    type="number"
    name="duration"
    placeholder="e.g. 30"
    value={meetingData.duration}
    onChange={handleChange}
    className="
      w-full
      border border-[var(--border-color)]
      rounded-2xl
      px-5 py-4
      bg-[var(--bg-secondary)]
      text-[var(--text-primary)]
      outline-none
      focus:ring-2 focus:ring-[var(--primary)]/30
      focus:border-[var(--primary)]
      transition
    "
  />
</div>

{/* LINK */}
<div>
  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
    Meeting Link
  </label>

  <input
    type="text"
    name="meetingLink"
    placeholder="Google Meet / Zoom link"
    value={meetingData.meetingLink}
    onChange={handleChange}
    className="
      w-full
      border border-[var(--border-color)]
      rounded-2xl
      px-5 py-4
      bg-[var(--bg-secondary)]
      text-[var(--text-primary)]
      outline-none
      focus:ring-2 focus:ring-[var(--primary)]/30
      focus:border-[var(--primary)]
      transition
    "
  />
</div>

              {/* FOOTER BUTTON */}
{/* FOOTER BUTTON */}
<div className="pt-2 flex justify-end gap-3">

  <button
    type="button"
    onClick={() => setShowModal(false)}
    className="
      px-6 py-3
      rounded-2xl
      border border-[var(--border-color)]
      text-[var(--text-primary)]
      hover:bg-[var(--bg-secondary)]
      transition
      font-medium
    "
  >
    Cancel
  </button>

  <button
    type="submit"
    className="
      px-7 py-3
      rounded-2xl
      bg-[var(--primary)]
      text-white
      font-semibold
      hover:bg-[var(--primary-hover)]
      transition
      shadow-sm
    "
  >
    Create Meeting
  </button>

</div>
            </form>
          </div>
        </div>
      )}

      {showProModal && (
  <div className="fixed sm:ml-60 inset-0 bg-black/40  flex items-center justify-center z-[100] p-4 ">

    <div
      className="
        w-full max-w-md
        rounded-3xl p-5 sm:p-8
        shadow-2xl
        bg-[var(--bg-card)]
        border border-[var(--border-color)]
      "
    >
      <div className="text-center">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <Lock
            size={48}
            className="
              p-2 rounded-2xl
              bg-[var(--primary)]/10
              text-[var(--primary)]
            "
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
          Meetings is a Pro Feature
        </h2>

        <p className="text-[var(--text-secondary)] mt-3 text-sm sm:text-base">
          Upgrade to Workspace Pro and unlock unlimited team meetings and collaboration.
        </p>

        {/* PRICE */}
        <div className="mt-6 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          <p className="text-[var(--primary)] font-semibold text-lg">
            ₹99/month
          </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">

          <button
            onClick={() => window.history.back()}
            className="
              w-full sm:flex-1
              py-3
              rounded-xl
              border border-[var(--border-color)]
              text-[var(--text-primary)]
              hover:bg-[var(--bg-secondary)]
              transition
            "
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="
              w-full sm:flex-1
              py-3
              rounded-xl
              bg-[var(--primary)]
              hover:bg-[var(--primary-hover)]
              text-white
              transition
            "
          >
            Upgrade Now
          </button>

        </div>
      </div>
    </div>

  </div>
)}
    </div>
  );
};

export default Meetings;
