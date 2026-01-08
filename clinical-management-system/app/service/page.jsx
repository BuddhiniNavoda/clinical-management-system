"use client";

import ServiceCarousel from "@/components/ServiceCarousel";
export default function ServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-15">
      <div className="text-center mb-19">
        <h4 className="text-3xl text-blue-600 font-semibold uppercase tracking-wide underline underline-offset-4">
          Services
        </h4>
        <h1 className="text-6xl font-bold text-gray-600 mt-2">
          Excellent Medical Services
        </h1>
      </div>

      <ServiceCarousel />
    </div>
  );
}
  
