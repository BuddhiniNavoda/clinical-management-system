"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    p_name: "",
    p_address: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    blood_G: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignup() {
    setError("");
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // ✅ EXACT JSON BACKEND EXPECTS
    const payload = {
      email: form.email,
      password: form.password,
      p_name: form.p_name,
      p_address: form.p_address,
      dob: form.dob,
      gender: form.gender,
      blood_G: form.blood_G
    };

    try {
      const res = await fetch("http://localhost:8080/patient/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("STATUS:", res.status);

      const text = await res.text();
      console.log("RESPONSE:", text);

      if (!res.ok) {
        throw new Error(text);
      }

      setMessage("Patient registered successfully. Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);

    } catch (err) {
      console.error(err);
      setError(err.message || "Signup failed");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/signup.jpg')" }}
    >
      <div className="bg-white/90 backdrop-blur-md w-[520px] p-8 rounded-xl shadow-xl">

        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Patient Sign Up
        </h2>

        {/* FULL NAME */}
        <input
          name="p_name"
          placeholder="Full Name"
          className="input"
          onChange={handleChange}
        />

        {/* ADDRESS */}
        <input
          name="p_address"
          placeholder="Address"
          className="input"
          onChange={handleChange}
        />

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input pr-12"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="input pr-12"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* DOB */}
        <input
          name="dob"
          type="date"
          className="input"
          onChange={handleChange}
        />

        {/* GENDER */}
        <select
          name="gender"
          className="input"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        {/* BLOOD GROUP */}
        <select
          name="blood_G"
          className="input"
          onChange={handleChange}
        >
          <option value="">Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>O+</option>
          <option>O-</option>
          <option>AB+</option>
          <option>AB-</option>
        </select>

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-3 hover:bg-blue-700"
        >
          Sign Up
        </button>

        {message && <p className="text-green-600 text-center mt-4">{message}</p>}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        <p className="text-sm text-center mt-6 text-gray-700 font-semibold">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
