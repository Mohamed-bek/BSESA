import React, { useEffect, useState } from "react";
import { FiTarget } from "react-icons/fi";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaCalendar, FaCheckCircle, FaFlag, FaUsers } from "react-icons/fa";

const ApplicationPage = () => {
  const [application, setapplication] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getApplication = async (req, res) => {
      try {
        const { data } = await axios.get(
          `https://bsesa-ksem.vercel.app/application/${id}`
        );
        console.log("data: " + data);
        setapplication(data);
      } catch (error) {}
    };
    getApplication();
  }, []);
  return (
    <div className="min-h-dvh  bg-whiteColor p-6 pt-[110px]">
      <div className="flex flex-wrap justify-center items-start rounded-lg overflow-hidden shadow-xl">
        <div className="w-full lg:w-1/2 ">
          {" "}
          <div className="bg-primary text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">{application?.name}</h1>
                <div className="flex items-center mt-2">
                  <FaFlag className="w-5 h-5 mr-2" />
                  <span className="text-sm">
                    {application?.level} Level Development
                  </span>
                </div>
              </div>
              <div className="bg-white text-primary px-4 py-2 rounded-full">
                {new Date(application?.deadline) > new Date()
                  ? "In Progress"
                  : "Deadline Passed"}
              </div>
            </div>
          </div>
          <div className="w-full min-h-[350px] max-h-[600px] overflow-hidden lg:max-h-[650px] relative">
            <img className="object-fill" src={application?.image} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-white overflow-hidden">
          {/* Header Section */}

          {/* Main Content */}
          <div className="p-6">
            {/* Development Overview */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <FiTarget className="w-6 h-6 mr-3 text-primary" />
                <h2 className="text-2xl font-semibold text-blackColor">
                  Development Vision
                </h2>
              </div>
              <p className="text-blackColor text-lg leading-relaxed">
                {application?.desiredDevelopment}
              </p>
            </section>

            {/* Development Steps */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <FaCheckCircle className="w-6 h-6 mr-3 text-primary" />
                <h2 className="text-2xl font-semibold text-blackColor">
                  Development Steps
                </h2>
              </div>
              <div className="space-y-4">
                {application?.steps?.map((step, index) => (
                  <div
                    key={step._id || index}
                    className="bg-secondary p-4 rounded-lg border-l-4 border-primary"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-blackColor">
                        Step {index + 1}: {step.title}
                      </h3>
                      <span className="text-sm text-secondary0">
                        In Progress
                      </span>
                    </div>
                    <p className="text-blackColor">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Additional Details */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <FaCalendar className="w-5 h-5 mr-2 text-primary" />
                  <h3 className="font-semibold text-blackColor">Key Dates</h3>
                </div>
                <div className="space-y-2 text-blackColor font-semibold">
                  <p>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(application?.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Deadline:</span>{" "}
                    {new Date(application?.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-secondary p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <FaUsers className="w-5 h-5 mr-2 text-primary" />
                  <h3 className="font-semibold text-blackColor">Subscribers</h3>
                </div>
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-primary mr-3">
                    {application?.subscribersIds.length}
                  </span>
                  <span className="text-blackColor">Interested Members</span>
                </div>
                <p className="text-sm text-secondary0 mt-2">
                  Growing community support for the club's development
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <Link
            to={
              application?.applicantType === "ClubApplication"
                ? "/club-application-form/" + application?._id
                : "/coach-application-form/" + application?._id
            }
            className="bg-primary p-4 text-center w-full text-whiteColor font-semibold block mx-auto"
          >
            Register{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
