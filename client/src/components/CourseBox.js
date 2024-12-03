// import React from "react";
// import { FaVideo } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import StarRating from "./StarRating";

// function CourseBox({
//   course,
//   color = "white",
//   desc = true,
//   isPurchased = false,
// }) {
//   return (
//     <div
//       className={`flex-1 w-[290px] h-[420px] ShadowCLass pb-3 rounded-lg overflow-hidden ${
//         color === "white"
//           ? "bg-blackColor text-whiteColor"
//           : "bg-whiteColor text-blackColor"
//       }`}
//     >
//       <div className="w-full h-[170px] rounded-md">
//         <img className="w-full h-full" src={course.thumbnail} />
//       </div>
//       <div className="w-full h-[calc(100%-265px)] max-h-[250px] px-2 py-2 overflow-y-hidden">
//         {/* <h1 className="text-[1.75rem] mb-3 capitalize"> {course.title} </h1> */}
//         <h1 className="text-[1.2rem] font-semibold mb-3 capitalize whitespace-nowrap overflow-hidden text-ellipsis">
//           {" "}
//           {course.title}{" "}
//         </h1>

//         {desc && (
//           <p className="mb-2 line-clamp-3 font-light"> {course.description} </p>
//         )}
//       </div>
//       <StarRating rating={5} />
//       <Link
//         to={"/course/" + course?._id}
//         className="block font-semibold text-center mx-auto rounded-md text-[1.2rem] bg-primary text-white cursor-pointer w-4/5  py-2 hover:bg-primaryHover duration-200"
//       >
//         {" "}
//         Go To Course
//       </Link>
//     </div>
//   );
// }

// export default CourseBox;

import React from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaCheck, FaDollarSign, FaVideo } from "react-icons/fa";

const CourseBox = ({ course, desc }) => {
  const {
    _id,
    title,
    thumbnail,
    description,
    videos = [],
    price,
    categorys = [],
    completed = false,
  } = course;

  const videoCount = videos.length;
  const formattedPrice = price.toLocaleString();
  return (
    <div
      className={`
        relative flex flex-col w-[300px] rounded-2xl
        bg-whiteColor
        transition-all overflow-hidden duration-300 hover:-translate-y-1 hover:shadow-2xl
       
       ${!desc ? "h-[430px]" : "h-[360px] "}`}
    >
      {/* Course Thumbnail */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {completed && (
          <div
            className="absolute top-3 right-3 flex items-center 
            bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium"
          >
            <FaCheck className="w-4 h-4 mr-1" />
            Completed
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 line-clamp-1 capitalize">
          {title}
        </h3>

        {!desc && (
          <p className={`text-sm mb-4 h-[60px] line-clamp-3`}>{description}</p>
        )}

        {/* Course Metadata */}
        <div className="flex justify-between text-sm mb-4 text-gray-500">
          <div className="flex items-center">
            <FaVideo className="w-5 h-5 mr-2 text-primary" />
            <span>{videoCount} Videos</span>
          </div>
          <div className="flex items-center">
            <FaDollarSign className="w-5 h-5 mr-0 text-green-500" />
            <span>{formattedPrice}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/course/${_id}`}
          className={`
            w-full py-3 rounded-lg text-center font-semibold 
            transition-all duration-300 mt-auto text-white bg-primary hover:bg-primaryHover
          `}
        >
          Explore Course
        </Link>
      </div>
    </div>
  );
};

export default CourseBox;
