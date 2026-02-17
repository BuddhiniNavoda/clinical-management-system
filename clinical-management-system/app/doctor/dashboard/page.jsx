"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
   const router = useRouter();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const accessId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");
   

    if (!accessId || userType !== "Doctor") {
      router.push("/doctor/dashboard");
      return;
    }
    
    fetch(`http://localhost:8080/doctor/profile/${accessId}`)
      .then(res => res.json())
      .then(data => setDoctor(data));
  }, []);

  if (!doctor) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-cyan-600 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Doctor Dashboard</h2>

        <button className="block w-full text-left hover:bg-blue-600 p-2 rounded">
          Edit Profile
        </button>

        <button className="block w-full text-left hover:bg-blue-600 p-2 rounded">
          View Appointment
        </button>

        <button className="block w-full text-left hover:bg-blue-600 p-2 rounded">
          Schedule Available Date
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
          Welcome {doctor.d_name} !
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
          <h2 className="text-xl font-bold mb-4 text-blue-600">
            Your Profile
          </h2>
        <p className="text-black"><strong>Name:</strong> {doctor.d_name}</p>
        <p className="text-black"><strong>Email:</strong> {doctor.access.email}</p>
        <p className="text-black"><strong>Specialization:</strong> {doctor.specialization}</p>
      </div>
    </div>
      </div>
  );
}