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
      .then(data => {
        if (Array.isArray(data)) setDoctors(data);
        else if (Array.isArray(data.content)) setDoctors(data.content);
        else setDoctors([]);
      })
      .catch(() => setDoctors([]));

  }, [router]);

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-cyan-600 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Patient Panel</h2>

        <button onClick={()=>router.push("/patient/dashboard")} className="block w-full text-left p-2 hover:bg-cyan-700 rounded">
          Dashboard
        </button>

        <button className="block w-full text-left p-2 bg-cyan-700 rounded">
          Doctor List
        </button>

        <button onClick={() => router.push("/patient/book")}
          className="block w-full text-left p-2 hover:bg-cyan-700 rounded">
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
          Doctor List
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {Array.isArray(doctors) && doctors.map((doctor) => (

            <div key={doctor.d_id}
              className="bg-white p-6 rounded-xl shadow-lg text-center">

              <img
                src="/doctor.jpg"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />

              <h3 className="text-lg font-bold text-black">
                Dr. {doctor.d_name}
              </h3>

              <p className="text-blue-600 font-semibold mb-4">
                {doctor.specialization}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-3 justify-center">

                {/* VIEW SCHEDULE */}
                <button
                  onClick={() =>
                    router.push(`/patient/doctorSchedule/${doctor.d_id}`)
                  }
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Available Dates
                </button>

                {/* BOOK */}
                <button
                onClick={() => {
                  //console.log("Sending ID:", doctor.d_id); // DEBUG LINE
                  router.push(
                    `/patient/appointment?doctorAccessId=${doctor.access?.id}&doctorName=${encodeURIComponent(doctor.d_name)}`
                  );
                }}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Book Appointment
              </button>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );

  console.log(doctors);

}
