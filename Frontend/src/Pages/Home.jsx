import React, { useState, useEffect } from "react";
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
import { showSuccess, showError, showLoading } from "../utils/toast";

const Home = () => {
  const navigate = useNavigate();

  const [currentPlan, setCurrentPlan] = useState("free");
  const [loading, setLoading] = useState(false);

  // Load saved plan on page refresh
  useEffect(() => {
    const savedPlan = localStorage.getItem("plan");

    if (savedPlan) {
      setCurrentPlan(savedPlan);
    }
  }, []);
  const handleUpgrade = async () => {
    const loadingId = showLoading("Upgrading to Pro...");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/activate-pro`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      console.log("Upgrade Response:", data);

      if (res.ok) {
        setCurrentPlan("pro");
        localStorage.setItem("plan", "pro");

        showSuccess("Successfully upgraded to Pro!", {
          id: loadingId,
        });
      } else {
        showError("Login First❌", {
          id: loadingId,
        });
      }
    } catch (error) {
      console.error("Upgrade Error:", error);

      showError("Something went wrong!", {
        id: loadingId,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const token = localStorage.getItem("token");

const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/auth/me`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        const data = await res.json();

        if (data.subscription?.plan === "pro") {
          setCurrentPlan("pro");
        } else {
          setCurrentPlan("free");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlan();
  }, []);

  const handleDowngrade = async () => {
    const loadingId = showLoading("Switching to Free Plan...");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/deactivate-pro`, 
        {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setCurrentPlan("free");
        localStorage.setItem("plan", "free");

        showSuccess("Switched to Free Plan", {
          id: loadingId,
        });
      } else {
        showError("Login First ❌", {
          id: loadingId,
        });
      }
    } catch (error) {
      console.error(error);

      showError("Something went wrong!", {
        id: loadingId,
      });
    }
  };

  return (
    <div
      className=" text-[#1b1b23] overflow-x-hidden"
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* HERO */}
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
  "
          style={{
            background: "var(--bg-card)",
            color: "var(--primary)",
            borderColor: "var(--border-color)",
          }}
        >
          ✨ Introducing Nexus 1.0
        </p>

        <h1
          className="
    text-5xl pt-10
    sm:text-4xl
    md:text-5xl
    lg:text-6xl
    font-bold
    mb-6 sm:mb-10
    px-4
  "
        >
          Collaborate in Real-Time
          <br />
          <span
            className="
    bg-gradient-to-r
    from-cyan-500
    via-sky-500
    to-blue-600
    bg-clip-text
    text-transparent
    font-bold
  "
          >
            Chat, Write, and Work Together.
          </span>
        </h1>

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
          The premium platform for high-velocity teams. Bring your
          conversations, documents,
          <br className="hidden md:block" />
          and meetings into one unified workspace engineered for clarity and
          speed.
        </p>
        <div
          onClick={() => navigate("/signup")}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10 sm:mb-16 px-10 "
        >
          <button
            className="
        bg-gradient-to-r
    from-cyan-500
    via-sky-500
    to-blue-600

    

    text-white
    px-6 py-3
    rounded-xl
    font-semibold

    shadow-lg
    hover:shadow-xl

    transition-all
    duration-300
    hover:scale-105
  "
          >
            Create Project
          </button>

         
        </div>

        {/* HERO IMAGE / MOCK UI */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
        "
        >
          <div
            className="
    backdrop-blur-lg
    rounded-4xl
    shadow-lg
    overflow-hidden
    border-t-[10px]
  "
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--primary)",
            }}
          >
            <div className="flex flex-col md:flex-row min-h-[500px] lg:min-h-[750px]">
              {/* Sidebar mock */}
              <div
                className="
    w-full
    md:w-[250px]
    p-4
    hidden
    md:flex
    flex-col
    gap-3
    border-r
  "
                style={{
                  background: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                {/* Logo */}
                <div
                  className="h-9 rounded w-3/5 mb-3"
                  style={{
                    background: "var(--border-color)",
                  }}
                ></div>

                {/* Active Menu */}
                <div
                  className="h-8 rounded border-l-[5px] w-full"
                  style={{
                    background:
                      "color-mix(in srgb, var(--primary) 20%, transparent)",
                    borderColor: "var(--primary)",
                  }}
                ></div>

                {/* Menu Item */}
                <div
                  className="h-8 rounded w-3/4"
                  style={{
                    background: "var(--border-color)",
                  }}
                ></div>

                {/* Menu Item */}
                <div
                  className="h-8 rounded w-5/6"
                  style={{
                    background: "var(--border-color)",
                  }}
                ></div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4">
                <div
                  className="h-8 rounded w-1/2 md:w-1/3"
                  style={{
                    background: "var(--border-color)",
                  }}
                ></div>

                {/* Chat mock */}
                <button
                  className="    bg-gradient-to-r
    from-cyan-400
    via-sky-500
    to-indigo-500

    text-white
    px-6 py-3
    rounded-xl
    font-semibold"
                >
                  Get Started for Free
                </button>

                {/* Bottom panels */}
                <div className=" flex flex-col lg:flex-row gap-4 flex-1">
                  <div
                    className="hidden md:block flex-1  rounded-2xl min-h-[200px]"
                    style={{
                      background: "var(--border-color)",
                    }}
                  ></div>

                  <div className=" w-full lg:w-[450px] xl:w-[550px] bg-white rounded-2xl overflow-hidden">
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
      </section>

      {/* FEATURES */}
      <section
        className="px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-20"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="text-center mb-10 lg:mb-14">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              A Unified Workspace
            </h2>

            <p
              className="mt-3 max-w-2xl mx-auto text-sm sm:text-base"
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
            <div className="md:col-span-2 bg-[var(--bg-card)] rounded-3xl lg:rounded-4xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white">
                <MessageCircle size={22} />
              </div>

              <div className="mt-6">
                <h3 className="text-xl lg:text-2xl font-bold ">
                  Real-Time Chat
                </h3>

                <p className="text-[var(--text-secondary)] mt-3 max-w-xl leading-relaxed text-sm sm:text-base">
                  Organize conversations logically. Move past noisy channels and
                  focus on structured, topic-based discussions that drive
                  decisions.
                </p>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 mt-8">
                <div className="bg-[var(--bg-card)] shadow-xl rounded-xl px-4 py-3 text-sm text-[var(--text-secondary)] mb-4">
                  Organize conversations logically. Move past noisy channels and
                  focus on structured discussions.
                </div>

                <div className="bg-[var(--primary)] text-white rounded-xl px-4 py-3 text-sm flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start sm:items-center">
                  <span>
                    Organize conversations logically. Move past noisy channels.
                  </span>

                  <span className="bg-[var(--bg-card)] text-[var(--primary)] text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                    You
                  </span>
                </div>
              </div>

              <div className="absolute right-4 top-4 text-[80px] md:text-[130px] opacity-5">
                💬
              </div>
            </div>

            {/* Top Right Card */}
            <div className=" bg-[var(--bg-card)] shadow-xl rounded-3xl lg:rounded-4xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="w-12 h-12 rounded-xl bg-violet-500 flex items-center justify-center text-white">
                  <FileText size={22} />
                </div>

                <h3 className="text-xl lg:text-2xl font-bold mt-6">
                  Docs Collaboration
                </h3>

                <p className="text-gray-500 mt-3 leading-relaxed text-sm sm:text-base">
                  Write, edit, and ideate together with zero lag. Multiplayer
                  cursors and rich embeds standard.
                </p>
              </div>

              <div
                className="rounded-2xl p-5 mt-6 border"
                style={{
                  background: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                {/* Line 1 */}
                <div
                  className="h-3 rounded-full w-2/3 mb-3"
                  style={{
                    background: "var(--border-color)",
                  }}
                ></div>

                {/* Line 2 */}
                <div
                  className="h-3 rounded-full w-full mb-3"
                  style={{
                    background: "var(--border-color)",
                  }}
                ></div>

                {/* Line 3 */}
                <div
                  className="h-3 rounded-full w-4/5 mb-4"
                  style={{
                    background: "var(--border-color)",
                  }}
                ></div>

                {/* Line 4 */}
                <div
                  className="h-3 rounded-full w-3/5 mb-4"
                  style={{
                    background: "var(--border-color)",
                  }}
                ></div>

                {/* Bottom */}
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 rounded-full w-1/2"
                    style={{
                      background: "var(--primary)",
                    }}
                  ></div>

                  <div
                    className="text-white text-xs px-2 py-1 rounded-md font-medium"
                    style={{
                      background: "var(--primary)",
                    }}
                  >
                    Alex
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Left Card */}
            <div className="bg-[var(--bg-card)] shadow-xl rounded-3xl lg:rounded-4xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                  <Video size={22} />
                </div>

                <h3 className="text-xl lg:text-2xl font-bold mt-6">
                  Video Calls
                </h3>

                <p className="text-gray-500 mt-3 leading-relaxed text-sm sm:text-base">
                  Jump into crisp audio and video calls directly from any thread
                  or document.
                </p>
              </div>

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
            </div>

            {/* Bottom Large Card */}
            <div className="md:col-span-2 bg-[var(--bg-card)] shadow-xl rounded-3xl lg:rounded-4xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-200 flex items-center justify-center text-white">
                  <BarChart3 size={22} />
                </div>

                <h3 className="text-xl lg:text-2xl font-bold mt-6">
                  Analytics & Insights
                </h3>

                <p className="text-gray-500 mt-3 max-w-xl leading-relaxed text-sm sm:text-base">
                  Organize conversations logically. Move past noisy channels and
                  focus on structured, topic-based discussions.
                </p>
              </div>
              <div className="flex items-end gap-2 h-32 sm:h-40 mt-8 lg:mt-10 pb-2">
                <div
                  className="rounded-t-xl w-full h-full opacity-30"
                  style={{ backgroundColor: "var(--primary)" }}
                ></div>

                <div
                  className="rounded-t-xl w-full h-20 sm:h-24 opacity-40"
                  style={{ backgroundColor: "var(--primary)" }}
                ></div>

                <div
                  className="rounded-t-xl w-full h-24 sm:h-32 opacity-60"
                  style={{ backgroundColor: "var(--primary)" }}
                ></div>

                <div
                  className="rounded-t-xl w-full h-full opacity-30"
                  style={{ backgroundColor: "var(--primary)" }}
                ></div>

                <div
                  className="rounded-t-xl w-full h-20 opacity-80"
                  style={{ backgroundColor: "var(--primary)" }}
                ></div>

                <div
                  className="rounded-t-xl w-full h-24"
                  style={{ backgroundColor: "var(--primary-hover)" }}
                ></div>

                <div
                  className="rounded-t-xl w-full h-full opacity-50"
                  style={{ backgroundColor: "var(--primary)" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section
        className="relative overflow-hidden bg-indigo-50 px-4 sm:px-6 lg:px-10 py-12 lg:py-16"
        style={{
          background: "var(--hero-bg)",
          color: "var(--text-primary)",
        }}
      >
        {/* Background Shapes */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96   rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Heading */}
          <div className="text-center mb-10 lg:mb-12">
            <p className="inline-block text-xs sm:text-sm px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--primary)] font-semibold mb-5">
              Pricing Plans
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] mb-3">
              Simple Pricing For Modern Teams
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto px-2">
              Powerful collaboration tools with transparent pricing that grows
              with your business.
            </p>
          </div>

          <div className="backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
            <div className="w-full max-w-5xl overflow-hidden">
              {/* PRICING */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                {/* FREE PLAN */}
                <div
                  className={`rounded-[32px] p-5 sm:p-6 lg:p-8 bg-[var(--bg-card)] transition-all duration-300 flex flex-col justify-between ${
                    currentPlan === "free"
                      ? "border border-[var(--primary)]"
                      : "border border-[var(--border-color)]"
                  }`}
                >
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
                          Free
                        </h3>

                        <p className="text-[var(--text-secondary)] mt-2 text-sm sm:text-base">
                          For personal use
                        </p>
                      </div>

                      {currentPlan === "free" && (
                        <div className="inline-block px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs sm:text-sm font-semibold">
                          Active Plan
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <span className="text-4xl sm:text-5xl font-semibold text-[var(--text-primary)]">
                        ₹0
                      </span>

                      <span className="text-[var(--text-secondary)] text-sm sm:text-base">
                        /month
                      </span>
                    </div>

                    <div className="space-y-4 mt-8 text-sm sm:text-base">
                      <div className="text-[var(--text-primary)]">
                        ✅ Tasks Management
                      </div>

                      <div className="text-[var(--text-primary)]">
                        ✅ Team Chat
                      </div>

                      <div className="text-[var(--text-primary)]">
                        ✅ Document Sharing
                      </div>

                      <div className="text-[var(--text-primary)]">
                        ✅ Project Creation
                      </div>

                      <div className="text-[var(--text-primary)]">
                        ✅ Team Management
                      </div>

                      <div className="text-[var(--danger)]">❌ Meetings</div>
                    </div>
                  </div>

                  <button
                    onClick={
                      currentPlan === "pro" ? handleDowngrade : undefined
                    }
                    disabled={currentPlan === "free"}
                    className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all
    ${
      currentPlan === "free"
        ? "bg-[var(--bg-secondary)] text-[var(--text-secondary)] cursor-not-allowed border border-[var(--border-color)]"
        : "bg-[var(--primary)]/15 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
    }`}
                  >
                    {currentPlan === "free" ? "Current Plan" : "Switch to Free"}
                  </button>
                </div>

                {/* PRO PLAN */}
                <div
                  className={`rounded-[32px] p-5 sm:p-6 lg:p-8 bg-[var(--bg-card)] transition-all duration-300 flex flex-col justify-between ${
                    currentPlan === "free"
                      ? "border border-[var(--border-color)]"
                      : "border border-[var(--primary)]"
                  }`}
                >
                  <div className="bg-[var(--bg-card)] rounded-[22px]  h-full relative">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
                          Workspace Pro
                        </h3>

                        <p className="text-[var(--text-secondary)] mt-2 text-sm sm:text-base">
                          For growing teams
                        </p>
                      </div>

                      {currentPlan === "pro" && (
                        <div className="inline-block px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs sm:text-sm font-semibold">
                          Active Plan
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <span className="text-4xl sm:text-5xl font-semibold text-[var(--text-primary)]">
                        ₹99
                      </span>

                      <span className="text-[var(--text-secondary)] text-sm sm:text-base">
                        /month
                      </span>
                    </div>

                    <div className="space-y-4 mt-8 text-sm sm:text-base">
                      <div className="text-[var(--text-primary)]">
                        ✅ Unlimited Meetings
                      </div>
                      <div className="text-[var(--text-primary)]">
                        ✅ Video Collaboration
                      </div>
                      <div className="text-[var(--text-primary)]">
                        ✅ AI Productivity Tools
                      </div>
                      <div className="text-[var(--text-primary)]">
                        ✅ Unlimited Projects
                      </div>
                      <div className="text-[var(--text-primary)]">
                        ✅ 10GB Storage
                      </div>
                      <div className="text-[var(--text-primary)]">
                        ✅ Priority Support
                      </div>
                    </div>

                    <button
                      onClick={handleUpgrade}
                      disabled={loading || currentPlan === "pro"}
                      className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all ${
                        currentPlan === "pro"
                          ? "bg-[var(--primary)]/40 text-white cursor-default"
                          : "bg-[var(--primary)] text-white hover:scale-[1.02] hover:opacity-90"
                      }`}
                    >
                      {loading
                        ? "Processing..."
                        : currentPlan === "pro"
                          ? "Current Plan"
                          : "Upgrade to Pro"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= FOOTER ================= */}
      <footer className="relative overflow-hidden " style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}>
        {/* Background Blur */}
        <div className="absolute inset-0  blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Links */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 sm:gap-6 text-sm font-medium  text-center">
              <a
                href="#"
                className="hover:text-[var(--primary)] transition-colors"
              >
                Terms & Conditions
              </a>

              <a
                href="#"
                className="hover:text-[var(--primary)] transition-colors"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="hover:text-[var(--primary)] transition-colors"
              >
                Cookies
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-[var(--text-secondary)] text-center md:text-right">
              © 2025 Nexus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
