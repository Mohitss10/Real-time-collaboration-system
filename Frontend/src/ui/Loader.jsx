import React from "react";

const Loader = () => {
  return (
    <div className="w-56 h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
      <div className="h-full w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent animate-pulse" />
    </div>
  );
};

export default Loader;