import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
        },

        success: {
          icon: null,
        },

        error: {
          icon: null,
        },

        loading: {
          icon: null,
        },
      }}
    />
  );
};

export default ToastProvider;