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
      router.push("/patient/dashboard");
      return;
    }

    fetch(`http://localhost:8080/patient/profile/${accessId}`)
      .then(res => res.json())
      .then(data => setPatient(data));
  }, []);

  if (!patient) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl bg-white p-6 rounded-xl shadow-lg mx-auto">
        <h2 className="text-2xl text-blue-600 font-black mb-4">Patient Details</h2>

        <p className="text-black"><strong>Name:</strong> {patient.p_name}</p>
        <p className="text-black"><strong>Email:</strong> {patient.access.email}</p>
        <p className="text-black"><strong>Address:</strong> {patient.p_address}</p>
        <p className="text-black"><strong>Date of Birth:</strong> {patient.dob}</p>
        <p className="text-black"><strong>Gender:</strong> {patient.gender}</p>
        <p className="text-black"><strong>Blood Group:</strong> {patient.blood_G}</p>
      </div>
    </div>
  );
}
