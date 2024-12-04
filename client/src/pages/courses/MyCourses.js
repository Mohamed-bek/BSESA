import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseBox from "../../components/CourseBox";
import { useUserStore } from "../../context/UserContext";
import { CheckAuthetication } from "../Login";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const GetMyCourses = async () => {
    try {
      const check = await CheckAuthetication();
      if (!check) {
        logout();
        navigate("/login");
        return;
      }
      const { data } = await axios.get(
        "https://bsesa-ksem.vercel.app/my-courses",
        {
          withCredentials: true,
        }
      );
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetMyCourses();
  }, []);
  return (
    <div className="w-full h-full p-5 overflow-y-auto bg-white gap-5 flex justify-start items-stretch">
      {courses.map((course) => (
        <div className="">
          <CourseBox course={course?.course} isPurchased={true} color="black" />
        </div>
      ))}
    </div>
  );
}

export default MyCourses;
