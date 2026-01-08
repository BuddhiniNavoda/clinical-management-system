export default function AboutPage() {
  return (
    <>
      <div className="px-10 py-16 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                  {/* LEFT IMAGE */}
                  <div>
                      <img
                          src="/about.jpg"
                          alt="Medical Care"
                          className="rounded-lg shadow-lg w-full" />
                  </div>

                  {/* RIGHT CONTENT */}
                  <div>
                      <h4 className="inline-block text-blue-500 font-semibold uppercase mb-3 border-b-4 border-blue-500 pb-0">
                    About Us
                    </h4>   

                      <h1 className="text-6xl font-bold text-gray-800 mb-6">
                          Best Medical Care For Yourself <br /> and Your Family
                      </h1>

                      <p className="text-gray-600 leading-relaxed mb-8">
                         We provide high-quality medical care using modern technology and experienced professionals to ensure the health and safety of every patient.
                      </p>

                      {/* ICON FEATURES */}
                      <div className="font-bold grid grid-cols-4 gap-1 ">
                          <Feature
                              icon="/icon-doctor.png"
                              title="Qualified"
                              subtitle="Doctors" />

                          <Feature
                              icon="/bed.png"
                              title="Emergency"
                              subtitle="Services" />

                          <Feature
                              icon="/test.jpg"
                              title="Accurate"
                              subtitle="Testing" />

                          <Feature
                              icon="/ambulance.png"
                              title="Free"
                              subtitle="Ambulance" />

                      </div>
                  </div>
              </div>
          </div></>
  );
}

/* Reusable Feature Component */
function Feature({ icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center text-center bg-gray-50 rounded-full p-6">
      <img src={icon} alt={title} className="h-12 mb-3" />
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-blue-500">{subtitle}</p>
    </div>
  );
}
