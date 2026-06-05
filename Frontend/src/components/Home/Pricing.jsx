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
import { showSuccess, showError, showLoading } from "../../utils/toast";
import { motion } from "framer-motion";
import Blurtext from "../../ui/BlurText"

const Pricing = () => {
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

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
        },
      );

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

<div>
               <Blurtext
  text="Simple Pricing For Modern Teams"
  splitType="chars"
  delay={30}
  duration={1}
  ease="power3.out"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  className="text-3xl p-2 sm:text-4xl lg:text-5xl font-semibold block"
  style={{ color: "var(--text-primary)" }}
/> 
</div>


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
                        <div className="inline-block w-fit px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs sm:text-sm font-semibold">
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
                        <div className="w-fit inline-block px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs sm:text-sm font-semibold">
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
  )
}

export default Pricing