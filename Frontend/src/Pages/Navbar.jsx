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
  const [showNavbar, setShowNavbar] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  const hideSidebarButton =
    location.pathname === "/" ||
    location.pathname === "/projects" ||
    location.pathname === "/signup" ||
    location.pathname === "/login";

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

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false); // hide when scrolling down
      } else {
        setShowNavbar(true); // show when scrolling up
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`
    fixed top-0 w-full py-3 z-50
    flex items-center justify-between
    bg-[var(--bg-card)]
    px-4 sm:px-10
    transition-transform duration-300
    ${showNavbar ? "translate-y-0" : "-translate-y-full"}
  `}
    >
      {/* LEFT */}
<div className="flex items-center gap-1 sm:gap-4 flex-shrink-0">
  {!hideSidebarButton && (
   <button
  onClick={() => setSidebarOpen((prev) => !prev)}
  className="
    lg:hidden
    relative
    w-11
    h-11
    flex
    items-center
    justify-center
    rounded-2xl
    transition-all
    duration-300
    hover:bg-[var(--bg-secondary)]
    hover:scale-105
    active:scale-95
  "
>
  <div className="relative w-8 h-7 mt-[3px]">
    {/* Top */}
    <span
      className={`
        absolute left-0 block 
        h-[3px] w-7 rounded-full
        bg-[var(--text-primary)]
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${
          sidebarOpen
            ? "top-1/2 -translate-y-1/2 rotate-45"
            : "top-1"
        }
      `}
    />

    {/* Bottom */}
    <span
      className={`
        absolute left-0 block
        h-[3px] w-5 rounded-full
        bg-[var(--text-primary)]
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${
          sidebarOpen
            ? "w-7 top-1/2 -translate-y-1/2 -rotate-45"
            : "bottom-1 right-0"
        }
      `}
    />
  </div>
</button>
  )}

  <span
    onClick={() => navigate("/")}
    className="
      text-[30px]
      font-bold
      cursor-pointer
      leading-none

      bg-gradient-to-r
      from-cyan-400
      via-sky-500
      to-indigo-500
      bg-clip-text
      text-transparent

      transition-all
      duration-300
      hover:scale-105
    "
  >
    Nexus
  </span>
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
  -right-2
  w-[220px]
  sm:right-0
  sm:w-72
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
            py-2
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
