import React from "react";
import { FaCalendar, FaUsers } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { Link } from "react-router-dom";

const Application = ({ application }) => {
  return (
    <Link
      to={"/application/" + application._id}
      className="max-w-[420px] w-full bg-white shadow-lg max-h-[420px] rounded-xl overflow-hidden"
    >
      <div className="relative">
        <img
          src={application.image}
          alt="Club Application"
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-4 left-4 bg-primary text-whiteColor px-3 py-1 rounded-full text-sm">
          {application.level} Level
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {application.name}
        </h2>

        <div className="flex items-strart mb-4">
          <FiTarget className="text-[1.5rem] w-5 mr-2 text-primary" />
          <p className="text-gray-600 flex-1 line-clamp-3 h-[74px] overflow-hidden ">
            {application.desiredDevelopment}
          </p>
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <div className="flex items-center">
            <FaCalendar className="w-5 h-5 mr-2 text-primary" />
            <span className="text-gray-600">
              Deadline: {new Date(application.deadline).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <FaUsers className="w-5 h-5 mr-2 text-primary" />
            <span className="text-gray-600">
              Subscribers: {application.subscribersIds.length}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Application;
