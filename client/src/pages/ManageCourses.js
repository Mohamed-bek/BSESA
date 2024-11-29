import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [NbOfPages, setNbOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const getCoursesForAdmin = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/admin/courses",
          {
            withCredentials: true,
          }
        );
        setCourses(data.courses);
      } catch (error) {
        console.log(error);
      }
    };
    getCoursesForAdmin();
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto font-semibold text-[1.2rem]">
      <header className="flex items-center text-white justify-between p-4 bg-primary border-b border-gray-200">
        <div className="flex-1 min-w-[250px]">Title</div>
        <div className="w-[120px] text-center">Price</div>
        <div className="w-[120px]  text-center">Purchasers</div>
        <div className="w-[180px]  text-center">Created</div>
        <div className="w-[120px] text-center">Manage</div>
      </header>
      <div className="h-[calc(100%-106px)] overflow-y-auto">
        {courses.map((course) => (
          <div
            key={course._id}
            className="flex items-center justify-between p-4 border-b font-normal text-[1.1rem] border-secondary hover:bg-secondary"
          >
            <div className="flex-1 min-w-[250px]">{course.title}</div>
            <div className="w-[120px] text-center ">{course.price} USD</div>
            <div className="w-[120px] text-center ">{course.purchasers}</div>
            <div className="w-[180px] text-center ">
              {new Date(course.createdAt).toLocaleDateString()}
            </div>
            <div className="w-[120px] text-center">
              <button className="text-blue-500">
                <FaEdit />
              </button>
              <button className="text-red-500 ml-2">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-1">
        {[...Array(NbOfPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={` w-[35px] text-[1.2rem] font-medium cursor-pointer py-1 rounded-lg ${
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
