import React from "react";
import {
  FolderPlus,
  UserPlus,
  FileText,
  CheckSquare,
} from "lucide-react";

const notifications = [
// const notifications = []; // test empty state

  
];

const Notification = () => {
  return (
    <div className="py-6 h-full bg-[var(--bg-primary)]">

  {/* Header */}
  <div className="mb-1">
    <h1 className="text-2xl font-semibold sm:text-3xl text-[var(--text-primary)]">
      Notifications
    </h1>

    <p className="text-[var(--text-secondary)] text-md mt-1">
      Track all activities happening in your workspace
    </p>
  </div>

  {notifications.length === 0 ? (
    <div
      className="
        bg-[var(--bg-card)]
        rounded-3xl
        border border-[var(--border-color)]
        p-20
        text-center
        shadow-sm
        mt-6
      "
    >
      <div className="flex justify-center mb-5">
        <div className="w-20 h-20 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
          <FileText size={38} className="text-[var(--primary)]" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[var(--text-primary)]">
        No Notifications Found
      </h2>

      <p className="text-[var(--text-secondary)] mt-3">
        No activity has been recorded in your workspace yet.
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pt-4">

      {notifications.map((item) => (
        <div
          key={item.id}
          className="
            bg-[var(--bg-card)]
            p-5
            rounded-xl
            border border-[var(--border-color)]
            shadow-sm
            hover:shadow-md
            transition
          "
        >

          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-[var(--primary)]/10">
              {item.icon}
            </div>

            <span className="text-xs text-[var(--text-secondary)]">
              {item.date}
            </span>
          </div>

          <h3 className="font-semibold text-[var(--text-primary)] mt-4">
            {item.title}
          </h3>

          <p className="text-sm text-[var(--text-secondary)] mt-2">
            <span className="font-medium text-[var(--primary)]">
              {item.user}
            </span>{" "}
            {item.action}
          </p>

          <p className="text-sm text-[var(--text-secondary)] mt-2">
            📁 {item.project}
          </p>

          <p className="text-xs text-[var(--text-secondary)] mt-3">
            {item.time}
          </p>

        </div>
      ))}

    </div>
  )}
</div>
  );
};

export default Notification;