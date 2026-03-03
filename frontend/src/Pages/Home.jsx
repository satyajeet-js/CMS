import React from "react";
import { CheckCircle, FilePlus, Activity, ShieldCheck } from "lucide-react";
import Button3 from "./Button3";
import Button from "./Button";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              College Complaint <br />
              <span className="text-blue-600">Management System</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              A modern platform that empowers students to raise concerns
              transparently and enables principals to manage and resolve
              complaints efficiently.
            </p>

<div className="w-full flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
 <Link to="/register">
   <Button3 label="Register" />
 </Link>
 <Link to="/login">
   <Button label="Login" />
 </Link>
</div>
          </div>

          {/* RIGHT CARD */}
          <div className="flex justify-center">
            <div className="relative bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md border border-gray-200">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Why College CMS?
              </h3>

              <ul className="space-y-4 text-gray-600">
                {[
                  "Transparent complaint tracking",
                  "Faster issue resolution",
                  "Secure student–principal communication",
                  "Organized & paperless system",
                ].map((text, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-blue-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="absolute -top-3 -right-3 bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-md text-xs sm:text-sm font-medium">
                New
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Powerful Features
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage college complaints efficiently and transparently.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-6 group-hover:scale-110 transition">
                <FilePlus className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Easy Submission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Students can quickly submit complaints with detailed descriptions and proper categorization.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 text-green-600 mb-6 group-hover:scale-110 transition">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-time Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track complaint status in real-time from submission to resolution with instant updates.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition duration-300">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-6 group-hover:scale-110 transition">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure Platform
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Role-based access control ensures data privacy with separate dashboards for students and principals.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
