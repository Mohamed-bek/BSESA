import axios from "axios";
import React, { useState, useEffect } from "react";
import CourseBox from "../../components/CourseBox";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const GetMyCourses = async () => {
    try {
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
