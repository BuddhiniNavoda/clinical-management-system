"use client";

import StaffCarousel from "@/components/StaffCarousel";

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <p className="text-center text-3xl text-blue-500 font-semibold mb-2">OUR DOCTORS</p>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-14">
        Qualified Healthcare Professionals
      </h1>

      <StaffCarousel />
    </div>
  );
}
