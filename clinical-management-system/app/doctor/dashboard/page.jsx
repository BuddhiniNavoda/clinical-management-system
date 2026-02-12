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
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl bg-white p-6 rounded-xl shadow-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Email:</strong> {doctor.access.email}</p>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
      </div>
    </div>
  );
}
