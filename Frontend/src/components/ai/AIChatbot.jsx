import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Bot, X, Send, ArrowLeft} from "lucide-react";
import { useParams } from "react-router-dom";
import ThemeToggle from "../../Pages/ThemeToggle";
import { useLocation } from "react-router-dom";

const AIChatbot = () => {
  const location = useLocation();
  const hideChatButton = location.pathname.includes("/chat");
  const { projectId } = useParams();

  const [open, setOpen] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I'm Ines. Ask me anything about your project.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // =========================
  // FETCH PROJECT DETAILS
  // =========================
  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("API Response:", response.data);
        const project = response.data.project;

        console.log("Project Title:", project.title);
        console.log("Project Description:", project.description);

        setProjectName(project.title || "");
        setProjectDescription(project.description || "");
      } catch (error) {
        console.log("Project fetch error:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    console.log("Current Project Name:", projectName);
    console.log("Current Project Description:", projectDescription);
  }, [projectName, projectDescription]);

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/chat`,
        {
          projectName,
          projectDescription,
          message: currentMessage,
        },
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.response,
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Failed to get response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!hideChatButton && (
        <button
          onClick={() => setOpen(true)}
          className="
      fixed bottom-8 right-5 z-[999]
      w-14 h-14 rounded-full
      bg-[var(--bg-sidebar1)]
      text-[var(--text-primary)]
      shadow-xl
      flex items-center justify-center
      transition-all duration-300 ease-in-out
      hover:scale-110
      hover:bg-[var(--primary-hover)]
      active:scale-95
      backdrop-blur-md
      border border-white/10
    "
        >
          <Bot size={26} />
        </button>
      )}

      {/* CHAT WINDOW */}
      {open && (
        <>
          {/* BACKDROP */}
<div
  onClick={() => setOpen(false)}
  className="
    hidden sm:block
    fixed inset-0
    z-[998]
    bg-black/20
    backdrop-blur-sm
  "
/>

          {/* CHAT WINDOW */}
          <div
  className="
    fixed
    inset-0
    sm:inset-auto
    sm:bottom-24
    sm:right-3

    z-[999]

    w-screen
    h-screen

    sm:w-[400px]
    sm:h-[650px]

    bg-[var(--bg-card)]

    sm:rounded-3xl
    sm:border
    sm:border-[var(--border-color)]
    sm:shadow-2xl

    flex flex-col
  "
>
            {/* HEADER */}
            <div
              className="
              p-4
              border-b border-[var(--border-color)]
              flex items-center justify-between
              bg-[var(--bg-secondary)]
              rounded-t-3xl
            "
            >
              <div>
                <h2 className="font-bold text-[var(--text-primary)]">Nexus</h2>

                {projectName && (
                  <p className="text-xs text-[var(--text-secondary)]">
                    {projectName}
                  </p>
                )}
              </div>
              <div className="flex justify-center gap-4 items-center">
                <ThemeToggle />

                <button
                  onClick={() => setOpen(false)}
                  className="
                text-[var(--text-secondary)]
                hover:text-[var(--text-primary)]
              "
                >
                  <X size={30} />
                </button>
              </div>
            </div>

            {/* PROJECT INFO */}
            {projectName && (
              <div
                className="
                px-4 py-3
                border-b border-[var(--border-color)]
                bg-[var(--bg-secondary)]
              "
              >
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {projectName}
                </p>
              </div>
            )}

            {/* CHAT AREA */}
            <div
              className="
              flex-1
              overflow-y-auto
              p-4
              space-y-3
            "
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`
                  p-3
                  rounded-2xl
                  border-
                  text-sm
                  border border-[var(--border-color)]
                  ${
                    msg.sender === "user"
                      ? "ml-auto bg-[var(--primary)] text-white"
                      : "bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                  }
                `}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ))}

              {loading && (
                <div
                  className="
                  p-3
                  rounded-2xl
                  bg-[var(--bg-secondary)]
                  text-[var(--text-secondary)]
                  w-fit
                "
                >
                  Thinking...
                </div>
              )}
            </div>

            {/* INPUT */}
            <div

  className="
    p-3 sm:p-4
    border-t border-[var(--border-color)]
    bg-[var(--bg-card)]
  "
>
              <div className="flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask anything about your project..."
                  className="
                  flex-1
                  p-3
                  rounded-xl
                  bg-[var(--bg-secondary)]
                  text-[var(--text-primary)]
                  border border-[var(--border-color)]
                  outline-none
                  focus:border-[var(--primary)]
                "
                />

                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="
                  w-12
                  rounded-xl
                  bg-[var(--primary)]
                  hover:bg-[var(--primary-hover)]
                  text-white
                  flex items-center justify-center
                  transition-all
                "
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AIChatbot;
