import React from "react";
import { useNavigate } from "react-router-dom";
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
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Blurtext from "../../ui/BlurText";
import TextType from "../../ui/TextType";

import AnimatedContent from "../../ui/AnimatedContent";

import Orb from "../../ui/Orb";
// Reusable fadeIn variant
const fadeIn = (direction = 'up', delay = 0) => {
  const from = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: -40, opacity: 0 },
    right: { x: 40, opacity: 0 },
  };
  return {
    initial: from[direction],
    animate: { x: 0, y: 0, opacity: 1 },
    transition: { duration: 0.8, delay },
  };
};

// Parent variant for staggered word animation
const containerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Each word animation
const wordVariant = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const umbrellaLetters = "N E X U S".split(" ");

const umbrellaScales = [
  1.8, // 'A' bigger left edge
  1.8, // 'I'
  1.3, // 'M'
  1.4,   // 'a' center normal scale
  1.8,   // 't' center normal scale
 // 'x' bigger right edge
];


const Hero = () => {
   const headingLine1 = "Build Faster Together with AI-Driven Real-Time Collaboration".split(" ");
  const highlight = ["ai-driven", "Ral-time", "collaboration"];
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  const navigate = useNavigate();
  return (
    <>
<section
  className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-20 xl:px-32"
  style={{
    color: "var(--text-primary)",
  }}
>
  {/* 🌌 LIGHTFALL BACKGROUND (ONLY HERO) */}
<div
  className="absolute inset-0 -z-10 overflow-hidden"
  style={{
    background: "var(--hero-bg)",
  }}
>

</div>

<div className="flex justify-center">
            <p
        className="
    inline-block
    px-4 py-1
    rounded-full
    mx-auto
    mt-20
    font-semibold
    text-sm sm:text-base
    border
    overflow-hidden
    whitespace-nowrap text-center
    mb-10
  "
        style={{
          color: "var(--primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <span className="">✨ Introducing Nexus 1.0</span>
      </p>
</div>
      {/* 💫 Animated glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px]" />
      

      {/* 🔵 Blurry AIMatrix background text */}
      {/* 🔵 Blurry AIMatrix background text */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 justify-center pt-[1vh] px-10 overflow-visible hidden xl:flex"
        style={{ userSelect: "none" /* , outline: '1px solid red' */ }}
      >
       <div
  className="flex gap-[-0.15em]"
  style={{
    filter: "blur(4px)",
    opacity: 0.12,
    userSelect: "none",
  }}
>
  {umbrellaLetters.map((letter, idx) => (
    <span
      key={idx}
      className="
        uppercase
        font-bold
        bg-gradient-to-r
        from-cyan-400
        via-blue-500
        to-violet-500
        bg-clip-text
        text-transparent
      "
      style={{
        fontSize: "350px",
        transformOrigin: "bottom center",
        transform: `scaleX(${umbrellaScales[idx]})`,
        display: "inline-block",
        whiteSpace: "pre",
      }}
    >
      {letter}
    </span>
  ))}
</div>
      </div>
</div>





      {/* 🧠 Headline animation */}
      <div className="text-center mb-6 z-10">
        <motion.h1
          className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mx-auto leading-tight sm:p-4 tracking-tight flex flex-wrap justify-center gap-x-3"
          variants={containerVariant}
          initial="initial"
          animate="animate"
        >
          {headingLine1.map((word, idx) => {
            const cleaned = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            const isHighlighted = highlight.includes(cleaned);

            return (
              <motion.span
                key={idx}
                variants={wordVariant}
                className={
                  isHighlighted
                    ? "bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent"
                }
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h1>
      </div>

      {/* 📄 Subtext with soft fade-in */}
      <motion.p
        className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto  text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
                          style={{
          color: "var(--text-secondary)",
        }}
      >
        The premium platform for high-velocity teams. Bring your conversations, documents,and meetings into one unified workspace.
      </motion.p>

      {/* 🎯 Buttons */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xl mt-8 z-10"
        {...fadeIn("up", 2.2)}
      >
<div className="flex gap-4">
  {/* Start for Free Button */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
  <div>
<div
  onClick={() => navigate("/signup")}
  className="flex flex-col sm:flex-row gap-4 justify-center px-10"
>
  <button
    className="
      flex items-center justify-center gap-2
      bg-gradient-to-r
      from-cyan-500
      via-sky-500
      to-blue-600
      text-white
      px-10 py-3
      rounded-full
      font-semibold
      hover:shadow-lg
      hover:scale-105
      transition-all
      duration-300
      sm:text-[15px]
      text-sm
    "
  >
    Create Project
    <ArrowRight size={20} />
  </button>
</div>
  </div>
</div>


</div>

</motion.div>

      
      {/* 👥 Trust indicator */}
      <motion.div
        className="flex items-center gap-4 my-10 mx-auto  z-10"
        {...fadeIn("up", 2.6)}
      >
        <div className="flex justify-center animate-out zoom-in duration-200 delay-200 ">
          <div>
            <div className="font-semibold text-center md:text-left">Trusted by</div>
            <div className="flex space-x-2 items-center flex-col md:flex-row">
              <div className="flex -space-x-2 overflow-hidden p-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/men/51.jpg"
                  alt=""
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/women/4.jpg"
                  alt=""
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/men/34.jpg"
                  alt=""
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/women/6.jpg"
                  alt=""
                />
                {/* <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/men/9.jpg"
                  alt=""
                /> */}
                {/* <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-200 hover:scale-105 tranform duration-100"
                  src="https://randomuser.me/api/portraits/women/9.jpg"
                  alt=""
                /> */}
              </div>
              <div>Join 100+ other members</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
    </>
  );
};

export default Hero;
