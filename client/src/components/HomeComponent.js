import React from "react";
import { FaArrowRight, FaBrain, FaGlobe, FaMicroscope } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-black to-[#c70039] text-white py-20">
        {" "}
        <div className="w-full md:w-[90%] mx-auto px-4 grid md:grid-cols-2 items-center gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Elevate Athletic Performance Through Cutting-Edge Science
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Transforming athletes and teams with innovative research, advanced
              technologies, and holistic performance strategies.
            </p>
            <div className="flex gap-2">
              <NavLink
                to="/courses"
                className="bg-white text-primary px-3 md:px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
              >
                Explore Courses <FaArrowRight className="ml-2" />
              </NavLink>
              <a
                href="mailto:Edu@bsesac.co.uk"
                className="border border-white text-white px-2 md:px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="hidden md:block overflow-hidden p-0">
            <div className="bg-white/10 overflow-hidden rounded-xl backdrop-blur-md p-6">
              <div className="bg-transparent overflow-hidden rounded-xl backdrop-blur-md p-6">
                <img
                  src="/pc.png"
                  alt="Sports Performance Lab"
                  className="rounded-lg shadow-2xl scale-110 transform hover:scale-125  duration-300 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Key Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Our Approach to Performance Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We blend advanced sports science, cutting-edge technology, and
            interdisciplinary research to unlock unprecedented athletic
            potential.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
            <FaGlobe className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Global Insights</h3>
            <p className="text-gray-600">
              Connect with world-leading sports science experts and leverage
              international research networks.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
            <FaMicroscope className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Advanced Research</h3>
            <p className="text-gray-600">
              Conduct breakthrough studies in performance measurement,
              biomechanics, and athletic optimization.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
            <FaBrain className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">
              Holistic Development
            </h3>
            <p className="text-gray-600">
              Integrate psychological, nutritional, and technological frameworks
              for comprehensive athlete growth.
            </p>
          </div>
        </div>
      </section>

      {/* Research Impact Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Measuring Our Research Impact
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Our commitment to excellence is reflected in groundbreaking
                research that transforms athletic performance across multiple
                disciplines.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-3xl font-bold text-primary">120+</h3>
                  <p className="text-gray-600">Published Research Papers</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary">25</h3>
                  <p className="text-gray-600">International Collaborations</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary">500+</h3>
                  <p className="text-gray-600">Athletes Trained</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary">95%</h3>
                  <p className="text-gray-600">Performance Improvement Rate</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <img
                  src="/cata1.jpeg"
                  alt="Research Lab"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Athletes Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear directly from the athletes and teams who have experienced
            transformative performance breakthroughs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-gray-600 mb-6 italic">
              "The sports science insights I gained here completely
              revolutionized my training approach and performance."
            </p>
            <div className="flex items-center">
              <img
                src="/default-avatar.jpg"
                alt="Athlete Testimonial"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold">Elena Rodriguez</h4>
                <p className="text-gray-500">Professional Tennis Player</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-gray-600 mb-6 italic">
              "Our team's performance metrics improved dramatically after
              implementing their comprehensive training protocols."
            </p>
            <div className="flex items-center">
              <img
                src="/default-avatar.jpg"
                alt="Team Coach Testimonial"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold">Michael Chang</h4>
                <p className="text-gray-500">Basketball Team Coach</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-gray-600 mb-6 italic">
              "The interdisciplinary approach here is unparalleled. It's not
              just training, it's holistic athlete development."
            </p>
            <div className="flex items-center">
              <img
                src="/default-avatar.jpg"
                alt="Performance Analyst Testimonial"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold">Sarah Thompson</h4>
                <p className="text-gray-500">Performance Analyst</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
