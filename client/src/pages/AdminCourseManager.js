import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaSearch } from "react-icons/fa";
import { useMessageData } from "../context/UserContext";
import { MdOutlineCancel } from "react-icons/md";

const AdminCourseManager = () => {
  const { setErr, setMessage, setIcon, setShow } = useMessageData();
  const ShowMessage = (err, message, icon) => {
    setErr(err);
    setMessage(message);
    setIcon(icon);
    setShow(true);
    setTimeout(() => setShow(false), 1200);
  };
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [courseTitle, setCourseTitle] = useState(null);
  const [videoTitle, setVideoTitle] = useState(null);
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/courses",
          {
            params: {
              title: courseTitle,
            },
          }
        );
        setCourses(data.courses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
    const ind = courses.find((course) => {
      return course?._id === selectedCourse?._id;
    });
    if (!ind) {
      setSelectedCourse(null);
    }
  }, [courseTitle]);

  useEffect(() => {
    console.log("Fetch Video");
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          "https://bsesa-ksem.vercel.app/videos",
          {
            params: {
              title: videoTitle,
            },
            withCredentials: true,
          }
        );
        setAllVideos(data.videos);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };
    fetchVideos();
    const ind = availableVideos?.find((video) => {
      return video?._id === selectedVideo?._id;
    });
    if (!ind) {
      setSelectedVideo(null);
    }
  }, [videoTitle]);

  // Add a new video to the selected course
  const addVideo = async () => {
    console.log("Adding Video To course : ", selectedVideo);
    if (!selectedCourse || !selectedVideo) return;
    try {
      const { data } = await axios.put(
        `https://bsesa-ksem.vercel.app/course/add_video/${selectedCourse._id}/`,
        { videoId: selectedVideo?._id },
        {
          withCredentials: true,
        }
      );
      setSelectedCourse(data.course);
      setSelectedVideo(null);
      ShowMessage(false, "Video Added successfully", <FaCheck />);
    } catch (error) {
      console.error("Failed to add video:", error);
      ShowMessage(true, "Fail To Video", <MdOutlineCancel />);
    }
  };

  // Delete a video from the selected course
  const deleteVideo = async (videoId) => {
    if (!selectedCourse) return;
    try {
      const { data } = await axios.delete(
        `https://bsesa-ksem.vercel.app/course/delete_video/${selectedCourse._id}/`,
        {
          params: {
            videoId,
          },
          withCredentials: true,
        }
      );
      ShowMessage(false, "Video deleted From Course successfully", <FaCheck />);
      setSelectedCourse({
        ...selectedCourse,
        videos: selectedCourse.videos.filter(
          (video) => video?.video?._id !== videoId
        ),
      });
    } catch (error) {
      ShowMessage(
        true,
        "Fail To delete Video from Course ",
        <MdOutlineCancel />
      );
      console.error("Failed to delete video:", error);
    }
  };

  // Get videos not in the selected course
  const getAvailableVideos = () => {
    if (!selectedCourse) return allVideos;
    const courseVideoIds = selectedCourse.videos.map((v) => v?.video?._id);
    return allVideos.filter((video) => !courseVideoIds.includes(video._id));
  };

  const availableVideos = getAvailableVideos();
  console.log("availableVideos : ", availableVideos);

  return (
    <div className="p-6 bg-gray-100 h-full w-full overflow-y-auto">
      <div className="mb-6">
        <div className="w-full justify-between items-center flex mb-2">
          <h2 className="text-xl font-semibold">Courses</h2>
          <div className="flex justify-center gap-2 items-center bg-whiteColor px-2 py-1 border border-gray-600 border-solid rounded-md">
            <input
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="border-blackColor focus:outline-none"
              type="text"
              placeholder="Search..."
            />
            <FaSearch />
          </div>
        </div>
        <ul className="bg-white p-4 rounded shadow">
          {courses.map((course) => (
            <li
              key={course._id}
              className={`p-2 rounded mb-2 cursor-pointer ${
                selectedCourse?._id === course._id
                  ? "bg-blue-200"
                  : "bg-gray-100"
              }`}
              onClick={() => setSelectedCourse(course)}
            >
              {course.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Selected Course Details */}
      {selectedCourse && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Managing Course: {selectedCourse.title}
          </h2>

          {/* Video List */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Videos</h3>
            <ul className="bg-white p-4 rounded shadow">
              {selectedCourse.videos.map((video) => (
                <li
                  key={video?.video?._id}
                  className="flex items-center p-2 border-b last:border-none"
                >
                  <img
                    src={video?.video?.thumbnail}
                    alt={video?.video?.title}
                    className="w-16 h-16 rounded mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{video?.video?.title}</h4>
                  </div>
                  <button
                    onClick={() => deleteVideo(video?.video?._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Add New Video */}
          <div className="mt-4">
            <div className="w-full justify-between items-center flex mb-2">
              <h2 className="text-xl font-semibold">Add Video</h2>
              <div className="flex justify-center gap-2 items-center bg-whiteColor px-2 py-1 border border-gray-600 border-solid rounded-md">
                <input
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="border-blackColor focus:outline-none"
                  type="text"
                  placeholder="Search..."
                />
                <FaSearch />
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              {availableVideos.length > 0 ? (
                availableVideos.map((video) => (
                  <div
                    key={video._id}
                    className={`flex items-center p-2 border-b last:border-none cursor-pointer ${
                      selectedVideo?._id === video._id ? "bg-blue-200" : ""
                    }`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <img
                      src={video?.thumbnail}
                      alt={video?.title}
                      className="w-16 h-16 rounded mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{video.title}</h4>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No available videos to add.</p>
              )}
            </div>
            <button
              onClick={addVideo}
              disabled={!selectedVideo}
              className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded ${
                !selectedVideo ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Add Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourseManager;
