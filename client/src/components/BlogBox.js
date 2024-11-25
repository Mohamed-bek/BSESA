import React from "react";
import { Link } from "react-router-dom";

function BlogBox({ blog, color = "white" }) {
  return (
    <div
      className={`w-[calc(33%-25px)] min-w-[350px] relative max-w-[400px] md:min-w-[400px] md:max-w-[500px] ShadowCLass pb-3 rounded-lg overflow-hidden ${
        color === "white"
          ? "bg-blackColor text-whiteColor"
          : "bg-whiteColor text-blackColor"
      }`}
    >
      <div className="w-full h-[200px] rounded-md">
        <img className="w-full h-[200px]" src={blog.thumbnailUrl} />
      </div>
      <div className="w-full px-2 pt-2 h-[280px]">
        <h1 className="text-[1.4rem] mb-3 font-medium capitalize">
          {blog.title}
        </h1>
        <p className="font-light h-[120px] pb-1 overflow-hidden">
          {blog.content}
        </p>
        <Link
          to={"/blog/" + blog._id}
          className="block text-center hover:bg-primary hover:text-white duration-300 mx-auto absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-secondary text-blackColor cursor-pointer w-4/5  py-2"
        >
          {" "}
          Read Blog
        </Link>
      </div>
    </div>
  );
}

export default BlogBox;
