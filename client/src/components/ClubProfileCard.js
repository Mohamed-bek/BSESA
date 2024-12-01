import React, { useEffect, useRef } from "react";
import { FaCalendar, FaFile, FaGlobe, FaPhone, FaUsers } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const ClubProfileCard = ({ club, isVisible, setisVisible }) => {
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
      className={`fixed transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-dvh mx-auto duration-1000 z-[999] flex justify-center items-center bg-[#00000029] shadow-lg rounded-lg overflow-hidden ${
        isVisible ? "scale-100" : "scale-0"
      }`}
    >
      <div
        ref={modalRef} // Attach the ref to the central div
        className="max-w-md mx-auto duration-300 bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="relative">
          <img
            src={club?.logo || "/api/placeholder/400/400"}
            alt={`${club?.name} logo`}
            className="w-full h-64 object-contain object-center bg-gray-100 p-4"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-4 py-2">
            <h2 className="text-2xl font-bold">{club?.name}</h2>
            <p className="text-sm">{club?.level} Level Club</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <FaLocationDot className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Location:</span> {club?.location}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaCalendar className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Established:</span>{" "}
              {club?.establishedYear}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <IoMdMail className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Contact Email:</span>{" "}
              {club?.contactEmail}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaPhone className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Contact Phone:</span>{" "}
              {club?.contactPhone}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaGlobe className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Website:</span>
              <a
                href={club?.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 hover:underline"
              >
                {club?.website}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaUsers className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Club Size:</span> {club?.clubSize}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaFile className="text-gray-500" size={20} />
            <div>
              <span className="font-semibold">Description:</span>
              <p className="mt-2 text-gray-600">{club?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfileCard;
