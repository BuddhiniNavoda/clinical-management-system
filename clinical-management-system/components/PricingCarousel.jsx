"use client";

import { useState } from "react";

const plans = [
  {
    title: "Pregnancy Care",
    price: 15000,
    image: "/pricing1.jpg",
    features: [
      "Emergency Medical Treatment",
      "Highly Experienced Doctors",
      "Highest Success Rate",
      "Telephone Service",
    ],
  },
  {
    title: "Health Checkup",
    price: 9900,
    image: "/pricing2.jpg",
    features: [
      "Emergency Medical Treatment",
      "Highly Experienced Doctors",
      "Highest Success Rate",
      "Telephone Service",
    ],
  },
  {
    title: "Dental Care",
    price: 25000,
    image: "/pricing3.jpg",
    features: [
      "Emergency Medical Treatment",
      "Highly Experienced Doctors",
      "Highest Success Rate",
      "Telephone Service",
    ],
  },
  {
    title: "Cardiology",
    price: 19900,
    image: "/pricing4.jpg",
    features: [
      "Heart Monitoring",
      "Expert Cardiologists",
      "Advanced Equipment",
      "24/7 Support",
    ],
  },
  {
    title: "Pediatrics",
    price: 7900,
    image: "/pricing5.jpg",
    features: [
      "Child Health Care",
      "Vaccination Support",
      "Pediatric Specialists",
      "Emergency Assistance",
    ],
  },
];

export default function PricingCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < plans.length - 3) {
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

      {/* CARDS */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 33.333}%)` }}
      >
        {plans.map((plan, i) => (
          <div key={i} className="w-1/3 px-4 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

              {/* TOP IMAGE */}
              <div className="relative h-48">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
                  <h3 className="text-4xl font-bold text-cyan-300">
                    {plan.title}
                  </h3>
                  <div className="mt-2 text-2xl font-bold">
                    Rs {plan.price}
                    <span className="text-sm font-normal"> / Year</span>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8 text-center text-gray-700 space-y-4">
                {plan.features.map((feature, idx) => (
                  <p key={idx}>{feature}</p>
                ))}

                <button className="mt-6 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 px-10 rounded-full transition">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-cyan-400 w-12 h-12 rounded-full shadow flex items-center justify-center hover:bg-blue-600"
      >
        ←
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-cyan-400 w-12 h-12 rounded-full shadow flex items-center justify-center hover:bg-blue-600"
      > →
      </button>
    </div>
  );
}
