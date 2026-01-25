"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientDashboard() {
  const router = useRouter();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const accessId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");

    if (!accessId || userType !== "PATIENT") {
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
        <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>

        <p><strong>Name:</strong> {patient.p_name}</p>
        <p><strong>Email:</strong> {patient.access.email}</p>
        <p><strong>Address:</strong> {patient.p_address}</p>
        <p><strong>Date of Birth:</strong> {patient.dob}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Blood Group:</strong> {patient.blood_G}</p>
      </div>
    </div>
  );
}
