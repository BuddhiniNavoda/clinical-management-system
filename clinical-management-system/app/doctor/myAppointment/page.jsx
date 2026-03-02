"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DoctorMyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [accessId, setAccessId] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1) Read AccessId (you store it as userId in login)
  useEffect(() => {
    const id = localStorage.getItem("userId"); 
    setAccessId(id);
  }, []);

  // 2) Create axios instance ONLY when accessId exists
  const api = useMemo(() => {
    if (!accessId) return null;

    return axios.create({
      baseURL: "http://localhost:8080",
      headers: { "X-ACCESS-ID": accessId },
    });
  }, [accessId]);

  const loadAppointments = async () => {
    if (!api) return;

    setLoading(true);
    try {
      const res = await api.get("/doctor/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  // 3) Run this AFTER accessId is ready
  useEffect(() => {
    if (!accessId) return; // don't alert here yet; accessId loads asynchronously
    loadAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessId, api]);

  const confirm = async (id) => {
    if (!api) return;
    try {
      await api.put(`/doctor/appointments/${id}/confirm`);
      await loadAppointments();
    } catch (err) {
      console.error(err);
      alert("Confirm failed");
    }
  };

  const unconfirm = async (id) => {
    if (!api) return;
    try {
      await api.put(`/doctor/appointments/${id}/unconfirm`);
      await loadAppointments();
    } catch (err) {
      console.error(err);
      alert("Unconfirm failed");
    }
  };

  // If accessId never exists (doctor not logged in)
  if (accessId === null) {
    return <div style={{ padding: 20 }}>Checking login...</div>;
  }

  if (!accessId) {
    return (
      <div style={{ padding: 20 }}>
        No accessId found. Please login again.
        <div>
          <button onClick={() => router.push("/login")}>Go to Login</button>
        </div>
      </div>
    );
  }

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-cyan-600 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Doctor Dashboard</h2>

        <button className="block w-full text-left hover:bg-blue-600 p-2 rounded">
          Edit Profile
        </button>

        <button
          onClick={() => router.push("/doctor/myAppointment")}
          className="block w-full text-left hover:bg-blue-600 p-2 rounded"
        >
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
      <div className="flex-1 p-10 text-cyan-800 font-bold mb-15">
        <h2 className="text-2xl font-bold text-center">My Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <table border="3" cellPadding="10" className="text-gray-900" style={{ width: "100%", marginTop: 10 }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Patient Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.appointmentDate}</td>
                  <td>{a.appointmentTime}</td>
                  <td>{a.patientEmail}</td>
                  <td>
                    {a.status === "CONFIRMED" ? (
                      <span className="text-green-600 font-bold">CONFIRMED</span>
                    ) : (
                      <span className="text-red-600 font-bold">NOT CONFIRMED</span>
                    )}
                  </td>
                  <td>  
                  <button onClick={() => changeStatus(a.id, "CONFIRMED")}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                    Confirm
                  </button>

                  <button onClick={() => changeStatus(a.id, "NOT_CONFIRMED")}
                    className="bg-red-500 text-white px-3 py-1 rounded">
                    Not Confirm
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}