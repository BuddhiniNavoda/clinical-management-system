"use client";

import PricingCarousel from "@/components/PricingCarousel";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Our Pricing Plans
      </h1>

      <PricingCarousel />
    </div>
  );
}
