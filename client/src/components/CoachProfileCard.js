import React, { useEffect, useRef } from "react";
import {
  FaAward,
  FaCalendar,
  FaFileAlt,
  FaMailBulk,
  FaPhone,
} from "react-icons/fa";

const CoachProfileCard = ({ coach, isVisible, setisVisible }) => {
  const modalRef = useRef(null);

  // Close modal on outside click
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setisVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isVisible]);

  return (
    <div
      className={`fixed transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-dvh mx-auto duration-1000 z-[999]  flex justify-center items-center bg-[#00000029] shadow-lg rounded-lg overflow-hidden ${
        isVisible ? "scale-100" : "scale-0"
      }`}
    >
      <div
        ref={modalRef} // Attach the ref to the central div
        className="max-w-md mx-auto duration-300 bg-whiteColor shadow-lg rounded-lg overflow-hidden"
      >
        <div className="relative">
          <img
            src={coach?.image || "/api/placeholder/400/400"}
            alt={`${coach?.name} profile`}
            className="w-full h-64 object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[#000000be] bg-opacity-50 text-white px-4 py-2">
            <h2 className="text-2xl font-bold">{coach?.name}</h2>
            <p className="text-sm">{coach?.coachingLevel} Coach</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <FaCalendar className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {new Date(coach.dateOfBirth).toLocaleDateString("en-GB")}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaMailBulk className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Contact Email:</span>{" "}
              {coach?.contactEmail}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaPhone className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Contact Phone:</span>{" "}
              {coach?.contactPhone}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaAward className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Experience:</span>{" "}
              {coach?.experienceYears} years
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaFileAlt className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Biography:</span>
              <p className="mt-2 text-gray-600">{coach?.biography}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachProfileCard;
