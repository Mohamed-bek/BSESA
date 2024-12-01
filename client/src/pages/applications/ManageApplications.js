import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { FaCheck, FaEdit, FaExclamation, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMessageData } from "../../context/UserContext";

const ManageApplications = () => {
  const { setShow, setMessageData } = useMessageData();
  const [applications, setApplications] = useState([]);
  const [NbOfPages, setNbOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [password, setPassword] = useState("");
  const deleteRef = useRef(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const getApplicationsForAdmin = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/applications",
          {
            params: {
              name: searchQuery,
              page: currentPage,
              limit: 10,
            },
          }
        );
        console.log("Data returned: ", data);
        setApplications(data.applications);
        setNbOfPages(data.NbOfPages);
      } catch (error) {
        console.log(error);
      }
    };

    getApplicationsForAdmin();
  }, [searchQuery, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteApplication = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `https://bsesa-ksem.vercel.app/admin/application/${id}`,
        {
          data: {
            password,
          },
          withCredentials: true,
        }
      );
      deleteRef.current.classList.add("scale-0");
      const newApplications = applications.filter((a) => a._id !== id);
      setApplications(newApplications);
      setId(null);
      setMessageData({
        message: "Application deleted successfully",
        icon: <FaCheck />,
        err: false,
        show: true,
      });
      setTimeout(() => setShow(false), 1200);
    } catch (error) {
      console.log(error);
      setMessageData({
        message: "Application deletion failed",
        icon: <FaExclamation />,
        err: true,
        show: true,
      });
      setTimeout(() => setShow(false), 1200);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto relative">
      <div
        ref={deleteRef}
        className="absolute duration-300 top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 z-[999999] scale-0"
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
            <button
              onClick={(e) => deleteApplication(e)}
              className="bg-red-500 text-whiteColor px-4 py-2 cursor-pointer font-semibold block rounded-md"
            >
              Delete
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setId(null);
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
          placeholder="Search by name"
        />
      </div>
      <header className="flex items-center text-white justify-between p-4 bg-primary border-b border-gray-200">
        <div className="flex-1 min-w-[250px]">Name</div>
        <div className="w-[120px] text-center">Type</div>
        <div className="w-[120px] text-center">Deadline</div>
        <div className="w-[120px] text-center">Subscribers</div>
        <div className="w-[120px] text-center">Level</div>
        <div className="w-[120px] text-center">Created</div>
        <div className="w-[120px] text-center">Manage</div>
      </header>

      <div className="h-[calc(100%-160px)] overflow-y-auto">
        {applications.map((application) => (
          <div
            key={application._id}
            className="flex items-center justify-between p-4 border-b font-normal text-[1.1rem] border-secondary hover:bg-secondary"
          >
            <div className="flex-1 min-w-[250px]">{application.name}</div>
            <div className="w-[120px] text-center">
              {application.applicantType === "CoachApplication"
                ? "Coach"
                : "Club"}
            </div>
            <div className="w-[120px] text-center">
              {new Date(application.deadline).toLocaleDateString()}
            </div>
            <div className="w-[120px] text-center">
              {application.subscribersIds?.length}
            </div>
            <div className="w-[120px] text-center">{application.level}</div>
            <div className="w-[120px] text-center">
              {new Date(application.createdAt).toLocaleDateString()}
            </div>
            <div className="w-[120px] text-center flex items-center justify-center gap-2">
              <Link
                title="edit"
                to={`/dashboard/manage-applications/update-application/${application._id}`}
                className="text-blue-500"
              >
                <FaEdit />
              </Link>
              <button
                title="delete"
                onClick={() => {
                  setId(application._id);
                  deleteRef.current.classList.remove("scale-0");
                }}
                className="text-red-500 ml-2"
              >
                <FaTrash />
              </button>
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
              currentPage === index + 1 ? "bg-primary text-white" : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageApplications;
