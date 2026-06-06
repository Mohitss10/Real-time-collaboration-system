import React, { useEffect } from "react";
import { X } from "lucide-react";

const UploadDocumentModal = ({
  open,
  onClose,
  selectedFile,
  setSelectedFile,
  title,
  setTitle,
  uploadFile,
  loading,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    onClose();
    setSelectedFile(null);
    setTitle("");
  };

  return (
<div
  className="
    fixed inset-0
    z-[9999]
    bg-black/50
    backdrop-blur-sm
    flex items-center justify-center
    p-4 sm:p-6
    overflow-y-auto
  "
>
  <div
    className="
      relative
      w-full
      max-w-md sm:max-w-lg
      bg-[var(--bg-card)]
      rounded-3xl
      shadow-2xl
      border border-[var(--border-color)]
      overflow-hidden
      my-auto
    "
  >
    {/* HEADER */}
    <div
      className="
        px-5 sm:px-7
        py-4 sm:py-5
        border-b border-[var(--border-color)]
        flex items-center justify-between
      "
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Upload Document
        </h2>

        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Upload and rename your project file
        </p>
      </div>

      <button
        onClick={handleClose}
        className="
          w-10 h-10
          rounded-xl
          hover:bg-[var(--bg-secondary)]
          flex items-center justify-center
          transition
        "
      >
        <X
          size={20}
          className="text-[var(--text-secondary)]"
        />
      </button>
    </div>

    {/* BODY */}
    <div className="p-5 sm:p-7 space-y-5 sm:space-y-6">
      {/* File Input */}
      <div>
        <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
          Choose File
        </label>

        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="
            w-full
            border border-[var(--border-color)]
            rounded-2xl
            p-4
            bg-[var(--bg-secondary)]
            text-[var(--text-primary)]
            file:mr-4
            file:py-2
            file:px-4
            file:rounded-xl
            file:border-0
            file:bg-[var(--primary)]/10
            file:text-[var(--primary)]
          "
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
          Rename Document
        </label>

        <input
          type="text"
          placeholder="Enter document name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full
            px-4 py-4
            rounded-2xl
            bg-[var(--bg-secondary)]
            border border-[var(--border-color)]
            outline-none
            text-[var(--text-primary)]
            focus:ring-2 focus:ring-[var(--primary)]/30
          "
        />
      </div>

      {/* Selected File */}
      {selectedFile && (
        <div
          className="
            bg-[var(--bg-secondary)]
            border border-[var(--border-color)]
            rounded-2xl
            p-4
          "
        >
          <p className="text-sm font-medium text-[var(--primary)]">
            Selected File
          </p>

          <p className="text-sm text-[var(--text-secondary)] mt-1 break-all">
            {selectedFile.name}
          </p>
        </div>
      )}
    </div>

    {/* FOOTER */}
    <div
      className="
        px-5 sm:px-7
        py-4 sm:py-5
        border-t border-[var(--border-color)]
        flex flex-col-reverse sm:flex-row
        justify-end
        gap-3 sm:gap-4
      "
    >
      <button
        onClick={handleClose}
        className="
          w-full sm:w-auto
          px-6 py-3
          rounded-2xl
          border border-[var(--border-color)]
          text-[var(--text-primary)]
        "
      >
        Cancel
      </button>

      <button
        onClick={uploadFile}
        disabled={loading}
        className="
          w-full sm:w-auto
          px-7 py-3
          rounded-2xl
          bg-[var(--primary)]
          text-white
          font-semibold
          disabled:opacity-50
        "
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  </div>
</div>
  );
};

export default UploadDocumentModal;