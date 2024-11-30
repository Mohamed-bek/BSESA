import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Application from "./Application";

function Applications() {
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const { type } = useParams();

  const getApplications = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://bsesa-ksem.vercel.app/applications",
        {
          params: {
            applicantType:
              type === "team" ? "ClubApplication" : "CoachApplication",
          },
        }
      );
      console.log("Applications : ", data);
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, [type]); // Empty dependency array, fetches only on mount.

  return (
    <div className="w-full min-h-[100dvh] pt-[110px] bg-secondary flex  px-10 flex-wrap items-stretch justify-center gap-5 pb-10">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 z-[999999]">
          <div className="loader"></div>
        </div>
      )}
      {applications?.map((application) => (
        <Application key={application._id} application={application} />
      ))}
    </div>
  );
}

export default Applications;
