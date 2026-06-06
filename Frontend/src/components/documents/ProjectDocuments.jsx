import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Search,
  Upload,
  Download,
  FileText,
  FileSpreadsheet,
  Presentation,
  File,
  X,
} from "lucide-react";
import { showSuccess, showError, showLoading } from "../../utils/toast";
import { showToast } from "../../utils/toast";
import Loader from "../../ui/Loader";

const ProjectDocuments = () => {
  const { projectId } = useParams();

  const [fetching, setFetching] = useState(true);

  const [title, setTitle] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  // POPUP
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const token = localStorage.getItem("token");
  const [currentPage, setCurrentPage] = useState(1);
  const docsPerPage = 3;

  // =====================================
  // FETCH DOCUMENTS
  // =====================================

  

  useEffect(() => {
    fetchDocuments();
  }, [projectId]);

const fetchDocuments = async () => {
  try {
    setFetching(true);

    const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/documents/project/${projectId}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    setDocuments(res.data.documents);
  } catch (error) {
    console.log(error.response?.data || error.message);

    showError(
      error.response?.data?.message ||
      "Failed to load documents"
    );
  } finally {
    setFetching(false);
  }
};
  // =====================================
  // FILE ICON
  // =====================================
  const getFileIcon = (fileName) => {
    const ext = fileName?.split(".").pop()?.toLowerCase();

    if (["xlsx", "xls", "csv"].includes(ext)) {
      return (
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
          <FileSpreadsheet size={30} />
        </div>
      );
    }

    if (["ppt", "pptx"].includes(ext)) {
      return (
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
          <Presentation size={30} />
        </div>
      );
    }

    if (["doc", "docx"].includes(ext)) {
      return (
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
          <FileText size={30} />
        </div>
      );
    }

    if (["pdf"].includes(ext)) {
      return (
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
          <FileText size={30} />
        </div>
      );
    }

    return (
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600">
        <File size={30} />
      </div>
    );
  };

  // =====================================
  // UPLOAD FILE
  // =====================================
const uploadFile = async () => {
  if (!selectedFile) {
    showError("Please select a file");
    return;
  }

  if (!title.trim()) {
    showError("Please enter a document title");
    return;
  }

  const loadingId = showLoading("Uploading document...");

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("projectId", projectId);
    formData.append("title", title);

await axios.post(
  `${import.meta.env.VITE_API_URL}/api/documents/upload`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);
    showSuccess("Document uploaded successfully 📄", {
      id: loadingId,
    });

    // Reset
    setSelectedFile(null);
    setTitle("");

    // Close Modal
    setOpenUploadModal(false);

    // Refresh Documents
    fetchDocuments();
  } catch (error) {
    console.log(error.response?.data || error.message);

    showError(
      error.response?.data?.message ||
        "Failed to upload document",
      {
        id: loadingId,
      }
    );
  } finally {
    setLoading(false);
  }
};

  // =====================================
  // FILTER DOCUMENTS
  // =====================================
  const filteredDocuments = documents.filter((doc) => {
    return (
      doc.title?.toLowerCase().includes(search.toLowerCase()) ||
      doc.originalName?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredDocuments.length / docsPerPage);

  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;

  const currentDocs = filteredDocuments.slice(indexOfFirstDoc, indexOfLastDoc);

  if (fetching) {
   return (
      <div
        className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-[var(--bg-primary)]
      "
      >
        <Loader />

        <p className="text-[var(--text-secondary)] text-sm">Loading Documents...</p>
      </div>
    );
}

  return (
    <div className="py-3 px-3 pt-15 sm:pt-15 space-y-8 sm:fixed sm:w-[79vw]">
      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-3">
        {/* LEFT */}
        <div>
          <h1 className="text-2xl sm:text-3xl  text-[var(--text-primary)]">
            Documents Gallery
          </h1>

          <p className="text-gray-500 text-[15px] mt-1 max-w-3xl leading-relaxed">
            Manage and collaborate on shared project documents.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto">
          {/* SEARCH */}
          <div className="relative w-full sm:w-[320px] md:w-[380px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />

            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
        w-full
        bg-[var(--bg-card)]
        border border-[var(--border-color)]
        text-[var(--text-primary)]
        rounded-2xl
        py-3 pl-11 pr-4
        outline-none
        transition
        focus:ring-2 focus:ring-[var(--primary)]/30
        focus:border-[var(--primary)]
        shadow-sm
      "
            />
          </div>

          {/* BUTTON */}
<button
  onClick={() => {
    showToast("Upload project files, reports, PDFs, and presentations 📄");
    setOpenUploadModal(true);
  }}
  className="
    w-full sm:w-auto

    flex items-center justify-center gap-2

    bg-[var(--primary)]/10
    text-[var(--primary)]

    hover:bg-[var(--primary)]
    hover:text-white

    px-5 py-3
    rounded-xl

    shadow-md
    hover:shadow-xl

    transition-all
    duration-300
    ease-out

    hover:scale-105
    active:scale-95

    whitespace-nowrap
  "
>
  <Upload size={18} />
  New Document
</button>
        </div>
      </div>

      <div className="border-t border-[var(--border-color)] pt-5 mb-5">
        <div className="relative">
          <Search
            size={18}
            className="
        absolute
        left-5
        top-1/2
        -translate-y-1/2
        text-[var(--text-secondary)]
      "
          />

          <input
            type="text"
            placeholder="Search documents by title or filename..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
        bg-[var(--bg-card)]
        w-full
        sm:w-[350px]
        md:w-[450px]
        lg:w-[25vw]

        border border-[var(--border-color)]
        text-[var(--text-primary)]

        rounded-2xl
        py-3 pl-12 pr-4

        outline-none
        transition

        focus:ring-2 focus:ring-[var(--primary)]/30
        focus:border-[var(--primary)]

        shadow-sm
      "
          />
        </div>
      </div>

      {/* =========================
          EMPTY STATE
      ========================= */}
      {filteredDocuments.length === 0 ? (
        <div
          className="
    bg-[var(--bg-card)]
    rounded-3xl
    border border-[var(--border-color)]
    p-20
    text-center
    shadow-sm
  "
        >
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
              <FileText size={38} className="text-[var(--primary)]" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            No Documents Found
          </h2>

          <p className="text-[var(--text-secondary)] mt-3">
            Upload your first project document.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 pb-4">
          {currentDocs.map((doc) => {
            const ext = doc.originalName?.split(".").pop()?.toLowerCase();

            return (
              <div
                className="
    min-w-[320px]
    bg-[var(--bg-card)]
    border border-[var(--border-color)]
    border-l-4 border-l-[var(--primary)]
    rounded-3xl
    p-6
    flex flex-col
    shadow-sm
    hover:-translate-y-1
    hover:shadow-xl
    transition-all
    duration-300
  "
              >
                {/* ===== SAME CARD UI (UNCHANGED) ===== */}
                {getFileIcon(doc.originalName)}

                <div className="mt-4  flex flex-col gap-3">
                  <h2 className="text-xl font-bold text-[var(--text-primary)] break-words">
                    {doc.title}
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold uppercase w-fit">
                    .{ext}
                  </span>
                </div>

                <p className="text-[var(--text-secondary)] text-sm mt-2 break-all">
                  {doc.originalName}
                </p>

                <p className="text-[var(--primary)] text-sm mt-4 break-all bg-[var(--primary)]/10 w-fit px-3 py-1 rounded-xl mb-3">
                  share
                </p>

                <div className="mt-auto pt-3 flex items-center justify-between border-t border-[var(--border-color)]">
                  {/* UPLOADER INFO */}
                  <div className="flex items-center gap-3">
                    <div
                      className="
      w-10 h-10 rounded-full
      bg-[var(--primary)]
      flex items-center justify-center
      text-white font-bold
    "
                    >
                      {doc.uploadedBy?.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {doc.uploadedBy?.name || "Unknown"}
                      </p>

                      <p className="text-xs text-[var(--text-secondary)]">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* DOWNLOAD BUTTON */}
<a
  href={`${import.meta.VITE_API_URL}/api/documents/download/${encodeURIComponent(
    doc.fileName
  )}`}
  className="
    w-11 h-11 rounded-2xl
    bg-[var(--primary)]/10
    hover:bg-[var(--primary)]
    text-[var(--primary)]
    hover:text-white
    flex items-center justify-center
    transition
  "
>
                    <Download size={18} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}



      <div className="flex justify-center gap-3 mt-6">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`
        px-4 py-2 rounded-xl font-medium transition

        ${
          currentPage === index + 1
            ? "bg-[var(--primary)] text-white"
            : "bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--border-color)]"
        }
      `}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* =========================
          UPLOAD MODAL
      ========================= */}
    {openUploadModal && (
  <div
    className="
      fixed inset-0
      bg-black/40
      sm:ml-70
      z-50
      p-4
    "
  >
    <div
      className="
        w-full max-w-lg mt-40
        bg-[var(--bg-card)]
        rounded-[32px]
        shadow-2xl
        border border-[var(--border-color)]
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          px-7 py-5
          border-b border-[var(--border-color)]
          flex items-center justify-between
        "
      >
        <div>
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
            Upload Document
          </h2>

          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Upload and rename your project file
          </p>
        </div>

        <button
          onClick={() => {
            setOpenUploadModal(false);
            setSelectedFile(null);
            setTitle("");
          }}
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
      <div className="p-7 space-y-6">
        {/* FILE INPUT */}
        <div>
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-3">
            Choose File
          </label>

          <input
            type="file"
            onChange={(e) =>
              setSelectedFile(e.target.files[0])
            }
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
              hover:file:bg-[var(--primary)]/20
              transition
            "
          />
        </div>

        {/* DOCUMENT TITLE */}
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
              transition
            "
          />
        </div>

        {/* SELECTED FILE */}
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
          px-7 py-5
          border-t border-[var(--border-color)]
          flex items-center justify-end gap-4
        "
      >
        <button
          onClick={() => {
            setOpenUploadModal(false);
            setSelectedFile(null);
            setTitle("");
          }}
          className="
            px-6 py-3
            rounded-2xl
            border border-[var(--border-color)]
            text-[var(--text-primary)]
            hover:bg-[var(--bg-secondary)]
            transition
            font-medium
          "
        >
          Cancel
        </button>

        <button
          onClick={uploadFile}
          disabled={loading}
          className="
            px-7 py-3
            rounded-2xl
            bg-[var(--primary)]
            text-white
            font-semibold
            hover:opacity-90
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
          "
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ProjectDocuments;
