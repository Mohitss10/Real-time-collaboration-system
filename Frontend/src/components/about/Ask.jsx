import React, { useState } from "react";
import {
  Users,
  CheckSquare,
  MessageSquare,
  FileText,
  Shield,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";

const Ask = () => {
  return (

<section className="max-w-6xl mx-auto px-6 pb-20">
  <h2
    className="
      text-3xl sm:text-4xl
      font-bold
      text-center
      text-[var(--text-primary)]
      mb-12
    "
  >
    Ask Anything
  </h2>

  <div
    className="
      grid md:grid-cols-2
      gap-10
      bg-[var(--bg-card)]
      border border-[var(--border-color)]
      shadow-xl
      rounded-3xl
      overflow-hidden
    "
  >
    {/* LEFT SIDE */}
    <div
      className="
        bg-gradient-to-br
        from-[var(--primary)]
        to-[var(--primary-hover)]
        text-white
        p-10
        flex flex-col justify-center
      "
    >
      <h2 className="text-3xl font-bold mb-4">
        Welcome 👋
      </h2>

      <p className="opacity-90 mb-6">
        Enter your queries and continue exploring your workspace.
      </p>

      <div className="space-y-3 text-sm opacity-90">
        <p>✔ Smart query handling</p>
        <p>✔ Multi-query support (comma separated)</p>
        <p>✔ Fast processing system</p>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="p-10">
      <h3
        className="
          text-2xl
          font-semibold
          text-[var(--text-primary)]
          mb-6
        "
      >
        Enter Your Query
      </h3>

      <form className="space-y-5">
        {/* QUERY INPUT */}
        <div>
          <label
            className="
              text-sm
              text-[var(--text-secondary)]
            "
          >
            Query (you can separate multiple queries using ,)
          </label>

          <textarea
            placeholder="e.g. build dashboard, fix login bug, optimize API"
            className="
              w-full
              mt-2
              px-4 py-3
              h-32
              resize-none

              bg-[var(--bg-secondary)]
              text-[var(--text-primary)]

              border border-[var(--border-color)]
              rounded-xl

              outline-none
              focus:ring-2
              focus:ring-[var(--primary)]/30
              focus:border-[var(--primary)]
            "
          />
        </div>

        {/* BUTTON */}
        <button
          type="button"
          className="
            w-full
            bg-[var(--primary)]
            hover:bg-[var(--primary-hover)]

            text-white
            py-3
            rounded-xl

            font-semibold

            transition-all
            duration-300

            hover:scale-[1.01]
            hover:shadow-lg
          "
        >
          Submit Query
        </button>

        {/* FOOTER TEXT */}
        <p
          className="
            text-sm
            text-center
            text-[var(--text-secondary)]
          "
        >
          Tip: Separate multiple queries using a comma (,)
        </p>
      </form>
    </div>
  </div>
</section>
  )
}

export default Ask