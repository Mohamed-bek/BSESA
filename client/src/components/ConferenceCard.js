import React from "react";
import { FaCalendar, FaMapPin, FaUsers } from "react-icons/fa";

const ConferenceCard = ({ conference }) => {
  // Format date range
  const formatDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;

    const formatOptions = { month: "short", day: "numeric" };
    const yearOption = { year: "numeric" };

    const formattedStart = startDate.toLocaleDateString("en-US", formatOptions);
    const formattedStartYear = startDate.toLocaleDateString(
      "en-US",
      yearOption
    );

    if (endDate && startDate.getTime() !== endDate.getTime()) {
      const formattedEnd = endDate.toLocaleDateString(
        "en-US",
        endDate.getFullYear() === startDate.getFullYear()
          ? formatOptions
          : { ...formatOptions, ...yearOption }
      );
      return `${formattedStart} - ${formattedEnd}`;
    }

    return `${formattedStart}, ${formattedStartYear}`;
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      {/* Conference Image */}
      {conference.image && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={conference.image}
            alt={conference.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Conference Details */}
      <div className="p-6">
        {/* Conference Name */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-1">
          {conference.name}
        </h2>

        {/* Date */}
        <div className="flex items-center text-gray-600 mb-2">
          <FaCalendar className="w-5 h-5 mr-2 text-primary" />
          <span className="font-medium">
            {formatDateRange(conference.date.start, conference.date.end)}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-4">
          <FaMapPin className="w-5 h-5 mr-2 text-primary" />
          <span>{conference.location}</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 line-clamp-3 h-12">
          {conference.description}
        </p>

        {/* Speakers */}
        {conference.speakers && conference.speakers.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center text-gray-600 mb-2">
              <FaUsers className="w-5 h-5 mr-2 text-primary" />
              <span className="font-semibold">Speakers</span>
            </div>
            <div className="flex space-x-2">
              {conference.speakers.map((speaker, index) => (
                <div key={index} className="flex flex-col items-center">
                  {speaker.image && (
                    <img
                      src={speaker.image}
                      alt={`${speaker.firstName} ${speaker.lastName}`}
                      className="w-10 h-10 rounded-full object-cover mb-1"
                    />
                  )}
                  <span className="text-xs text-gray-600 text-center">
                    {speaker.firstName} {speaker.lastName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Register Button */}
        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primaryHover transition-colors">
          Show
        </button>
      </div>
    </div>
  );
};

export default ConferenceCard;
