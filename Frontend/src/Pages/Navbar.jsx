import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GamepadDirectional,
  User,
  Info,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import ThemeToggle from "../Pages/ThemeToggle";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const hideSidebarButton =
    location.pathname === "/" || location.pathname === "/projects";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="
  fixed top-0 w-full py-3 z-50 flex items-center justify-between bg-[var(--bg-card)] 
  px-4 sm:px-10
  
"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        {!hideSidebarButton && (
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="
    lg:hidden
    p-2
    rounded-xl
    transition
    hover:bg-[var(--bg-secondary)]
  "
          >
            {sidebarOpen ? (
              <X size={22} className="text-[var(--text-primary)]" />
            ) : (
              <Menu size={22} className="text-[var(--text-primary)]" />
            )}
          </button>
        )}
<div className="flex items-center gap-2">

        <span
          onClick={() => navigate("/")}
          className="
    font-bold
    text-2xl sm:text-3xl
    cursor-pointer

 bg-gradient-to-r
    from-cyan-400
    via-sky-500
    to-indigo-500
    bg-clip-text
    text-transparent
    font-bold

    transition-all
    duration-300

    hover:scale-105
  "
        >
          Nexus
        </span>
</div>
        
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center justify-center">
          <ThemeToggle />
        </div>

        {token ? (
          <div className="relative" ref={dropdownRef}>
            {/* PROFILE */}
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="
            flex
            items-center
            justify-center
            rounded-full
            transition
            hover:scale-105
          "
            >
              <div
                className="
              w-9
              h-9
              rounded-full
                bg-gradient-to-r
    from-cyan-500
    via-sky-500
    to-blue-600
              text-white
              flex
              items-center
              justify-center
              font-bold
            "
              >
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
            </button>

            {/* DROPDOWN */}
            {showDropdown && (
              <div
                className="
              absolute
              top-14
              right-0
              w-72
              rounded-3xl
              overflow-hidden
              shadow-2xl
              border
              border-[var(--border-color)]
              bg-[var(--bg-card)]
              animate-fadeIn
            "
              >
                {/* HEADER */}
                <div
                  className="
                px-5
                py-4
                  bg-gradient-to-r
    from-cyan-500
    via-sky-500
    to-blue-600
                text-white
              "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                    w-12
                    h-12
                    rounded-full
                    bg-white/20
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-lg
                  "
                    >
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm">{user?.name}</h3>

                      <p
                        className="
                      text-xs
                      text-purple-100
                      truncate
                    "
                      >
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* MENU */}
                <div className="p-2">
                  {/* <button
                    onClick={() => {
                      navigate("/update-profile");
                      setShowDropdown(false);
                    }}
                    className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  text-[var(--text-primary)]
                  hover:bg-[var(--bg-secondary)]
                  transition
                "
                  >
                    <User size={18} />
                    <span className="font-medium">Update Profile</span>
                  </button> */}

                  <button
                    onClick={() => {
                      navigate("/about");
                      setShowDropdown(false);
                    }}
                    className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  text-[var(--text-primary)]
                  hover:bg-[var(--primary)]/10
                  transition
                "
                  >
                    <Info size={18} />
                    <span className="font-medium">About</span>
                  </button>

                  <div
                    className="
                  my-2
                  mx-2
                  border-t
                  border-[var(--border-color)]
                "
                  />

                  <button
                    onClick={handleLogout}
                    className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  text-[var(--text-primary)]
                  hover:bg-red-100
                  transition
                  hover:text-black
                "
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() =>
                navigate("/login", {
                  state: { fromHome: true },
                })
              }
              className="
            hidden
            sm:block
            px-4
            py-2
            rounded-xl
            font-medium
            text-[var(--text-primary)]
            hover:bg-[var(--bg-secondary)]
            transition
          "
            >
              Log In
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="
            sm:px-5
            sm:py-2
            px-2
            py-1
            rounded-xl
            font-semibold
            text-white
            bg-[var(--primary)]
            hover:bg-[var(--primary-hover)]
            transition
          "
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
