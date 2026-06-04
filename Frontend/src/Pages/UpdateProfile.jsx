import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { showSuccess, showError, showLoading } from "../utils/toast";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    isStudent: false,
    collegeName: "",
    city: "",
    state: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // GET CURRENT USER DATA
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data.user;

      setFormData({
        name: user.name || "",
        gender: user.gender || "",
        age: user.age || "",
        isStudent: user.isStudent || false,
        collegeName: user.collegeName || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        profileImage: user.profileImage || "",
      });
    } catch (error) {
  console.log(error);

  showError(
    error.response?.data?.message ||
      "Failed to load profile"
  );
}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // UPDATE PROFILE
const handleSubmit = async (e) => {
  e.preventDefault();

  const loadingId = showLoading("Updating profile...");

  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const response = await axios.put(
      "http://localhost:5000/api/user/update-profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showSuccess(
      response.data.message || "Profile updated successfully 🎉",
      {
        id: loadingId,
      }
    );

    navigate("/");
  } catch (error) {
    console.log(error);

    showError(
      error.response?.data?.message ||
        "Failed to update profile",
      {
        id: loadingId,
      }
    );
  } finally {
    setLoading(false);
  }
};

  return (
<div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10">
  <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden">
    
    {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-purple-100 px-4 sm:px-6 py-5">
      
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Update Profile
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Keep your details up to date
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="
          w-full sm:w-auto
          flex items-center justify-center gap-2
          bg-purple-500 text-white
          px-4 py-2
          rounded-lg
          hover:bg-purple-600
          transition
        "
      >
        <ArrowLeft size={18} />
        Back
      </button>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
      
      {/* NAME */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 outline-none"
          placeholder="Enter name"
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* GENDER */}
        <div className="group">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Gender
          </label>

          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="
                w-full
                px-4 py-3
                rounded-2xl
                bg-white
                border border-gray-200
                shadow-sm
                outline-none
                appearance-none
                transition-all
                duration-200
                group-hover:shadow-md
                focus:ring-2 focus:ring-purple-300
                focus:border-purple-400
              "
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              ⌄
            </div>
          </div>
        </div>

        {/* AGE */}
        <div className="group">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            className="
              w-full
              px-4 py-3
              rounded-2xl
              bg-white
              border border-gray-200
              shadow-sm
              outline-none
              transition-all
              duration-200
              group-hover:shadow-md
              focus:ring-2 focus:ring-purple-300
              focus:border-purple-400
            "
          />
        </div>
      </div>

      {/* PROFILE IMAGE */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Profile Image URL
        </label>

        <input
          type="text"
          name="profileImage"
          value={formData.profileImage}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 outline-none"
          placeholder="Image URL"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          mt-2
          py-3
          rounded-xl
          bg-gradient-to-r from-purple-600 to-indigo-600
          text-white font-semibold
          hover:scale-[1.01]
          transition
        "
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>

    </form>
  </div>
</div>
  );
};

export default UpdateProfile;
