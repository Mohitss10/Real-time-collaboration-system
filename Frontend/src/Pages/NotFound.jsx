import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
      "
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="text-center max-w-2xl">
        <h1
          className="
            text-8xl
            md:text-9xl
            font-bold
            mb-4
          "
          style={{
            color: "var(--primary)",
          }}
        >
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Page Not Found
        </h2>

        <p
          className="
            text-lg
            mb-8
          "
          style={{
            color: "var(--text-secondary)",
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="
              flex items-center gap-2
              px-6 py-3
              rounded-xl
              text-white
              font-medium
            "
            style={{
              background: "var(--primary)",
            }}
          >
            <Home size={18} />
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="
              flex items-center gap-2
              px-6 py-3
              rounded-xl
              border
            "
            style={{
              borderColor: "var(--border-color)",
            }}
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;