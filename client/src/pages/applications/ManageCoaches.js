import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CoachProfileCard from "../../components/CoachProfileCard";

const ManageCoaches = () => {
  const [isLoading, setisLoading] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [coachCard, setcoachCard] = useState(null);
  const [isVisible, setisVisible] = useState(false);
  const deleteRef = useRef(null);
  const [statusCoach, setstatusCoach] = useState(null);
  const [NbOfPages, setNbOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const getCoachces = async () => {
      setisLoading(true);
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/coaches/" + id,
          {
            params: {
              page: 1,
              name: searchQuery,
              status: statusCoach,
            },
            withCredentials: true,
          }
        );
        console.log("Data :", data);
        setCoaches(data.coaches);
        setNbOfPages(data.NbOfPages);
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };
    getCoachces();
  }, [id, searchQuery, statusCoach]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const UpdateStatus = async (status, id) => {
    try {
      await axios.put(
        "https://bsesa-ksem.vercel.app/coach/application/" + id,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );

      setCoaches((prevCoaches) =>
        prevCoaches.map((coach) =>
          coach._id === id ? { ...coach, status } : coach
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full overflow-y-auto relative cursor-pointer">
      {isVisible && (
        <CoachProfileCard
          setisVisible={setisVisible}
          isVisible={isVisible}
          coach={coachCard}
        />
      )}
      <div
        ref={deleteRef}
        className="absolute duration-300 top-0 left-0 w-full h-full flex items-center justify-center bg-blackColor/5 z-[999999] scale-0"
      >
        <form className="p-8 bg-white rounded-lg">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="Enter your password"
            className="bg-secondary border-none rounded-md p-2 focus:outline-none mb-6"
          />
          <div className="flex justify-center gap-2 items-center">
            <button className="bg-red-500 text-whiteColor px-4 py-2 cursor-pointer font-semibold block rounded-md">
              Delete
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                // setId(null);
                deleteRef.current.classList.add("scale-0");
              }}
              className="bg-blue-500 text-whiteColor px-4 py-2 cursor-pointer font-semibold block rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="w-full bg-whiteColor flex items-center justify-between px-5 py-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-[260px] p-2 focus:outline-none bg-secondary border border-primary rounded-lg"
          placeholder="Search by title"
        />
        <select onChange={(e) => setstatusCoach(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="approved">Approved</option>
        </select>
      </div>
      <header className="flex items-center text-white justify-between p-4 bg-primary border-b border-gray-200">
        <div className="flex-1 min-w-[250px]">Name</div>
        <div className="w-[250px] text-center">Email</div>
        <div className="w-[200px] text-center">Phone</div>
        <div className="w-[120px] text-center">Level</div>
        <div className="w-[200px] text-center"> Status </div>
      </header>
      <div className="h-[calc(100%-115px)] relative">
        {isLoading ? (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 z-[999999]">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {" "}
            <div className="h-[calc(100%-45px)] overflow-y-auto">
              {coaches.map((coache) => (
                <div
                  key={coache._id}
                  className="flex items-center justify-between p-4 border-b font-normal text-[1.1rem] border-secondary hover:bg-secondary"
                >
                  <div className="flex-1 min-w-[250px] flex justify-start items-center gap-1">
                    {" "}
                    <div
                      onClick={() => {
                        setcoachCard(coache);
                        setisVisible(true);
                      }}
                      className="w-14 cursor-pointer rounded-full overflow-hidden"
                    >
                      <img className="w-full" src={coache.image} />{" "}
                    </div>
                    <span> {coache.name}</span>
                  </div>
                  <div className="w-[250px] text-center">
                    {coache.contactEmail}
                  </div>
                  <div className="w-[200px] text-center">
                    {coache.contactPhone}
                  </div>
                  <div className="w-[120px] text-center">
                    {coache.coachingLevel}
                  </div>
                  <div className="w-[200px] text-center text-white  flex items-center justify-center gap-2">
                    {coache.status === "pending" ? (
                      <>
                        {" "}
                        <button
                          onClick={() => UpdateStatus("approved", coache._id)}
                          className="bg-green-600 hover:bg-green-700 duration-100 px-3 py-2 cursor-pointer rounded-md"
                        >
                          {" "}
                          Accept
                        </button>
                        <button
                          onClick={() => UpdateStatus("rejected", coache._id)}
                          className="bg-red-500 hover:bg-red-600 duration-100  px-3 py-2 cursor-pointer rounded-md"
                        >
                          {" "}
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-blackColor">{coache.status}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-1">
              {[...Array(NbOfPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-[35px] text-[1.2rem] font-medium cursor-pointer py-1 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageCoaches;
