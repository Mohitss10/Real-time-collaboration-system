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
} from "lucide-react";
import { motion } from "framer-motion";
import Blurtext from "../../ui/BlurText"
import TextType from "../../ui/TextType";
import GradualBlur from "../../ui/GradualBlur";
import AnimatedContent from "../../ui/AnimatedContent";


const Hero = () => {
    const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
    const navigate = useNavigate();
  return (
    
    <section
      className="
    relative
    
    pb-12
    text-center
    overflow-hidden
  "
      style={{
        background: "var(--hero-bg)",
        color: "var(--text-primary)",
      }}
    >
        
<p
  className="
    inline-block
    px-4 py-1
    
    rounded-full
    mx-auto
    mt-25
    font-semibold
    text-sm sm:text-base
    border
    overflow-hidden
    whitespace-nowrap
  "
  style={{
    background: "var(--bg-card)",
    color: "var(--primary)",
    borderColor: "var(--border-color)",
  }}
>
  <span className="">
    ✨ Introducing Nexus 1.0
  </span>
</p>

      <div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.10,
          ease: "easeOut",
        }}
        className="
    text-5xl 
    sm:text-5xl
    md:text-5xl
    lg:text-6xl
    font-bold
    mb-6 sm:mb-10
    px-4
  "
      >
        <AnimatedContent
  text="Collaborate in Real-Time"
  className="text-2xl font-semibold text-center"
  delay={50}
  duration={1.25}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
  showCallback
  className="
    text-5xl pt-10
    sm:text-5xl
    md:text-5xl
    lg:text-7xl
    font-bold
    px-4
  "
/>
        <br />
<motion.h4
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 1,
    duration: 0.8,
  }}
  className="
    text-4xl
    sm:text-4xl
    lg:text-5xl
    font-bold
    p-2
    bg-gradient-to-r
    from-cyan-400
    via-sky-500
    to-indigo-500
    bg-clip-text
    text-transparent
  "
>
  <motion.span
    animate={{
      backgroundPosition: ["0%", "100%", "0%"],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "linear",
    }}
    className="
      inline-block
      bg-[length:200%_200%]
    "
  >
    Chat, Write, and Work Together.
  </motion.span>
</motion.h4>
      </div>

      <p
        className="
    max-w-3xl
    mx-auto
    text-base
    sm:text-lg
    mb-8 sm:mb-10
    px-4
  "
        style={{
          color: "var(--text-secondary)",
        }}
      >
        The premium platform for high-velocity teams. Bring your conversations,
        documents,
        <br className="hidden md:block" />
        and meetings into one unified workspace engineered for clarity and
        speed.
      </p>
      <div
        onClick={() => navigate("/signup")}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-10 sm:mb-16 px-10 "
      >
<motion.button
  whileHover={{
    scale: 1.05,
    y: -2,
  }}
  whileTap={{
    scale: 0.98,
  }}
  className="
    bg-gradient-to-r
    from-cyan-500
    via-sky-500
    to-blue-600
    text-white
    px-7 py-3.5
    rounded-2xl
    font-semibold
    shadow-lg
  "
>
  Create Project
</motion.button>
      </div>

      {/* HERO IMAGE / MOCK UI */}
<section
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* YOUR EXISTING UI */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="backdrop-blur-lg rounded-4xl shadow-lg overflow-hidden border-t-[10px]"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--primary)",
          }}
        >
          <div className="flex flex-col md:flex-row min-h-[500px] lg:min-h-[750px]">
            
            {/* Sidebar mock */}
            <div
              className="w-full md:w-[250px] p-4 hidden md:flex flex-col gap-3 border-r"
              style={{
                background: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="h-9 rounded w-3/5 mb-3" style={{ background: "var(--border-color)" }} />
              <div className="h-8 rounded border-l-[5px] w-full" style={{ background: "color-mix(in srgb, var(--primary) 20%, transparent)", borderColor: "var(--primary)" }} />
              <div className="h-8 rounded w-3/4" style={{ background: "var(--border-color)" }} />
              <div className="h-8 rounded w-5/6" style={{ background: "var(--border-color)" }} />
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4">
              <div className="h-8 rounded w-1/2 md:w-1/3" style={{ background: "var(--border-color)" }} />

              <button className="bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold">
                Get Started for Free
              </button>

              <div className="flex flex-col lg:flex-row gap-4 flex-1">
                <div className="hidden md:block flex-1 rounded-2xl min-h-[200px]" style={{ background: "var(--border-color)" }} />

                <div
  className="
    w-full
    lg:w-[45%]
    xl:w-[50%]
    rounded-3xl
    overflow-hidden
    shadow-xl
    flex-shrink-0
  "
>
                  <img
                    src="collaboration.jpg"
                    alt="Team Collaboration"
                    className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-full object-cover rounded-2xl shadow-md"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ✅ GRADUAL BLUR OVERLAY */}
<div className="absolute bottom-0 left-0 w-full pointer-events-none">
  <GradualBlur
    animated="scroll"
    position="bottom"
    strength={2}
    divCount={8}
    opacity={0.9}
  />
</div>
    </section>
    </section>
  );
};

export default Hero;
