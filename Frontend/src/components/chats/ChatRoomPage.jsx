import React, { useEffect, useRef, useState } from "react";
import { Video, Users } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import socket from "../../socket";
import Loader from "../../ui/Loader";

const ChatRoomPage = () => {
  const { projectId } = useParams();

  const [chatLoading, setChatLoading] = useState(true);

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const currentUserId = currentUser?._id;
  const currentUserName = localStorage.getItem("userName");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typingUser, setTypingUser] = useState("");

  const messagesEndRef = useRef(null);

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =========================
  // JOIN ROOM
  // =========================
  useEffect(() => {
    if (!projectId) return;
    socket.emit("join_project", projectId);
  }, [projectId]);

  // =========================
  // LOAD MESSAGES
  // =========================
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/chat/${projectId}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);

        setMessages(res.data.messages);
      } catch (err) {
        console.log(err);
      }
    };

    loadMessages();
  }, [projectId, token]);


  

  // =========================
  // RECEIVE REAL TIME MESSAGE
  // =========================
  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m._id === message._id);
        if (exists) return prev;
        return [...prev, message];
      });
    };

    socket.on("receive_message", receiveMessage);

    return () => socket.off("receive_message", receiveMessage);
  }, []);

  // =========================
  // TYPING
  // =========================
  useEffect(() => {
    let timeout;

    socket.on("user_typing", (name) => {
      setTypingUser(name);

      clearTimeout(timeout);
      timeout = setTimeout(() => setTypingUser(""), 2000);
    });

    return () => {
      clearTimeout(timeout);
      socket.off("user_typing");
    };
  }, []);

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSendMessage = async () => {
    if (!text.trim()) return;

    try {
     const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/chat/${projectId}/send`,
  {
    projectId,
    text,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);

      socket.emit("send_message", {
        ...res.data.message,
        projectId,
      });

      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // TIME FORMAT
  // =========================
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================
  // DATE LABEL
  // =========================
  const formatDateLabel = (date) => {
    const today = new Date();
    const msgDate = new Date(date);

    if (today.toDateString() === msgDate.toDateString()) return "Today";

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (yesterday.toDateString() === msgDate.toDateString()) return "Yesterday";

    return msgDate.toLocaleDateString([], {
      day: "numeric",
      month: "long",
    });
  };

  useEffect(() => {
  const loadMessages = async () => {
    try {
      setChatLoading(true);

      const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/chat/${projectId}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setMessages(res.data.messages);
    } catch (err) {
      console.log(err);
    } finally {
      setChatLoading(false);
    }
  };

  loadMessages();
}, [projectId, token]);

if (chatLoading) {
   return (
        <div
          className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          bg-[var(--bg-primary)]
        "
        >
          <Loader />
  
          <p className="text-[var(--text-secondary)] text-sm">Loading Chats...</p>
        </div>
      );
}

  return (
    <div className="py-3 px-3 pt-20 sm:pt-17 space-y-4 fixed w-[96.5vw] sm:w-[79vw] h-screen flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="shrink-0 pb-4 border-b border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* LEFT */}
        <div>
          <h1 className="text-2xl sm:text-3xl text-[var(--text-primary)]">
            Team Chat
          </h1>
          <p className="text-[var(--text-secondary)] text-[15px] max-w-3xl leading-relaxed">
            Collaborate with your team in real-time.
          </p>
        </div>

        {/* RIGHT */}
        <div className="hidden sm:flex items-center gap-3">

          <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] transition">
            <Users size={18} />
            <span className="text-sm font-medium">Team</span>
          </button>

          <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[var(--primary)]/10 text-[var(--text-secondary)] hover:opacity-90 transition shadow-lg">
            <Video size={18} />
            <span className="text-sm font-medium">Call</span>
          </button>

        </div>
      </div>

      {/* ================= CHAT AREA ================= */}
      <div className="flex-1 min-h-0 flex flex-col">

        {/* ================= MESSAGES ================= */}
        <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-6 space-y-4 rounded-3xl sm:space-y-6 bg-[var(--primary)]/10"    >

          {messages.map((msg, index) => {
            const currentDate = new Date(msg.createdAt).toDateString();

            const prevDate =
              index > 0
                ? new Date(messages[index - 1].createdAt).toDateString()
                : null;

            const showDate = currentDate !== prevDate;
            const isMe = msg.sender?._id === currentUserId;

            return (
              <React.Fragment key={msg._id || index}>

                {/* DATE LABEL */}
                {showDate && (
                  <div className="flex justify-center">
                    <div className="px-4 py-1.5 rounded-full text-xs font-semibold border bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)]">
                      {formatDateLabel(msg.createdAt)}
                    </div>
                  </div>
                )}

                {/* MESSAGE ROW */}
                <div className={`flex gap-2 sm:gap-3 ${isMe ? "justify-end" : "justify-start"}`}>

                  {/* AVATAR (OTHER USER) */}
                  {!isMe && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)]">
                      {msg.sender?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}

                  {/* MESSAGE CARD */}
                  <div className="max-w-[90%] sm:max-w-[80%] lg:max-w-[75%] rounded-2xl px-3 sm:px-5 py-3 sm:py-4 shadow-sm border bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)]">

                    {/* TOP ROW */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-5 mb-2">

                      <h3 className={`text-sm font-semibold ${isMe ? "text-[var(--primary)]" : "text-[var(--text-primary)]"}`}>
                        {isMe ? "You" : msg.sender?.name}
                      </h3>

                      <span className="text-[11px] text-[var(--text-secondary)] whitespace-nowrap">
                        {formatTime(msg.createdAt)}
                      </span>

                    </div>

                    {/* TEXT */}
                    <p className="text-sm leading-6 sm:leading-7 text-[var(--text-secondary)] break-words">
                      {msg.text}
                    </p>

                  </div>

                  {/* AVATAR (ME) */}
                  {isMe && (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-[var(--primary)] text-white ring-2 ring-[var(--primary)]/30">
                      {currentUserName?.charAt(0)?.toUpperCase() || "Y"}
                    </div>
                  )}

                </div>

              </React.Fragment>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* ================= TYPING ================= */}
        {typingUser && (
          <div className="px-4 py-2 text-xs sm:text-sm text-[var(--text-secondary)] italic">
            {typingUser} is typing...
          </div>
        )}

        {/* ================= INPUT ================= */}
        <div className="w-full py-3 sm:py-4">

          <div className="flex items-center gap-2 sm:gap-3">

            <input
              type="text"
              value={text}
              placeholder="Write a message..."
              onChange={(e) => {
                setText(e.target.value);

                if (e.target.value.trim() && socket) {
                  socket.emit("typing", {
                    projectId,
                    name: currentUserName,
                  });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm outline-none transition focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)]"
            />

            <button
              onClick={handleSendMessage}
              className="h-[48px] w-[48px] sm:h-[56px] sm:w-[56px] rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition shadow-sm"
            >
              <FiSend size={18} />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatRoomPage;
