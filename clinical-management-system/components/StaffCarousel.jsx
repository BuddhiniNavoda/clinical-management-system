"use client";

import { useState } from "react";

const doctors = [
  {
    name: "Dr. John Smith",
    specialty: "Cardiology Specialist",
    bio: "Expert in heart disease prevention and treatment.",
    image: "/doctor1.jpg",
  },
  {
    name: "Dr. Emma Johnson",
    specialty: "Pediatric Specialist",
    bio: "Specialist in child healthcare and development.",
    image: "/doctor2.jpg",
  },
  {
    name: "Dr. Michael Brown",
    specialty: "Neurology Specialist",
    bio: "Treating nervous system disorders with care.",
    image: "/doctor3.jpg",
  },
  {
    name: "Dr. Sophia Wilson",
    specialty: "Dental Specialist",
    bio: "Providing advanced dental care solutions.",
    image: "/doctor4.jpg",
  },
];

export default function StaffCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < doctors.length - 2) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto overflow-hidden">

      {/* LEFT ARROW */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-cyan-400 text-white w-12 h-12 rounded-full flex items-center justify-center shadow hover:bg-cyan-500 z-10"
      >
        ←
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-cyan-400 text-white w-12 h-12 rounded-full flex items-center justify-center shadow hover:bg-cyan-500 z-10"
      >
        →
      </button>

      {/* DOCTOR CARDS */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 50}%)` }}
      >
        {doctors.map((doctor, i) => (
          <div key={i} className="w-1/2 px-4 flex-shrink-0">
            <div className="bg-blue-50 rounded-2xl shadow-lg overflow-hidden flex">

              {/* IMAGE */}
              <div className="w-1/2">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="w-1/2 p-8 flex flex-col justify-between text-gray-700">
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-cyan-500 italic mb-4">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600">
                    {doctor.bio}
                  </p>
                </div>

                {/* SOCIAL ICONS */}
                <div className="flex gap-4 mt-6">
                  <button className="w-10 h-10 bg-cyan-400 text-white rounded-full flex items-center justify-center">T</button>
                  <button className="w-10 h-10 bg-cyan-400 text-white rounded-full flex items-center justify-center">F</button>
                  <button className="w-10 h-10 bg-cyan-400 text-white rounded-full flex items-center justify-center">in</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
