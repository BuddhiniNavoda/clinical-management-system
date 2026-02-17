"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientDashboard() {
  const router = useRouter();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const accessId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");

    if (!accessId || userType !== "Patient") {
      router.push("/login");
      return;
    }

    fetch(`http://localhost:8080/patient/profile/${accessId}`)
      .then(res => res.json())
      .then(data => setPatient(data));
  }, [router]);

  if (!patient) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-cyan-600 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Patient Dashboard</h2>

        <button className="block w-full text-left hover:bg-blue-600 p-2 rounded">
          Edit Profile
        </button>

        <button 
        onClick={() => router.push("/patient/viewDoctors")}
        className="block w-full text-left hover:bg-blue-600 p-2 rounded">
          View Doctors 
        </button>

        <button
          onClick={() => router.push("/patient/appointment")}
          className="block w-full text-left hover:bg-blue-600 p-2 rounded"
        >
          Make Appointment
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
          Welcome {patient.p_name} !
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl">
          <h2 className="text-xl font-bold mb-4 text-blue-600">
            Your Profile
          </h2>

          <p className="text-black"><strong>Email:</strong> {patient.access.email}</p>
          <p className="text-black"><strong>Address:</strong> {patient.p_address}</p>
          <p className="text-black"><strong>Date of Birth:</strong> {patient.dob}</p>
          <p className="text-black"><strong>Gender:</strong> {patient.gender}</p>
          <p className="text-black"><strong>Blood Group:</strong> {patient.blood_G}</p>
        </div>
      </div>
    </div>
  );
}
