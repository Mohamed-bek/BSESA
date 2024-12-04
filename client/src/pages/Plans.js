import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../context/UserContext";
import { CheckAuthetication } from "./Login";

const Plans = () => {
  const { user } = useUserStore();
  const [plans, setPlans] = useState([]);
  const [IsUserMemberships, setIsUserMemberships] = useState(null);
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("month");

  useEffect(() => {
    const fetchPlans = async () => {
      await CheckAuthetication();
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL + "memberships",
          {
            withCredentials: true,
          }
        );
        setPlans(data.plans);
        setLoading(false);
        setIsUserMemberships(data.IsUserMemberships);
        setNotification(data.IsUserMemberships ? true : false);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to load plans. Please try again later.");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const renderPlans = () => {
    const filteredPlans = plans.filter(
      (plan) => plan.duration === selectedDuration
    );

    if (filteredPlans.length === 0) {
      return <p>No {selectedDuration} plans available.</p>;
    }

    return (
      <div className="flex w-full justify-center gap-5 flex-wrap items-stretch">
        {filteredPlans.map((plan, i) => (
          <div
            key={plan._id}
            className={`border relative text-blackColor mt-5 rounded-lg py-5 shadow-md w-[350px] hover:shadow-lg transition bg-white px-4 pt-12 ${
              i === 1 && filteredPlans.length === 3 ? "-translate-y-4" : ""
            } `}
          >
            {i === 1 && (
              <div className=" absolute top-0 text-[1.3rem] font-semibold left-0 w-full text-center py-2 bg-primary text-white rounded-md -translate-y-1/3">
                {" "}
                Most Popular{" "}
              </div>
            )}
            <h3 className="font-semibold text-[2.75rem] mb-3 text-center">
              {plan.name}
            </h3>
            <p className="text-[1.2rem] overflow-hidden text-blackColor text-center">
              {plan.description}
            </p>
            <p className="text-[3rem] text-primary font-bold mt-2 text-center">
              ${plan.price}
            </p>
            <p className="text-center -mt-3 text-primary">
              {" "}
              ${plan.price}/per{" "}
              {selectedDuration === "month" ? "month" : "year"}{" "}
            </p>
            <Link
              target="_blank"
              className="bg-primary text-whiteColor min-w-[120px] py-3 my-5 block mx-auto w-[60%] text-center font-bold rounded-lg text-[1.2rem] cursor-pointer"
              to={`${
                user
                  ? `${plan.link}?prefilled_email=${user?.email}&userId=${user?._id}`
                  : "/login"
              }`}
            >
              {" "}
              Chose Plan{" "}
            </Link>

            <ul className="mt-2 text-[1.1rem] list-none list-inside text-gray-800 border-t-[0.5px] border-gray-700 pt-5 border-solid">
              {plan.benefits.map((benefit, index) => (
                <li className="mb-3" key={index}>
                  {" "}
                  <span className="text-green-500 mr-2">✔</span> {benefit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <p>Loading plans...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 w-full relative mx-auto pt-[100px] bg-secondary min-h-[100dvh] overflow-y-auto">
      {notification && (
        <div className=" absolute top-0 left-0 w-dvw h-dvh flex justify-center items-center z-10 bg-[#00000062]">
          {" "}
          <div className="w-full max-w-[500px]  py-4 px-5 rounded-lg  bg-whiteColor shadow-md">
            <p className="text-center text-[1.5rem]">
              You already have a {IsUserMemberships?.membershipId?.name}{" "}
              membership for {IsUserMemberships?.membershipId?.duration}.
              Subscribing to a new plan will cancel your current one.
            </p>
            <button
              onClick={() => setNotification(false)}
              className="bg-primary text-whiteColor text-[1.3rem] font-bold cursor-pointer block mx-auto my-5 px-5 py-2 rounded-lg"
            >
              {" "}
              I Accept{" "}
            </button>
          </div>
        </div>
      )}
      <h2 className="text-[3rem] font-semibold capitalize text-black text-center mb-2">
        Pick your perfect plan
      </h2>

      <div className="flex justify-center mb-10">
        <button
          onClick={() => setSelectedDuration("month")}
          className={`px-4 py-2 mr-2 ${
            selectedDuration === "month"
              ? "bg-black text-white"
              : "bg-white text-blackColor"
          } rounded-lg transition`}
        >
          Monthly
        </button>
        <button
          onClick={() => setSelectedDuration("year")}
          className={`px-4 py-2 ${
            selectedDuration === "year"
              ? "bg-black text-white"
              : "bg-white text-blackColor"
          } rounded-lg transition`}
        >
          Yearly
        </button>
      </div>

      {renderPlans()}
    </div>
  );
};

export default Plans;
