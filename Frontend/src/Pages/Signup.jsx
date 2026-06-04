import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { registerUser } from "../api/authApi";
import { showSuccess, showError, showLoading } from "../utils/toast";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};

const validateForm = () => {
  const newErrors = {};

  const emailRegex = /^\S+@\S+\.\S+$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!passwordRegex.test(formData.password)) {
    newErrors.password =
      "Password must contain uppercase, lowercase, number and special character";
  }



  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[@$!%*?&]/.test(formData.password),
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const loadingId = showLoading("Creating your account...");

  try {
    setLoading(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    const res = await registerUser(payload);

    console.log(res.data);

    // ✅ replace loading with success
    showSuccess("Account created successfully 🎉", {
      id: loadingId,
    });

    navigate("/login");
  } catch (error) {
    console.error(error);

    // ❌ replace loading with error
    showError(
      error?.response?.data?.message || "Registration failed ❌",
      {
        id: loadingId,
      }
    );
  } finally {
    setLoading(false);
  }
};
  const PasswordRule = ({ valid, text }) => (
    <div className="flex items-center gap-2">
      <CheckCircle2
        size={16}
        className={valid ? "text-green-500" : "text-gray-300"}
      />

      <span className={`text-sm ${valid ? "text-green-600" : "text-gray-500"}`}>
        {text}
      </span>
    </div>
  );

  return (
<div className="sm:fixed inset-0 overflow-hidden bg-[var(--bg-primary)]">
      <main className="min-h-screen flex flex-col lg:flex-row">
        <section className="relative  hidden lg:flex w-1/2 overflow-hidden p-16">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGEEvxYbEPpd-yMedyj0VblAtqAQhOFCLvoJTjnQNiarpAehvBEk8EIJUvZbJ3OX4f0WBNMiL1mehXbReISZFB5zJtbOXEt9o75xw8eXxDQQRNjo-MKYo62MPMiJG6ZL2USovJiGcC4AnznFm43CIKp97tkCnLWBMQtrX9oyNwhWEhTU2MMzbIWFRxPHjjVHzBu2ZB6co3S8DEvNVNDV8AHgzUAIQvssdn_z3gEV0PU0GS376DXU9fW9Dkwb5i7GdNtgr_8EKLOCw"
              alt="Background"
              className="w-full h-full object-cover opacity-40"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)] via-[var(--primary)]/40 to-transparent"></div>
          </div>
          <div className="absolute bottom-16 left-16 z-10 max-w-xl">
<h2 className="text-5xl font-bold text-white tracking-wide mb-10">
  Nexus
</h2>

<h1 className="text-2xl font-semibold leading-tight text-white mb-2">
  Connect your team.
</h1>

<p className="text-lg text-white leading-relaxed max-w-lg">
  The premium collaboration engine built for high-velocity teams.
  Experience seamless integration and unparalleled clarity in every project.
</p>

           <div className="mt-8 inline-flex items-center gap-3 
bg-[var(--bg-card)]/60 backdrop-blur-xl 
border border-[var(--border-color)] 
px-4 py-2 rounded-full">
              <div className="flex -space-x-2">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt=""
                  className="w-7 h-7 rounded-full border border-[var(--bg-primary)]"
                />

                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt=""
                  className="w-7 h-7 rounded-full border border-[var(--bg-primary)]"
                />

                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt=""
                  className="w-7 h-7 rounded-full border border-[var(--bg-primary)]"
                />
              </div>

        <span className="text-xs text-[var(--text-secondary)] font-medium">
  Trusted by 2,000+ teams
</span>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
  <section className="relative flex mt-18 sm:mt-0 justify-center w-full lg:w-1/2 overflow-hidden p-6 sm:p-10 lg:p-16 bg-[var(--bg-secondary)]">
  <div className="w-full max-w-md">
    {/* HEADER */}
    <div className="mb-4">
      <h1 className="text-3xl text-[var(--text-primary)] mb-2">
        Create Account
      </h1>

      <p className="text-[var(--text-secondary)]">
        Please enter your details to register.
      </p>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* NAME */}
      <div>
        <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
          Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="
            w-full px-4 py-4 rounded-xl
            bg-[var(--bg-card)]
            text-[var(--text-primary)]
            border border-[var(--border-color)]
            outline-none transition-all
            placeholder:text-[var(--text-secondary)]
            focus:ring-2 focus:ring-[var(--primary)]
            focus:border-[var(--primary)]
          "
        />
      </div>
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
      placeholder:text-[var(--text-secondary)]
      focus:ring-2 focus:ring-[var(--primary)]
      focus:border-[var(--primary)]
    "
  />
</div>

{/* PASSWORD */}
<div>
  <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
    Password
  </label>

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
        placeholder:text-[var(--text-secondary)]
        focus:ring-2 focus:ring-[var(--primary)]
        focus:border-[var(--primary)]
      "
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="
        absolute right-4 top-1/2 -translate-y-1/2
        text-[var(--text-secondary)]
        hover:text-[var(--text-primary)]
        transition-colors
      "
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>

                {/* PASSWORD RULES */}
             <div
  className="
    mt-2
    rounded-xl
    border border-[var(--border-color)]
    bg-[var(--bg-card)]
    p-4
    space-y-2
  "
>
                  <PasswordRule
                    valid={formData.password.length >= 8}
                    text="At least 8 characters"
                  />

                  <PasswordRule
                    valid={/[A-Z]/.test(formData.password)}
                    text="One uppercase letter"
                  />

                  <PasswordRule
                    valid={/[a-z]/.test(formData.password)}
                    text="One lowercase letter"
                  />

                  <PasswordRule
                    valid={/\d/.test(formData.password)}
                    text="One number"
                  />

                  <PasswordRule
                    valid={/[@$!%*?&]/.test(formData.password)}
                    text="One special character"
                  />
                </div>
              </div>

              {/* BUTTON */}
<button
  type="submit"
  disabled={loading}
  className="
    w-full
    py-4
    rounded-xl
    font-semibold
    shadow-lg
    
    items-center justify-center gap-3 border border-[#d7d4e4] py-3 rounded-xl bg-[var(--text-secondary)]
            hover:bg-gray-600 text-black
            transition
  "
>
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              {/* GOOGLE */}
            </form>

             {/* FOOTER */}
                      <p className="text-center mt-10 text-[var(--text-secondary)]">
  Already have an account?{" "}
  <Link
    to="/login"
    className="text-[var(--primary)] font-semibold hover:underline"
  >
    Log in
  </Link>
</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;
