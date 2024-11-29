import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [NbOfPages, setNbOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all"); // time filter state

  // Function to calculate the date based on the selected time filter

  useEffect(() => {
    const getCoursesForAdmin = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/admin/courses",
          {
            params: {
              title: searchQuery,
              time: timeFilter,
              page: currentPage,
              limit: 10,
            },
            withCredentials: true,
          }
        );
        setCourses(data.courses);
        setNbOfPages(data.NbOfPages);
      } catch (error) {
        console.log(error);
      }
    };

    getCoursesForAdmin();
  }, [searchQuery, timeFilter, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full bg-whiteColor flex items-center justify-between px-5 py-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-[260px] p-2 focus:outline-none bg-secondary  border border-primary rounded-lg"
          placeholder="Search by title"
        />
        <select
          id="timeFilter"
          value={timeFilter}
          onChange={handleTimeFilterChange}
          className="p-2 border border-primary cursor-pointer rounded-lg focus:outline-none"
        >
          <option value="all">All Time</option>
          <option value="last_day">Last Day</option>
          <option value="last_week">Last Week</option>
          <option value="last_month">Last Month</option>
          <option value="last_year">Last Year</option>
        </select>
      </div>
      <header className="flex items-center text-white justify-between p-4 bg-primary border-b border-gray-200">
        <div className="flex-1 min-w-[250px]">Title</div>
        <div className="w-[120px] text-center">Price</div>
        <div className="w-[120px] text-center">Purchasers</div>
        <div className="w-[180px] text-center">Created</div>
        <div className="w-[120px] text-center">Manage</div>
      </header>

      <div className="h-[calc(100%-160px)] overflow-y-auto">
        {courses.map((course) => (
          <div
            key={course._id}
            className="flex items-center justify-between p-4 border-b font-normal text-[1.1rem] border-secondary hover:bg-secondary"
          >
            <div className="flex-1 min-w-[250px]">{course.title}</div>
            <div className="w-[120px] text-center ">{course.price} USD</div>
            <div className="w-[120px] text-center ">{course.NbOforders}</div>
            <div className="w-[180px] text-center ">
              {new Date(course.createdAt).toLocaleDateString()}
            </div>
            <div className="w-[120px] text-center">
              <Link
                to={"/dashboard/manage-courses/update-course/" + course._id}
                className="text-blue-500"
              >
                <FaEdit />
              </Link>
              <button className="text-red-500 ml-2">
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

export default ManageCourses;
