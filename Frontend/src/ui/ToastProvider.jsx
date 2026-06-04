import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center mt-10 sm:mt-0"
      toastOptions={{
style: {
  borderRadius: "12px",
  padding: "12px 16px",
  marginTop: "40px",
  background: "var(--bg-secondary)",
  color: "var(--text-primary)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  fontSize: "14px",
},

        success: {
          style: {
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",
            
          },
          iconTheme: {
            primary: "var(--primary)",
            secondary: "white",
          },
        },

        error: {
          style: {
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",

          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "white",
          },
        },

        loading: {
          style: {
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",
          },
        },
      }}
    />
  );
};

export default ToastProvider;