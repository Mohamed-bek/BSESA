import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../context/UserContext";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";

export function timeAgo(createdAt) {
  const now = new Date();
  const pastDate = new Date(createdAt);
  const diffInMs = now - pastDate;

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
  const [course, setCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [comment, setComment] = useState(null);

  // const AddComment = async () => {
  //   if (!comment || comment === "") return;
  //   try {
  //     const { data } = await axios.put(
  //       process.env.REACT_APP_API_URL + "/blog/comment/" + id,
  //       {
  //         content: comment,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     blog.comments.push(data.comment);
  //     setComment("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const likeBlog = async () => {
  //   try {
  //     const { data } = await axios.put(
  //       process.env.REACT_APP_API_URL + "/blog/like/" + id,
  //       {},
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setCourse(data.course);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getCourse = async () => {
    try {
      const { data } = await axios.get(
        "https://bsesa-ksem.vercel.app/course/" + id,
        {
          withCredentials: true,
        }
      );
      setCourse(data.course);
      setIsPurchased(data.isPurchased);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
    console.log("GetBlog called");
  }, [id]);
  return (
    <div className="w-full h-fit md:min-h-[100dvh] px-3 md:px-10 pt-[120px] pb-10 bg-whiteColor">
      <div className="w-full min-h-[calc(100dvh-160px)] flex flex-wrap justify-center items-stretch ">
        <div className="w-full md:w-[55%] relative h-full">
          <img
            className="w-full max-h-[430px] rounded-xl mb-2"
            src={course?.thumbnail}
          />
          <div className="flex justify-between gap-5">
            <h1 className="text-center md:text-left text-[1.8rem] font-medium pl-1">
              {" "}
              {course?.title}{" "}
            </h1>
          </div>
          <p className="text-[1.1rem] text-center md:text-left leading-7 font-medium px-1 w-11/12">
            {course?.description}
          </p>
          <div className="flex w-fit mx-auto md:ml-0 items-cente my-5 justify-start gap-4">
            {!isPurchased && (
              <Link
                to={user ? "/payment/" + course?._id : "/login"}
                className="bg-primary text-white  hover:bg-secondary hover:text-black duration-300 px-5 py-3 rounded-md block "
              >
                Buy For {course?.price}$
              </Link>
            )}
            <Link
              to={"/courses"}
              className="border border-solid border-primary  text-primary  px-5 py-3 rounded-md block"
            >
              More Courses
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[45%] h-fit md:h-full px-4 ">
          <h2 className="h-[50px] py-2 px-2 text-[1.3rem] border border-solid border-gray-400">
            {" "}
            Videos
          </h2>
          <div className="px-2 h-fit max-h-[700px] md:h-[calc(100%-95px)] overflow-y-auto border-l border-b border-r border-solid border-gray-400">
            {course?.videos.map((video) => (
              <Link
                title={!isPurchased ? "You Have To purchase The Course" : null}
                to={isPurchased ? `/video/${course?._id}/${video._id}` : "#"}
                className={`py-1 flex justify-start items-stretch gap-4 ${
                  isPurchased ? "cursor-pointer" : "cursor-not-allowed"
                } `}
              >
                <div className="w-1/3 relative h-[130px] min-w-[200px] rounded-md overflow-hidden">
                  {!isPurchased && (
                    <div className=" absolute flex justify-center items-center left-0 top-0 w-full h-full bg-[#00000032]">
                      <MdOutlineDoNotDisturbAlt className="text-[2.3rem] font-medium relative text-whiteColor" />
                    </div>
                  )}
                  {isPurchased && (
                    <div
                      style={{ width: `${video?.progress | 0}%` }}
                      className={`absolute left-0 bottom-0 h-1 bg-[red] `}
                    ></div>
                  )}
                  <img src={video?.thumbnail} className="w-full h-full" />
                </div>
                <div className="w-2/3">
                  <div className="w-full flex justify-between items-center pr-2">
                    {" "}
                    <h2 className="text-[1.4rem] lowercase font-medium">
                      {video?.title}
                    </h2>
                    <span className="ml-4 hidden md:block text-[0.8rem] font-bold text-gray-800">
                      {timeAgo(video?.createdAt)}
                    </span>
                  </div>

                  <p className="text-[1.1rem] font-light overflow-hidden">
                    {" "}
                    {video?.description}
                  </p>
                </div>
              </Link>
            ))}
            {(course?.videos?.length === 0 || !course?.videos) && (
              <h1 className="text-[1.8rem] mx-1"> No Videos Available </h1>
            )}
          </div>
          {/* <div className="flex justify-center items-stretch border-l border-b border-r border-solid border-gray-400">
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
          </div> */}
        </div>
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default Blog;
