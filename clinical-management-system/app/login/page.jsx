"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/lib/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setMessage("");

    try {
      const res = await loginUser({ email, password });

          localStorage.setItem("userId", res.id);
          localStorage.setItem("userType", res.userType);

      setMessage(`Logged in successfully as ${res.userType}`);

      // OPTIONAL: redirect based on role
      setTimeout(() => {
        if (res.userType === "Patient") router.push("/patient/dashboard");
        else if (res.userType === "Doctor") router.push("/doctor/dashboard");
        else if (res.userType === "Admin") router.push("/admin/dashboard");
      }, 1000);

    } catch (err) {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex  justify-center bg-gray-100 pt-10">
      <div className="flex w-[900px] h-[530px] bg-white rounded-lg shadow-lg overflow-hidden">

        {/* LEFT IMAGE */}
        <div
          className="hidden md:flex w-2/5"
        >
          <img
          src="/check.jpg"   
          alt="Login"
          className="w-full h-full object-cover"
        />
        </div>

        {/* RIGHT FORM */}
        <div className="w-3/5 p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 rounded font-bold text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-3 pr-12 rounded font-bold text-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-600"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>


          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Login
          </button>

          {message && (
            <p className="text-green-600 mt-4 text-center">{message}</p>
          )}

          {error && (
            <p className="text-red-600 mt-4 text-center">{error}</p>
          )}

          <p className="text-sm mt-6 text-center text-gray-600 font-bold">
            Don’t have an account?{" "}
            <Link href="/signUp" className="text-blue-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
