"use client";

import { useState } from "react";

const services = [
  {
    title: "Pediatrics",
    desc: "Specialized healthcare services for children.",
    icon: "/baby.jpg",
  },
  {
    title: "Blood Testing",
    desc: "Accurate laboratory blood tests and reports.",
    icon: "/blood.jpg",
  },
   
  {
    title: "Pharmacy",
    desc: "All prescribed medicines available in-house.",
    icon: "/pill.jpg",
  },
   {
    title: "Radiology",
    desc: "X-ray, MRI, CT scan, and imaging services.",
    icon: "/xray.jpg",
  },

  {
    title: "Emergency Care",
    desc: "Immediate medical attention for critical conditions.",
    icon: "/ambulance.png",
  },
  {
    title: "Operation & Surgery",
    desc: "Advanced surgical procedures with expert doctors.",
    icon: "/bed.png",
  },
  {
    title: "Outdoor Checkup",
    desc: "Routine health checkups and diagnostics.",
    icon: "/icon-doctor.png",
  },
  {
    title: "Dental Care",
    desc: "Complete dental treatments and consultation.",
    icon: "/dental.jpg",
  },
  {
    title: "Cardiology",
    desc: "Heart health and cardiovascular treatments.",
    icon: "/heart.jpg",
  },  
  {
    title: "Maternity Care",
    desc: "Complete care for mothers and newborns.",
    icon: "/pagnat.jpg",
  },
];

export default function ServiceCarousel() {
  const [index, setIndex] = useState(0);
  const VISIBLE = 3;

  const next = () => {
    if (index < services.length - VISIBLE) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto overflow-hidden py-10">

      {/* SLIDER */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${index * (100 / VISIBLE)}%)`,
        }}
      >
        {services.map((service, i) => (
          <div key={i} className="w-1/3 px-4">
            <div className="bg-blue-50 rounded-2xl p-10 shadow text-center h-full">

              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-12 h-12 object-contain"
                />
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {service.title}
              </h3>

              <p className="text-gray-600">
                {service.desc}
              </p>

            </div>
          </div>
        ))}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prev}
        disabled={index === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white w-12 h-12 rounded-full shadow disabled:opacity-40"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={next}
        disabled={index >= services.length - VISIBLE}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white w-12 h-12 rounded-full shadow disabled:opacity-40"
      >
        ›
      </button>

    </div>
  );
}
