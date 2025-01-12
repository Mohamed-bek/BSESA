import React from "react";
import { motion } from "framer-motion";
import { FaTools, FaCog } from "react-icons/fa";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primaryTra to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <FaCog className="text-4xl text-primary" />
          </motion.div>
          <FaTools className="text-4xl text-black" />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <FaCog className="text-4xl text-primary" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Under Construction
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We're working hard to bring you something amazing. This feature will
            be available soon!
          </p>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "60%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-primaryTra rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-2">
                Enhanced Features
              </h3>
              <p className="text-gray-600">
                New tools and capabilities coming to improve your experience
              </p>
            </div>
            <div className="bg-primaryTra rounded-lg p-4">
              <h3 className="font-semibold text-primary mb-2">
                Better Performance
              </h3>
              <p className="text-gray-600">
                Optimized systems for faster and more reliable service
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => window.history.back()}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryTra transition-colors"
            >
              Go Back
            </button>
            <p className="text-sm text-gray-500">
              Expected completion: Coming Soon
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnderConstruction;
