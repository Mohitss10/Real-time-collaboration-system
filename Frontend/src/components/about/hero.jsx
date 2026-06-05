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

const hero = () => {
  return (
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
  )
}

export default hero