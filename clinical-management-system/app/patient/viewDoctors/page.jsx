"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchDoctorPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const accessId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");

    if (!accessId || userType !== "Patient") {
      router.push("/login");
      return;
    }

    fetch("http://localhost:8080/doctor/viewdoctors")
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, [router]);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-cyan-600 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Patient Panel</h2>

        <button
          className="block w-full text-left bg-blue-600 p-2 rounded"
        >
         Doctor list
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Doctor list
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.d_id}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <img
                src="/doctor.jpg"
                alt="Doctor"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />

              <h3 className="text-lg font-bold text-black">
                Dr. {doctor.d_name}
              </h3>

              <p className="text-blue-600 font-semibold">
                {doctor.specialization}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
