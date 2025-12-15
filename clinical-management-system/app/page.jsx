

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* Top bar */}
      <div className="bg-white py-2 px-6 text-sm flex justify-end space-x-4 text-gray-700">
        <span>📞 +012 345 6789</span>
        <span>✉ purecare@gmail.com</span>
      </div>
      <div className="border-b border-gray-200"></div>
      {/* Navbar */}
      <nav className="bg-white flex items-center justify-between px-10 py-4 shadow">
        <div className="flex items-center space-x-3">
        <img
          src="/logo.jpg"
          alt="purecare Logo"
          className="h-10 w-10"
        />
          <h1 className="text-4xl font-bold text-blue-500">PURECARE</h1>
        </div>

        <div className="space-x-8 text-black font-blod text-lg"> 
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Service</a>
          <a href="#" className="hover:text-blue-600">Pricing</a>
          <a href="#" className="hover:text-blue-600">Staff</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative h-[750px] flex items-center px-20 text-white "
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Left Content */}
        <div className="relative z-10 max-w-xl">
          <h4 className="text-2xl font-bold uppercase tracking-wide text-blue-400">
            Welcome to PURECARE
          </h4>

          <h1 className="text-7xl font-bold mt-3">
            Best Healthcare Solution <br />
            In Your City
          </h1>

          <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg text-lg">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
