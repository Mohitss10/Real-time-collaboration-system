import React from 'react'
import {
  Play,
  Sparkles,
  MessageCircle,
  FileText,
  Video,
  BarChart3,
  TrendingUp,
  User,
  Users,
  MicOff,
} from "lucide-react";
import { motion } from "framer-motion";
import Blurtext from "../../ui/BlurText"

const Features = () => {
  return (
   <section
        className="px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-20"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="text-center mb-10 lg:mb-14">
 <Blurtext
  text="A Unified Workspace"
  splitType="chars"
  delay={30}
  duration={1}
  ease="power3.out"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  className="text-3xl p-2 sm:text-4xl lg:text-5xl font-semibold block"
  style={{ color: "var(--text-primary)" }}
/>

            <p
              className=" max-w-2xl mx-auto text-sm sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              Everything your team needs to move faster, designed with
              minimalism and performance
              <br className="hidden md:block" />
              in mind.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-3  auto-rows-auto md:auto-rows-[420px]">
            {/* Large Left Card */}
                <motion.div
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.95,
        filter: "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,      // animate only once
        amount: 0.3,     // triggers when 30% is visible
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
      }}
      className="md:col-span-2 bg-[var(--bg-card)] rounded-3xl lg:rounded-4xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white">
        <MessageCircle size={22} />
      </div>

      {/* Content */}
      <div className="mt-6">
        <h3 className="text-xl lg:text-2xl font-bold">Real-Time Chat</h3>

        <p className="text-[var(--text-secondary)] mt-3 max-w-xl leading-relaxed text-sm sm:text-base">
          Organize conversations logically. Move past noisy channels and focus
          on structured, topic-based discussions that drive decisions.
        </p>
      </div>

      {/* UI Box */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 mt-8">
        <div className="bg-[var(--bg-card)] shadow-xl rounded-xl px-4 py-3 text-sm text-[var(--text-secondary)] mb-4">
          Organize conversations logically. Move past noisy channels and focus
          on structured discussions.
        </div>

        <div className="bg-[var(--primary)] text-white rounded-xl px-4 py-3 text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span>
            Organize conversations logically. Move past noisy channels.
          </span>

          <span className="bg-[var(--bg-card)] text-[var(--primary)] text-xs px-2 py-1 rounded-full font-semibold">
            You
          </span>
        </div>
      </div>

      {/* Background emoji */}
      <div className="absolute right-4 top-4 text-[80px] md:text-[130px] opacity-5">
        💬
      </div>
    </motion.div>

            {/* Top Right Card */}
             <motion.div
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.95,
        filter: "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
      }}
      className="bg-[var(--bg-card)] shadow-xl rounded-3xl lg:rounded-4xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Section */}
      <div>
        <div className="w-12 h-12 rounded-xl bg-violet-500 flex items-center justify-center text-white">
          <FileText size={22} />
        </div>

        <h3 className="text-xl lg:text-2xl font-bold mt-6">
          Docs Collaboration
        </h3>

        <p className="text-gray-500 mt-3 leading-relaxed text-sm sm:text-base">
          Write, edit, and ideate together with zero lag. Multiplayer cursors
          and rich embeds standard.
        </p>
      </div>

      {/* Bottom Content Box */}
      <div
        className="rounded-2xl p-5 mt-6 border"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Skeleton Lines */}
        <div
          className="h-3 rounded-full w-2/3 mb-3"
          style={{ background: "var(--border-color)" }}
        />
        <div
          className="h-3 rounded-full w-full mb-3"
          style={{ background: "var(--border-color)" }}
        />
        <div
          className="h-3 rounded-full w-4/5 mb-4"
          style={{ background: "var(--border-color)" }}
        />
        <div
          className="h-3 rounded-full w-3/5 mb-4"
          style={{ background: "var(--border-color)" }}
        />

        {/* Bottom Row */}
        <div className="flex items-center gap-2">
          <div
            className="h-3 rounded-full w-1/2"
            style={{ background: "var(--primary)" }}
          />

          <div
            className="text-white text-xs px-2 py-1 rounded-md font-medium"
            style={{ background: "var(--primary)" }}
          >
            Alex
          </div>
        </div>
      </div>
    </motion.div>
            {/* Bottom Left Card */}
            <motion.div
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.95,
        filter: "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
      }}
      className="bg-[var(--bg-card)] shadow-xl rounded-3xl lg:rounded-4xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Section */}
      <div>
        <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white">
          <Video size={22} />
        </div>

        <h3 className="text-xl lg:text-2xl font-bold mt-6">
          Video Calls
        </h3>

        <p className="text-gray-500 mt-3 leading-relaxed text-sm sm:text-base">
          Jump into crisp audio and video calls directly from any thread or
          document.
        </p>
      </div>

      {/* Bottom UI */}
      <div className="bg-[var(--bg-secondary)] shadow-xl rounded-2xl p-4 sm:p-6 mt-6 flex items-center gap-3 sm:gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[var(--primary)] flex items-center justify-center bg-[var(--bg-card)]">
          <User size={22} className="text-[var(--primary)]" />
        </div>

        <div className="w-12 h-12 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center">
          <Users size={22} className="text-[var(--text-secondary)]" />
        </div>

        <div className="w-12 h-12 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center">
          <MicOff size={22} className="text-[var(--danger)]" />
        </div>
      </div>
    </motion.div>

            {/* Bottom Large Card */}
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.95,
        filter: "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
      }}
      className="md:col-span-2 bg-[var(--bg-card)] shadow-xl rounded-3xl lg:rounded-4xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Section */}
      <div>
        <div className="w-12 h-12 rounded-xl bg-indigo-200 flex items-center justify-center text-white">
          <BarChart3 size={22} />
        </div>

        <h3 className="text-xl lg:text-2xl font-bold mt-6">
          Analytics & Insights
        </h3>

        <p className="text-gray-500 mt-3 max-w-xl leading-relaxed text-sm sm:text-base">
          Organize conversations logically. Move past noisy channels and focus
          on structured, topic-based discussions.
        </p>
      </div>

      {/* Bottom Bar Chart UI */}
      <div className="flex items-end gap-2 h-32 sm:h-40 mt-8 lg:mt-10 pb-2">
        <div className="rounded-t-xl w-full h-full opacity-30 bg-[var(--primary)]" />
        <div className="rounded-t-xl w-full h-20 sm:h-24 opacity-40 bg-[var(--primary)]" />
        <div className="rounded-t-xl w-full h-24 sm:h-32 opacity-60 bg-[var(--primary)]" />
        <div className="rounded-t-xl w-full h-full opacity-30 bg-[var(--primary)]" />
        <div className="rounded-t-xl w-full h-20 opacity-80 bg-[var(--primary)]" />
        <div className="rounded-t-xl w-full h-24 bg-[var(--primary-hover)]" />
        <div className="rounded-t-xl w-full h-full opacity-50 bg-[var(--primary)]" />
      </div>
    </motion.div>
          </div>
        </div>
      </section>
  )
}

export default Features