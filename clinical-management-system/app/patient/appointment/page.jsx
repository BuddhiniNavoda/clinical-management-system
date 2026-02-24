"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AppointmentPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [doctorId, setDoctorId] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* AUTH CHECK */
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const patientAccessId = localStorage.getItem("userId");
    if (userType !== "Patient" || !patientAccessId) {
      router.push("/login");
      return;
    }

    const id = params.get("doctorAccessId");
    const name = params.get("doctorName");

    console.log("URL PARAM doctorId =", id);
    if (!id) {
      setMessage("Doctor not selected");
      return;
    }
    setDoctorId(id);
    setDoctorName(name || "");
    }
  , [params, router]);
  



  /* BOOK APPOINTMENT */
  async function handleBook() {

    setMessage("");
    setError("");

    const patientAccessId = localStorage.getItem("userId");

    if (!doctorAccessId ) {
      setMessage("Doctor Access ID missing");
      return;
    }

    if (!date || !time) {
      setMessage("Select date and time");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/appointment/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorAccessId: Number(doctorAccessId),
          patientAccessId: Number(patientAccessId),
          appointmentDate: date,
          appointmentTime: time
        })
      });

      const text = await res.text();

      if (!res.ok) throw new Error(text);

      setMessage("Appointment booked successfully!");
      setDate("");
      setTime("");

    } catch (err) {
      setError(err.message || "Booking failed");
    }
  }
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-cyan-600 text-white p-6 space-y-6">

        <h2 className="text-2xl font-bold">Patient Panel</h2>

        <button
          onClick={()=>router.push("/patient/dashboard")}
          className="block w-full text-left p-2 hover:bg-cyan-700 rounded"
        >
          Dashboard
        </button>

        <button
          onClick={()=>router.push("/patient/viewDoctors")}
          className="block w-full text-left p-2 hover:bg-cyan-700 rounded"
        >
          Doctor List
        </button>

        <button className="block w-full text-left p-2 bg-cyan-700 rounded">
          Make Appointment
        </button>

        <button
          onClick={()=>{
            localStorage.clear();
            router.push("/login");
          }}
          className="block w-full text-left p-2 hover:bg-red-600 rounded mt-10"
        >
          Logout
        </button>

      </div>



      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">

        <div className="max-w-xl bg-white p-6 rounded-xl shadow-lg mx-auto">

          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Book Appointment
          </h2>

          {/* DOCTOR FIELD (AUTO FILLED) */}
          <input
            value={doctorName ? `Dr. ${doctorName}` : "Loading doctor..."}
            disabled
            className="w-full p-3 border rounded mb-4 text-black bg-gray-200"
          />


          {/* DATE */}
          <label className="block mb-1 text-black font-semibold">
            Date
          </label>

          <input
            type="date"
            className="w-full p-3 border rounded mb-4 text-black"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
          />


          {/* TIME */}
          <label className="block mb-1 text-black font-semibold">
            Time
          </label>

          <input
            type="time"
            className="w-full p-3 border rounded mb-4 text-black"
            value={time}
            onChange={(e)=>setTime(e.target.value)}
          />


          {/* BUTTON */}
          <button
            onClick={handleBook}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Confirm Appointment
          </button>


          {/* MESSAGES */}
          {message && (
            <p className="text-green-600 text-center mt-4 font-semibold">
              {message}
            </p>
          )}

          {error && (
            <p className="text-red-600 text-center mt-4 font-semibold">
              {error}
            </p>
          )}

        </div>
      </div>
    </div>
  );
  console.log("EMAIL SENT:", localStorage.getItem("email"));

}
