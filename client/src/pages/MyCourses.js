import axios from "axios";
import React, { useState, useEffect } from "react";
import CourseBox from "../components/CourseBox";

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
    <div className="w-full h-full p-5 overflow-y-auto bg-white flex justify-start items-start">
      {courses.map((course) => (
        <CourseBox
          course={course?.course}
          desc={false}
          isPurchased={true}
          color="black"
        />
      ))}
    </div>
  );
}

export default MyCourses;
