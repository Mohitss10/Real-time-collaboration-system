import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  return (
<button
  onClick={toggleTheme}
  className="
    relative
    w-16 h-9
    rounded-full
    bg-slate-200 dark:bg-slate-700
    transition-all duration-500
    p-1
    cursor-pointer
  "
>
  <div
    className={`
      absolute
      top-1 left-1
      w-5 h-5 w-7 h-7
      rounded-full
      bg-yellow-300 dark:bg-slate-900
      shadow-md
      flex items-center justify-center
      transition-all duration-500
      ${
        theme === "dark"
          ? "translate-x-5 sm:translate-x-7"
          : "translate-x-0"
      }
    `}
  >
    {theme === "dark" ? (
      <Moon size={6} className="text-indigo-400 sm:size-4" />
    ) : (
      <Sun size={6} className="text-yellow-500 size-4" />
    )}
  </div>
</button>
  );
};

export default ThemeToggle;