import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { HiHeart } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../context/UserContext";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { CheckAuthetication } from "../Login";

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
  const { logout } = useUserStore();
  const likeRef = useRef(null);
  const { user } = useUserStore();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const AddComment = async () => {
    const check = await CheckAuthetication();
    if (!check) {
      logout();
      navigate("/login");
      return;
    }
    if (!user) return;
    if (!comment || comment === "") return;
    const commentId = Date.now().toString();
    blog.comments.push({
      _id: commentId,
      content: comment,
      createdAt: Date.now(),
      author: {
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      },
    });
    try {
      await axios.put(
        process.env.REACT_APP_API_URL + "blog/comment/" + id,
        {
          content: comment,
        },
        {
          withCredentials: true,
        }
      );
      setComment("");
    } catch (error) {
      blog.comments = blog.comments.filter(
        (comment) => comment._id !== commentId
      );
      console.log(error);
    }
  };

  const likeBlog = async () => {
    const check = await CheckAuthetication();
    if (!check) {
      logout();
      navigate("/login");
      return;
    }
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL + "blog/like/" + id,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      setLikes(!isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
      setLikes(likes - 1);
      console.log(error);
    }
  };

  const GetBlog = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "blog/" + id
      );
      setBlog(data.blog);
      setIsLiked(data.blog?.likes?.includes(user?._id));
      setLikes(data.blog?.likes?.length | 0);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetBlog();
    console.log("Success");
  }, [id]);
  return (
    <div className="w-full min-h-[100dvh] px-3 md:px-10 pt-[110px] pb-10 bg-whiteColor">
      <div className="w-full min-h-[calc(100dvh-160px)] flex justify-center items-stretch flex-wrap">
        <div className="w-full md:w-[55%] min-w-[350px] relative h-full">
          <div className=" absolute top-2 left-2 md:right-2 z-10 w-fit  text-[1.5rem] text-center gap-1 p-1 text-white rounded-lg">
            <FaRegEye className=" mx-auto block" />
            <span className="text-[0.9rem] -mt-1 block">
              {" "}
              {blog?.views | 0}{" "}
            </span>
          </div>
          <div className="relative">
            <div
              className={`absolute right-2 top-1 md:hidden text-center w-fit ${
                isLiked ? "text-[red]" : "text-gray-700"
              }`}
            >
              <HiHeart
                onClick={(e) => {
                  user ? likeBlog() : navigate("/login");
                }}
                className={`  text-[1.8rem] cursor-pointer`}
              />
              <span className="block mx-auto -mt-1 text-[1.1rem] font-semibold">
                {" "}
                {likes}{" "}
              </span>
            </div>
            <img
              className="w-full max-h-[430px] rounded-xl mb-2"
              src={blog?.thumbnailUrl}
            />
          </div>
          <div className="flex justify-between gap-5">
            <h1 className="text-[1.5rem] text-center md:text-left font-medium pl-1">
              {" "}
              {blog?.title}{" "}
            </h1>
            <p
              className={`hidden md:block text-center ${
                isLiked ? "text-[red]" : "text-gray-700"
              }`}
            >
              <HiHeart
                onClick={() => (user ? likeBlog() : navigate("/login"))}
                className={`text-[1.8rem] cursor-pointer `}
              />
              <span className="block text-[0.9rem] -mt-1"> {likes} </span>
            </p>
          </div>
          <h2 className="text-[1.25rem] font-bold mt-5 text-center md:text-left mb-3 pl-1">
            {" "}
            Summary{" "}
          </h2>
          <p className="text-[1.2rem] mb-5 md:mb-0 leading-7 font-medium px-1 w-11/12 md:text-left text-center fo">
            {blog?.content}
          </p>
        </div>
        <div className="w-full md:w-[45%] h-full px-4 ">
          <h2 className="h-[50px] py-2 px-2 text-[1.3rem] border border-solid border-gray-300">
            {" "}
            Comments{" "}
          </h2>
          <div className="px-2 max-h-[500px] md:max-h-[100%]  h-[calc(100%-95px)] overflow-y-auto border-l border-b border-r border-solid border-gray-300">
            {blog?.comments.map((comment) => (
              <div
                key={comment?._id}
                className="py-2 flex justify-start items-center gap-4"
              >
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
