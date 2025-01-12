import React from "react";
import {
  FaAward,
  FaBook,
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaMailBulk,
  FaPhone,
  FaTwitter,
  FaUsers,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 z-20 relative">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Services Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
            Our Services
          </h4>
          <ul className="space-y-3">
            <li className="flex items-center">
              <FaBook className="mr-3 text-primary" size={24} />
              <span>Educational Experiences</span>
            </li>
            <li className="flex items-center">
              <FaUsers className="mr-3 text-primary" size={24} />
              <span>Team Performance Integration</span>
            </li>
            <li className="flex items-center">
              <FaAward className="mr-3 text-primary" size={24} />
              <span>Academy Transformation</span>
            </li>
            <li className="flex items-center">
              <FaGlobe className="mr-3 text-primary" size={24} />
              <span>Knowledge Exchange</span>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
            Contact Us
          </h4>
          <div className="space-y-3">
            <p className="flex items-center">
              <FaMailBulk className="mr-3 text-primary" size={24} />
              <a
                href="mailto:Edu@bsesac.co.uk"
                className="text-white hover:text-primary"
              >
                Edu@bsesac.co.uk
              </a>
            </p>
            <p className="flex items-center">
              <FaPhone className="mr-3 text-primary" size={24} />
              <a
                href="tel:00447988817717"
                className="text-white hover:text-primary"
              >
                00447988817717
              </a>
            </p>

            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=100058790962758&mibextid=ZbWKwL"
                className="hover:text-primary transition-colors"
                target="_blank"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://x.com/BSESA01?t=B0pYGR1q-pmYSlQ2PWdx5A&s=09"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com/bsesa01?fbclid=IwY2xjawHJjZ5leHRuA2FlbQIxMAABHZ_qYxqPM4ZAIrCMsK_G-yhdLSIRq7PuQf9qzptwuPNtmTPnsJl89Qlldw_aem_5Z7j60a0nwEwLcxj0mcwCw"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.youtube.com/@britanniasportandexercises6589"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
            Stay Connected
          </h4>
          <p className="mb-4 text-gray-300">
            Subscribe to our newsletter for the latest sports science insights
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white px-4 rounded-r-lg hover:bg-opacity-90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pt-6 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Britannia Sport and Exercise Academy: All
          rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
