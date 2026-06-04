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

const About = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
   <div className="min-h-screen bg-[var(--bg-primary)] mt-14">
  {/* HERO */}
  <section className="mx-auto px-6 pt-10 pb-20 text-center">
    <div className="text-center mx-2 sm:mx-10">
      <div className="w-full">
        <img
          src="collaboration.jpg"
          alt="Team Collaboration"
          className="
            w-full
            h-[35vh] sm:h-[60vh]
            rounded-3xl
            object-cover
            shadow-xl
            border border-[var(--border-color)]
          "
        />
      </div>

      <div className="mt-10">
        <span
          className="
            px-4 py-2
            rounded-full
            bg-[var(--primary)]/10
            text-[var(--primary)]
            font-medium
            text-sm
            border border-[var(--primary)]/20
          "
        >
          About Nexus
        </span>
      </div>

      <h1
        className="
          mt-6
          text-4xl sm:text-5xl md:text-6xl
          font-bold
          text-[var(--text-primary)]
        "
      >
        Smarter Team Collaboration
      </h1>

      <p
        className="
          mt-6
          max-w-3xl
          mx-auto
          text-base sm:text-lg
          text-[var(--text-secondary)]
          leading-relaxed
        "
      >
        Nexus is a modern collaboration platform designed to help teams
        manage projects, communicate effectively, organize tasks, and share
        documents from a single workspace.
      </p>
    </div>
  </section>


      {/* FEATURES */}
     <section className="max-w-7xl mx-auto px-6 pb-20">
  <h2
    className="
      text-3xl sm:text-4xl
      font-bold
      text-center
      text-[var(--text-primary)]
      mb-12
    "
  >
    What Nexus Offers
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* CARD 1 */}
    <div
      className="
        bg-[var(--bg-card)]
        p-8
        rounded-3xl
        border border-[var(--border-color)]
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition-all duration-300
      "
    >
      <Users
        className="text-[var(--primary)] mb-4"
        size={40}
      />
      <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">
        Team Management
      </h3>
      <p className="text-[var(--text-secondary)]">
        Create teams and collaborate efficiently.
      </p>
    </div>

    {/* CARD 2 */}
    <div
      className="
        bg-[var(--bg-card)]
        p-8
        rounded-3xl
        border border-[var(--border-color)]
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition-all duration-300
      "
    >
      <CheckSquare
        className="text-[var(--primary)] mb-4"
        size={40}
      />
      <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">
        Task Tracking
      </h3>
      <p className="text-[var(--text-secondary)]">
        Track progress and manage workflows.
      </p>
    </div>

    {/* CARD 3 */}
    <div
      className="
        bg-[var(--bg-card)]
        p-8
        rounded-3xl
        border border-[var(--border-color)]
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition-all duration-300
      "
    >
      <MessageSquare
        className="text-[var(--primary)] mb-4"
        size={40}
      />
      <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">
        Communication
      </h3>
      <p className="text-[var(--text-secondary)]">
        Real-time messaging with your team.
      </p>
    </div>

    {/* CARD 4 */}
    <div
      className="
        bg-[var(--bg-card)]
        p-8
        rounded-3xl
        border border-[var(--border-color)]
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition-all duration-300
      "
    >
      <FileText
        className="text-[var(--primary)] mb-4"
        size={40}
      />
      <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">
        Document Sharing
      </h3>
      <p className="text-[var(--text-secondary)]">
        Upload, manage, and share important project documents securely.
      </p>
    </div>

    {/* CARD 5 */}
    <div
      className="
        bg-[var(--bg-card)]
        p-8
        rounded-3xl
        border border-[var(--border-color)]
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition-all duration-300
      "
    >
      <Shield
        className="text-[var(--primary)] mb-4"
        size={40}
      />
      <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">
        Secure Workspace
      </h3>
      <p className="text-[var(--text-secondary)]">
        Protected authentication and secure project environments for your team.
      </p>
    </div>

    {/* CARD 6 */}
    <div
      className="
        bg-[var(--bg-card)]
        p-8
        rounded-3xl
        border border-[var(--border-color)]
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition-all duration-300
      "
    >
      <Zap
        className="text-[var(--primary)] mb-4"
        size={40}
      />
      <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">
        Fast & Efficient
      </h3>
      <p className="text-[var(--text-secondary)]">
        Built with modern technologies to deliver a smooth and responsive user experience.
      </p>
    </div>

  </div>
</section>

      {/* LOGIN SECTION */}
    {/* ASK ANYTHING SECTION */}
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

{/* FOOTER */}
<section
  className="
    border-t border-[var(--border-color)]
    py-8
    text-center
    text-[var(--text-secondary)]
  "
>
  © 2026 Nexus. Built for modern teams.
</section>
</div>
  );
};

export default About;
