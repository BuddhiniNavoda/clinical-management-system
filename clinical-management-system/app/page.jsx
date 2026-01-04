export default function HomePage() {
  return (
    <div
      className="relative h-[600px] flex items-center px-20 text-white"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 max-w-xl">
        <h4 className="inline-block text-blue-500 text-2xl font-bold uppercase mb-3 border-b-4 border-blue-500 pb-1">
          Welcome to PURECARE
        </h4>

        <h1 className="text-7xl font-bold mt-3">
          Best Healthcare Solution <br /> In Your City
        </h1>

        <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg text-lg">
          Login
        </button>
      </div>
    </div>
  );
}
