import toast from "react-hot-toast";

// 🎯 Common style (reusable)
const baseStyle = {
  background: "var(--bg-secondary)",
  color: "var(--text-primary)",
  borderRadius: "12px",
  padding: "12px 16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

// ✅ Success Toast
export const showSuccess = (message, options = {}) => {
  toast.success(message, {
    id: options.id,
    style: {
      ...baseStyle,
      border: "1px solid var(--primary)",
    },
    iconTheme: {
      primary: "var(--primary)",
      secondary: "#fff",
    },
  });
};

// ❌ Error Toast
export const showError = (message, options = {}) => {
  toast.error(message, {
    id: options.id,
    style: {
      ...baseStyle,
      border: "1px solid #ef4444",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fff",
    },
  });
};

// ⏳ Loading Toast
export const showLoading = (message) => {
  return toast.loading(message, {
    style: {
      ...baseStyle,
      border: "1px solid var(--border-color)",
    },
  });
};

// ℹ️ Normal Toast
export const showToast = (message) => {
  toast(message, {
    style: {
      ...baseStyle,
    },
  });
};

// ❌ Dismiss
export const dismissToast = (id) => {
  toast.dismiss(id);
};