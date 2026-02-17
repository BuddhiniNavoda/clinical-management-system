"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddDoctorPage() {
  const router = useRouter();
  const [doctorForm, setDoctorForm] = useState({
    d_name: "",
    specialization: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  }

  async function handleAddDoctor() {
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/admin/add-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorForm),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);

      setMessage("Doctor added successfully!");
      setDoctorForm({ d_name: "", email: "", password: "", specialization: "" });

    } catch (err) {
      setError(err.message || "Failed to add doctor");
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-blue-700 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>


        <button
          className="block w-full text-left bg-blue-600 p-2 rounded"
        >
          Add Doctor
        </button>

        <button
          onClick={() => router.push("/admin/appointments")}
          className="block w-full text-left hover:bg-blue-600 p-2 rounded"
        >
          Appointments
        </button>

        <button
          onClick={() => router.push("/admin/edit-profile")}
          className="block w-full text-left hover:bg-blue-600 p-2 rounded"
        >
          Edit Profile
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/login");
          }}
          className="block w-full text-left hover:bg-red-600 p-2 rounded mt-10"
        >
          Logout
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Add New Doctor
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">

          <input
            name="d_name"
            placeholder="Doctor Name"
            className="input"
            value={doctorForm.d_name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Doctor Email"
            className="input"
            value={doctorForm.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Doctor Password"
            className="input"
            value={doctorForm.password}
            onChange={handleChange}
          />

          <input
            name="specialization"
            placeholder="Specialization"
            className="input"
            value={doctorForm.specialization}
            onChange={handleChange}
          />

          <button
            onClick={handleAddDoctor}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-3 hover:bg-blue-700"
          >
            Add Doctor
          </button>

          {message && <p className="text-green-600 text-center mt-4">{message}</p>}
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}
