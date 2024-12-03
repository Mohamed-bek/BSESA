import React from "react";
import ConferenceCard from "../../components/ConferenceCard";

function Conferences() {
  const conferenceData = {
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
    <div>
      <ConferenceCard conference={conferenceData} />
    </div>
  );
}

export default Conferences;
