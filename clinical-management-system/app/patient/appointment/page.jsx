"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AppointmentPage() 
{
  const router = useRouter();

  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "Patient") {
      router.push("/login");
      return;
    }

    fetch("http://localhost:8080/doctor/viewdoctors")
      .then(res => res.json())
      .then(data => setDoctors(Array.isArray(data) ? data : []))
      .catch(() => setDoctors([]));
  }, []);

  async function bookAppointment() {
    setMessage("");

    if (!doctorId || !date || !time) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/appointment/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: Number(selectedDoctor),
          appointmentDate: date,
          appointmentTime: time,
          patientEmail: localStorage.getItem("email")
        })
      })

      const text = await res.text();
        console.log("SERVER RESPONSE:", text);

        if (!res.ok) throw new Error(text);

        setMessage(text);

      
      }
        catch (error) {
        console.error("FULL ERROR:", error);
        setMessage(error.message);
      }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-cyan-600 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Patient Panel</h2>
        <button onClick={()=>router.push("/patient/viewDoctors")} className="block w-full text-left p-2 hover:bg-cyan-700 rounded">View Doctors</button>

        <button className="block w-full text-left p-2 bg-cyan-800 rounded">Make Appointment</button>

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

      {/* Content */}
      <div className="flex-1 p-10">
        <div className="max-w-xl bg-white p-6 rounded-xl shadow-lg mx-auto">

          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Book Appointment
          </h2>

          <select
            className="w-full p-3 border rounded mb-3 text-black"
            value={doctorId}
            onChange={(e)=>setDoctorId(e.target.value)}
          >
            <option value="">Select Doctor</option>

            {doctors.map(doc => (
              <option key={doc.d_id} value={doc.d_id}>
                Dr. {doc.d_name} — {doc.specialization}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full p-3 border rounded mb-3 text-black"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
          />

          <input
            type="time"
            className="w-full p-3 border rounded mb-3 text-black"
            value={time}
            onChange={(e)=>setTime(e.target.value)}
          />

          <button
            onClick={bookAppointment}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Confirm Appointment
          </button>

          {message && (
            <p className="mt-4 text-center text-green-600">{message}</p>
          )}

        </div>
      </div>

    </div>
  );
  }
}
