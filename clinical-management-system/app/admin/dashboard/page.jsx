"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const accessId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");

    if (!accessId || userType !== "Admin") {
      router.push("/login");
      return;
    }

    fetch(`http://localhost:8080/admin/profile/${accessId}`)
      .then(res => res.json())
      .then(data => setAdmin(data));
  }, [router]);

  if (!admin) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-cyan-600 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>

        <button
          onClick={() => router.push("/admin/addDoctors")}
          className="block w-full text-left hover:bg-blue-600 p-2 rounded"
        >
          Add Doctor
        </button>

        <button
          onClick={() => router.push("/admin/appointments")}
          className="block w-full text-left hover:bg-blue-600 p-2 rounded"
        >
          View Appointments
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

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome Admin 👋
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
          <h2 className="text-xl font-bold mb-4 text-blue-600">
            Your Profile
          </h2>

          <p className="text-black"><strong>Email:</strong> {admin.email}</p>
          <p className="text-black"><strong>Role:</strong> {admin.userType}</p>
        </div>

      </div>
    </div>
  );
}
