// import React from "react";
// import CourseBox from "./CourseBox";

// function PopulairCourses({ courses, headerText }) {
//   return (
//     <div className=" rounded-xl container h-fit bg-secondary text-blackColor py-5 pb-10">
//       <h1 className="text-[2.8rem] font-bold mb-8 text-center">
//         {" "}
//         {headerText}{" "}
//       </h1>
//       <div className="w-full px-2 flex justify-center  items-stretch gap-5 flex-wrap">
//         {courses.map((course) => (
//           <CourseBox key={course._id} course={course} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PopulairCourses;

import React, { useEffect, useState } from "react";
import CourseBox from "./CourseBox";

function PopulairCourses({ courses, headerText }) {
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    if (courses.length === 0) return; // Prevent running if no courses

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleIndexes((prev) => [...new Set([...prev, index])]);
            }, index * 150); // Stagger by index
          }
        });
      },
      { threshold: 0.6 } // Adjust threshold as needed
    );

    // Clear previous visible indexes on re-render
    setVisibleIndexes([]);

    // Select and observe elements
    const elements = document.querySelectorAll(
      `.course-item[data-header="${headerText}"]`
    );
    elements.forEach((el) => observer.observe(el));

    // Cleanup on unmount or when courses change
    return () => observer.disconnect();
  }, [courses, headerText]); // Depend on `courses` and `headerText`

  return (
    <div className="rounded-xl container h-fit bg-secondary text-blackColor py-5 pb-10 overflow-y-hidden">
      <h1 className="text-[2.8rem] font-bold mb-8 text-center">{headerText}</h1>
      <div className="w-full px-8 flex justify-center items-stretch gap-5 flex-wrap">
        {courses.map((course, index) => (
          <div
            key={`${headerText}-${course._id}-${index}`}
            data-index={index}
            data-header={headerText}
            className={`course-item transform flex-1 min-w-[250px] max-w-[300px] transition-all duration-1000 ease-out ${
              visibleIndexes.includes(index)
                ? "translate-y-0 opacity-100"
                : "translate-y-40 opacity-0"
            }`}
          >
            <CourseBox course={course} color="black" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopulairCourses;
