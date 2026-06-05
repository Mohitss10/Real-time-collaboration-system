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
import Hero from "../components/about/hero";
import Offers from "../components/about/Offers";
import Ask from "../components/about/Ask";

const About = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] mt-14">
      <Hero />
      <Offers />
      <Ask />

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
