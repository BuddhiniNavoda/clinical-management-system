"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    address: "",
    bloodGroup: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignup() {
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/patient/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error();
      }

      setMessage("Account created successfully. Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch {
      setError("Signup failed. Email may already exist.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/signup.jpg')",
      }}
    >
      <div className="bg-white/90 backdrop-blur-md w-[700px] h-[500px] p-8 rounded-xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Patient Sign Up
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          className="input"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
        />

        <input
          name="dob"
          type="date"
          className="input"
          onChange={handleChange}
        />

        <select
          name="gender"
          className="input"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          name="address"
          placeholder="Address"
          className="input"
          onChange={handleChange}
        />

        <select
          name="bloodGroup"
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

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700"
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
