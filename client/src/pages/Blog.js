import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../context/UserContext";
import { FaRegEye } from "react-icons/fa";

function timeAgo(createdAt) {
  const now = new Date();
  const pastDate = new Date(createdAt);
  const diffInMs = now - pastDate; // Difference in milliseconds

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays >= 1) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours >= 1) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes >= 1) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  }
}

function Blog() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState(null);

  const AddComment = async () => {
    if (!comment || comment === "") return;
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL + "/blog/comment/" + id,
        {
          content: comment,
        },
        {
          withCredentials: true,
        }
      );
      blog.comments.push(data.comment);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const likeBlog = async () => {
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL + "/blog/like/" + id,
        {},
        {
          withCredentials: true,
        }
      );
      setBlog(data.blog);
    } catch (error) {
      console.log(error);
    }
  };

  const GetBlog = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/blog/" + id
      );
      setBlog(data.blog);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetBlog();
    console.log("GetBlog called");
  }, [id]);
  return (
    <div className="w-full min-h-[100dvh]  px-10 pt-[120px] pb-10 bg-whiteColor">
      <div className="w-full h-[calc(100dvh-160px)] flex justify-center items-stretch ">
        <div className="w-[55%] relative h-full">
          <div className=" absolute top-2 right-2 z-10 text-[1.35rem] text-center gap-1 p-1 text-white rounded-lg">
            <FaRegEye className=" " />
            <span className="text-[0.9rem] -mt-1 block">
              {" "}
              {blog?.views | 0}{" "}
            </span>
          </div>
          <img
            className="w-full max-h-[430px] rounded-xl mb-2"
            src={blog?.thumbnailUrl}
          />
          <div className="flex justify-between gap-5">
            <h1 className="text-[1.5rem] font-medium pl-1"> {blog?.title} </h1>
            <p
              className={`text-center ${
                blog?.likes?.includes(user?._id)
                  ? "text-[red]"
                  : "text-gray-700"
              }`}
            >
              <HiHeart
                onClick={() => (user ? likeBlog() : navigate("/login"))}
                className={`text-[1.8rem] cursor-pointer `}
              />
              <span className="block text-[0.9rem] -mt-1">
                {" "}
                {blog?.likes?.length | 0}{" "}
              </span>
            </p>
          </div>
          <h2 className="text-[1.25rem] font-bold mb-3 pl-1"> Summary : </h2>
          <p className="text-[1.1rem] leading-7 font-medium px-1 w-11/12">
            {blog?.content}
          </p>
        </div>
        <div className="w-[45%] h-full px-4 ">
          <h2 className="h-[50px] py-2 px-2 text-[1.3rem] border border-solid border-gray-300">
            {" "}
            Comments{" "}
          </h2>
          <div className="px-2 h-[calc(100%-95px)] overflow-y-auto border-l border-b border-r border-solid border-gray-300">
            {blog?.comments.map((comment) => (
              <div className="py-2 flex justify-start items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={comment?.author?.image} className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-[0.8rem] lowercase font-bold">
                    {" "}
                    {comment?.author?.firstName +
                      " " +
                      comment?.author?.lastName}{" "}
                    <span className="ml-4 font-medium text-gray-800">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </h3>

                  <p className="text-[0.95rem] font-medium">
                    {" "}
                    {comment?.content}{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-stretch border-l border-b border-r border-solid border-gray-300">
            <input
              className="w-3/4 bg-transparent focus:outline-none px-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Say Something"
              type={"text"}
            />
            <button
              onClick={() => (user ? AddComment() : navigate("/login"))}
              className="w-1/4 text-center block bg-secondary hover:bg-primary hover:text-white duration-300 text-black font-medium text-[1.2rem] cursor-pointer py-2 "
            >
              {" "}
              Comment{" "}
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Blog;
