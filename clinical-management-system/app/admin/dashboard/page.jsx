"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const[doctorForm, setDoctorForm] = useState({
    name: "",
    specialization: "",
    email: "",
    password: "",
  });

  const[message, setMessage] = useState("");
  const[error, setError] = useState("");

  useEffect(() => {
    const accessId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");

    if (!accessId || userType !== "ADMIN") {
      router.push("/admin/dashboard");
      return;
    }

    fetch(`http://localhost:8080/admin/profile/${accessId}`)
      .then(res => res.json())
      .then(data => setAdmin(data));
  }, [router]);
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
        body: JSON.stringify(doctorForm)
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);

      setMessage("Doctor added successfully!");
      setDoctorForm({ name: "", email: "", password: "", specialization: "" });

    } catch (err) {
      setError(err.message || "Failed to add doctor");
    }
  }


  if (!admin) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-10 space-y-6">

      <div className="max-w-xl bg-white p-6 rounded-xl shadow-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>Role:</strong> {admin.userType}</p>
      </div>

      <div className="max-w-xl bg-white p-6 rounded-xl shadow-lg mx-auto">
        <h3 className="text-xl font-bold mb-4">Add Doctor</h3>

        <input
          name="name"
          placeholder="Doctor Name"
          className="input"
          value={doctorForm.name}
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
  );

}
