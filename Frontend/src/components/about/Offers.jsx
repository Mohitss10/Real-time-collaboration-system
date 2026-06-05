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
import { motion } from "framer-motion";

const Offers = () => {
  return (
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
<motion.div
  initial={{
    opacity: 0,
    y: 100,
    scale: 0.9,
    filter: "blur(20px)",
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  }}
  viewport={{
    once: true,
    amount: 0.2,
  }}
  transition={{
    duration: 0.4,
    ease: "easeOut",
  }}
  whileHover={{
    y: -8,
    scale: 1.03,
  }}
  className="
    bg-[var(--bg-card)]
    p-8
    rounded-3xl
    border
    border-[var(--border-color)]
    shadow-lg
    
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
</motion.div>

    {/* CARD 2 */}
<motion.div
  initial={{
    opacity: 0,
    y: 100,
    scale: 0.9,
    filter: "blur(20px)",
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  }}
  viewport={{
    once: true,
    amount: 0.2,
  }}
  transition={{
    duration: 0.4,
    ease: "easeOut",
  }}
  whileHover={{
    y: -8,
    scale: 1.03,
  }}
  className="
    bg-[var(--bg-card)]
    p-8
    rounded-3xl
    border
    border-[var(--border-color)]
    shadow-lg
    
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
    </motion.div>
    {/* CARD 3 */}
<motion.div
  initial={{
    opacity: 0,
    y: 100,
    scale: 0.9,
    filter: "blur(20px)",
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  }}
  viewport={{
    once: true,
    amount: 0.2,
  }}
  transition={{
    duration: 0.4,
    ease: "easeOut",
  }}
  whileHover={{
    y: -8,
    scale: 1.03,
  }}
  className="
    bg-[var(--bg-card)]
    p-8
    rounded-3xl
    border
    border-[var(--border-color)]
    shadow-lg
    
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
    </motion.div>

    {/* CARD 4 */}
<motion.div
  initial={{
    opacity: 0,
    y: 100,
    scale: 0.9,
    filter: "blur(20px)",
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  }}
  viewport={{
    once: true,
    amount: 0.2,
  }}
  transition={{
    duration: 0.4,
    ease: "easeOut",
  }}
  whileHover={{
    y: -8,
    scale: 1.03,
  }}
  className="
    bg-[var(--bg-card)]
    p-8
    rounded-3xl
    border
    border-[var(--border-color)]
    shadow-lg
    
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
    </motion.div>

    {/* CARD 5 */}
<motion.div
  initial={{
    opacity: 0,
    y: 100,
    scale: 0.9,
    filter: "blur(20px)",
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  }}
  viewport={{
    once: true,
    amount: 0.2,
  }}
  transition={{
    duration: 0.4,
    ease: "easeOut",
  }}
  whileHover={{
    y: -8,
    scale: 1.03,
  }}
  className="
    bg-[var(--bg-card)]
    p-8
    rounded-3xl
    border
    border-[var(--border-color)]
    shadow-lg
    
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
    </motion.div>

    {/* CARD 6 */}
<motion.div
  initial={{
    opacity: 0,
    y: 100,
    scale: 0.9,
    filter: "blur(20px)",
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  }}
  viewport={{
    once: true,
    amount: 0.2,
  }}
  transition={{
    duration: 0.4,
    ease: "easeOut",
  }}
  whileHover={{
    y: -8,
    scale: 1.03,
  }}
  className="
    bg-[var(--bg-card)]
    p-8
    rounded-3xl
    border
    border-[var(--border-color)]
    shadow-lg
    
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
    </motion.div>

  </div>
</section>

  )
}

export default Offers