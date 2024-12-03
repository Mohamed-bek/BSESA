import React from "react";
import { FaCalendar, FaMapPin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Conference = () => {
  const conference = {
    name: "Tech Innovators Summit",
    image: "/path/to/conference-image.jpg",
    location: "San Francisco, CA",
    date: {
      start: new Date("2024-09-15"),
      end: new Date("2024-09-17"),
    },
    description:
      "A cutting-edge conference exploring the latest in technology and innovation.",
    speakers: [
      {
        firstName: "Jane",
        lastName: "Doe",
        image: "/path/to/speaker-image.jpg",
      },
    ],
  };
  return (
    <div className=" min-h-[100dvh] pt-[100px] pb-[20p] mx-auto px-4 w-full md:w-[80%]">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Conference Image */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={conference.image || "/default-conference.jpg"}
            alt={conference.name}
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Conference Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-blackColor mb-4">
            {conference.name}
          </h1>

          {/* Detail Icons */}
          <div className="space-y-3">
            <div className="flex items-center text-blackColor">
              <FaCalendar className="w-6 h-6 mr-3 text-primary" />
              <div>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(conference.date.start).toLocaleDateString()}
                {conference.date.end &&
                  ` - ${new Date(conference.date.end).toLocaleDateString()}`}
              </div>
            </div>

            <div className="flex items-center text-blackColor">
              <FaLocationDot className="w-6 h-6 mr-3 text-primary" />
              <div>
                <span className="font-semibold">Location:</span>{" "}
                {conference.location}
              </div>
            </div>
          </div>

          {/* Register Button */}
          {/* <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4">
            Register for Conference
          </button> */}
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-blackColor mb-4">
          About the Conference
        </h2>
        <p className="text-blackColor leading-relaxed">
          {conference.description}
        </p>
      </div>

      {/* Speakers Section */}
      {conference.speakers && conference.speakers.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-blackColor mb-6">
            Speakers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {conference.speakers.map((speaker, index) => (
              <div
                key={index}
                className="text-center bg-secondary rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {speaker.image && (
                  <img
                    src={speaker.image}
                    alt={`${speaker.firstName} ${speaker.lastName}`}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                )}
                <h3 className="font-semibold text-blackColor">
                  {speaker.firstName} {speaker.lastName}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Conference;
