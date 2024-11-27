import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

function CourseBox({
  course,
  color = "white",
  desc = true,
  isPurchased = false,
}) {
  return (
    <div
      className={`flex-1 max-w-[290px] h-[420px] ShadowCLass pb-3 rounded-lg overflow-hidden ${
        color === "white"
          ? "bg-blackColor text-whiteColor"
          : "bg-whiteColor text-blackColor"
      }`}
    >
      <div className="w-full h-[170px] rounded-md">
        <img className="w-full h-full" src={course.thumbnail} />
      </div>
      <div className="w-full h-[calc(100%-270px)] max-h-[250px] px-2 py-2 overflow-y-hidden">
        {/* <h1 className="text-[1.75rem] mb-3 capitalize"> {course.title} </h1> */}
        <h1 className="text-[1.6rem] font-semibold mb-3 capitalize whitespace-nowrap overflow-hidden text-ellipsis">
          {" "}
          {course.title}{" "}
        </h1>

        {desc && (
          <p className="mb-2 line-clamp-3 font-light"> {course.description} </p>
        )}
      </div>
      <StarRating rating={5} />
      <Link
        to={"/course/" + course?._id}
        className="block font-semibold text-center mx-auto rounded-md text-[1.2rem] bg-primary text-whiteColor cursor-pointer w-4/5  py-2"
      >
        {" "}
        {isPurchased ? "Watch" : `$${course?.price}`}
      </Link>
    </div>
  );
}

export default CourseBox;
