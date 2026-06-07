import React from "react";
import Loader from "../ui/Loader";

const PageLoader = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-20 xl:px-32"
      style={{
        background: "var(--hero-bg)",
        color: "var(--text-primary)",
      }}
    >
      <div>
        <Loader />
        
      </div>
      
        <p className="text-[var(--text-secondary)] text-sm">Loading Document...</p>
    </section>
  );
};

export default PageLoader;