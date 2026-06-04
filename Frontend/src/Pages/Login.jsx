import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { showSuccess, showError, showLoading } from "../utils/toast";

import { loginUser } from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const updatedErrors = { ...prev };

      // EMAIL VALIDATION
      if (name === "email") {
        const emailRegex = /^\S+@\S+\.\S+$/;

        if (!value.trim()) {
          updatedErrors.email = "Email is required";
        } else if (!emailRegex.test(value)) {
          updatedErrors.email = "Invalid email format";
        } else {
          delete updatedErrors.email;
        }
      }

      // PASSWORD VALIDATION
      if (name === "password") {
        if (!value.trim()) {
          updatedErrors.password = "Password is required";
        } else {
          delete updatedErrors.password;
        }
      }

      return updatedErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const loadingId = showLoading("Logging in...");

    try {
      setLoading(true);

      const res = await loginUser({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ replace loading toast with success
      showSuccess("Login successful 🚀", {
        id: loadingId,
      });

      navigate("/projects");
    } catch (error) {
      // ❌ replace loading toast with error
      showError(error.response?.data?.message || "Login failed ❌", {
        id: loadingId,
      });
    } finally {
      setLoading(false);
    }
  };
  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="sm:fixed inset-0 overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <main className="min-h-screen flex flex-col lg:flex-row">
        {/* LEFT SIDE */}
        {/* LEFT SIDE */}
        {/* LEFT SIDE (NEW SaaS STYLE LIKE YOUR HTML) */}
        <section className="hidden md:flex md:w-1/2 relative flex-col justify-between p-16 bg-[var(--bg-secondary)] overflow-hidden">
          {/* Logo */}
          <div className="z-10">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#4648d4] to-[#6b38d4] bg-clip-text text-transparent"></span>
          </div>

          {/* Text Content */}
          <div className="z-10 max-w-md">
            <h2 className="text-5xl font-bold text-white tracking-wide mb-10">
              Nexus
            </h2>
            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-2">
              Connect your team.
            </h1>

            <p className="text-[var(--text-secondary)]">
              Experience the future of seamless collaboration...
            </p>
          </div>

          {/* Background Image */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzpV93k619XnD0hftPD1Wy8QX1PvK0_16Br51HhKvKa96IHvUqPDfoRuQ909Suanjsuo2WEKGVgw2UKkEbnk_H1Zajm1SiecRaGQk7vIpF08_sfnB-78gmojFbMvBrTvo-4OGNQa_v39VdmDjFYfNh_hqO4lwT8g28AfOgGWvibc7hG4tUZQyVsz1IqSUa19jRJTwvsTBEmpiOHWv3-h2aMmm4ajLdNf1SGfTC6ZiTR2KS4SlF3DA7Z9SSn3ndQzw-yeR_YiV1b0E"
            alt="bg"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent" />
        </section>

        {/* RIGHT SIDE */}
        <section className="w-full lg:w-1/2 flex   mt-14 sm:mt-0 justify-center px-6 pt-10 sm:pt-20 lg:px-20 bg-[var(--bg-secondary)]">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl text-[var(--text-primary)] mb-2">
                Welcome back
              </h1>

              <p className="text-[var(--text-secondary)]">
                Please enter your details to sign in.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* EMAIL */}
              <div>
                <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="
w-full px-4 py-4 rounded-xl
bg-[var(--bg-card)]
text-[var(--text-primary)]
border border-[var(--border-color)]
outline-none transition-all
focus:ring-2 focus:ring-[var(--primary)]
focus:border-[var(--primary)]
"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">
                    Password
                  </label>

                  {/* <button
                    type="button"
                    className="text-sm text-[#4648d4] hover:underline"
                  >
                    Forgot Password?
                  </button> */}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="
w-full px-4 py-4 rounded-xl
bg-[var(--bg-card)]
text-[var(--text-primary)]
border border-[var(--border-color)]
outline-none transition-all
focus:ring-2 focus:ring-[var(--primary)]
focus:border-[var(--primary)]
"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#767586]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* REMEMBER */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[var(--primary)]"
                  />
                  Remember me
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full
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
"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              {/* DIVIDER */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--border-color)]" />
                </div>

                <div className="relative flex justify-center text-sm">
                  <span className="bg-[var(--bg-primary)] px-4 text-[var(--text-secondary)]">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* SOCIAL BUTTONS */}
              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="    flex items-center justify-center gap-2

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
    active:scale-95"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Continue with Google</span>
                </button>
              </div>
            </form>

            {/* FOOTER */}
            <p className="text-center mt-10 text-[var(--text-secondary)]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[var(--primary)] font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
