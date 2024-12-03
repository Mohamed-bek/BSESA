import axios from "axios";
import React, { useEffect, useState } from "react";
import ConferenceCard from "../../components/ConferenceCard";

function Conferences() {
  const [conferences, setConferences] = useState([]);
  useEffect(() => {
    const GetConferences = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/conferences"
        );
        setConferences(data.conferences);
      } catch (error) {
        console.log(error);
      }
    };
    GetConferences();
  }, []);
  return (
    <div className="w-[90%] mx-auto pt-[100px] pb-[20px]">
      {conferences.map((conference) => (
        <ConferenceCard conference={conference} />
      ))}
    </div>
  );
}

export default Conferences;
