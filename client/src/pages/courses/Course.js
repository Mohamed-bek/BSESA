import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  HiPlay,
  HiClock,
  HiBookOpen,
  HiAcademicCap,
  HiShoppingCart,
  HiCheckCircle,
} from "react-icons/hi2";
import { MdLock } from "react-icons/md";
import { useUserStore } from "../../context/UserContext";
import { CheckAuthetication } from "../Login";

function CourseDetail() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCourse = async () => {
    await CheckAuthetication();
    try {
      setLoading(true);
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + `course/${id}`,
        { withCredentials: true }
      );
      setCourse(data.course);
      console.log("Data COurse : ", data.course);
      setIsPurchased(data.isPurchased);
    } catch (error) {
      console.error("Failed to fetch course:", error);
      navigate("/courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  const renderVideoList = () => {
    if (loading) {
      return (
        <div className="animate-pulse space-y-4 p-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex space-x-4">
              <div className="bg-secondary h-24 w-32 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary rounded w-3/4"></div>
                <div className="h-4 bg-secondary rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (!course?.videos?.length) {
      return (
        <div className="text-center py-10 text-blackColor">
          <HiBookOpen className="mx-auto text-4xl mb-4" />
          <p className="text-xl">No videos available for this course</p>
        </div>
      );
    }

    return (
      <div className="space-y-4 p-4">
        {course.videos.map((video, index) => {
          return (
            <div
              key={video?._id}
              className={`flex items-center p-4 rounded-lg transition-all duration-300 
                ${
                  isPurchased
                    ? "hover:bg-primaryTra cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
            >
              <div className="relative w-1/4 mr-4">
                <img
                  src={video?.thumbnail}
                  alt={video?.title}
                  className="w-full h-24 object-cover rounded-md"
                />
                {!isPurchased && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <MdLock className="text-white text-2xl" />
                  </div>
                )}
                {isPurchased && video?.progress > 0 && (
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-primary"
                    style={{ width: `${video?.progress}%` }}
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{video?.title}</h3>
                  <span className="text-sm text-blackColor">
                    {timeAgo(video?.createdAt)}
                  </span>
                </div>
                <p className="text-blackColor line-clamp-2">
                  {video?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 z-[999999]">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[90%] mx-auto px-5 md:px-0 pt-[100px] pb-[20px]">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Course Details */}
        <div>
          <img
            src={course?.thumbnail}
            alt={course?.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg mb-6"
          />

          <h1 className="text-3xl font-bold mb-4">{course?.title}</h1>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <HiAcademicCap className="text-primary" />
              <span>{course?.videos?.length || 0} Videos</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiClock className="text-primary" />
              <span>Updated {timeAgo(course?.updatedAt)}</span>
            </div>
          </div>

          <p className="text-blackColor mb-6">{course?.description}</p>

          <div className="flex space-x-4">
            {!isPurchased && (
              <Link
                to={user ? `/payment/${course?._id}` : "/login"}
                className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primaryHover transition-colors"
              >
                <HiShoppingCart className="mr-2" />
                Buy for ${course?.price}
              </Link>
            )}
            {isPurchased && (
              <Link
                to={`/video/${course?._id}/${course?.videos[0]?.video?._id}`}
                className="flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primaryHover transition-colors"
              >
                <HiPlay className="mr-2" />
                Start Learning
              </Link>
            )}
            <Link
              to="/courses"
              className="flex items-center border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primaryTra transition-colors"
            >
              Explore More Courses
            </Link>
          </div>
        </div>

        {/* Video List */}
        <div className="bg-white max-h-[680px] rounded-xl shadow-lg">
          <div className="border-b h-[61px] p-4">
            <h2 className="text-xl font-semibold flex items-center">
              <HiCheckCircle className="mr-2 text-primary" />
              Course Content
            </h2>
          </div>
          <div className="w-full h-[calc(100%-61px)] overflow-y-auto">
            {renderVideoList()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Existing timeAgo function remains the same as in the original code
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

export default CourseDetail;
