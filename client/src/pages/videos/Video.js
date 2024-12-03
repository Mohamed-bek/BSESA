// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { timeAgo } from "../courses/Course";
// import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
// const VideoPlayer = () => {
//   const { courseId, videoId } = useParams();
//   const [video, setVideo] = useState(null);
//   const [course, setCourse] = useState(null);
//   const navigate = useNavigate();
//   const [progress, setProgress] = useState(0);
//   const [lastSentProgress, setLastSentProgress] = useState(0);
//   const [isPurchased, setIsPurchased] = useState(false);

//   const getVideo = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://bsesa-ksem.vercel.app/video/${courseId}/${videoId}`,
//         {
//           withCredentials: true,
//         }
//       );
//       setVideo(data.video);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getCourse = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://bsesa-ksem.vercel.app/course/" + courseId,
//         {
//           withCredentials: true,
//         }
//       );
//       setCourse(data.course);
//       setIsPurchased(data.isPurchased);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getVideo();
//     getCourse();
//   }, [videoId]);

//   const handleProgress = (event) => {
//     const percent = Math.round(
//       (event.target.currentTime / event.target.duration) * 100
//     );
//     setProgress(percent);

//     if (percent % 10 === 0 && percent !== lastSentProgress) {
//       setLastSentProgress(percent);
//       axios
//         .put(
//           "https://bsesa-ksem.vercel.app/progress",
//           {
//             courseId,
//             videoId,
//             progress: percent,
//           },
//           { withCredentials: true }
//         )
//         .catch((error) => {
//           console.error("Failed to update progress:", error);
//         });
//     }
//   };

//   const handleVideoEnd = () => {
//     if (!course?.videos) return;

//     // Find the current video index
//     const currentIndex = course.videos.findIndex((vid) => vid._id === videoId);

//     // Navigate to the next video if it exists
//     if (currentIndex >= 0 && currentIndex < course.videos.length - 1) {
//       const nextVideo = course.videos[currentIndex + 1];
//       navigate(`/video/${courseId}/${nextVideo._id}`);
//     } else {
//       // END OF COURSE
//     }
//   };

//   return (
//     <div className="min-h-dvh pt-[120px] flex justify-center items-start xl:items-center bg-gray-100 p-4 bg-secondary ">
//       <div className="flex justify-center items-start gap-5 flex-wrap w-full h-full">
//         <div className="w-full xl:w-[55%] bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="relative w-full h-auto bg-black">
//             <video
//               src={video?.url}
//               onTimeUpdate={handleProgress}
//               onEnded={handleVideoEnd}
//               controls
//               className="w-full h-auto"
//             />
//           </div>
//           <h1 className="px-4 capitalize py-3 text-[1.7rem] font-light">
//             {video?.title}
//           </h1>
//         </div>
//         <div className="w-full xl:w-[calc(45%-5rem)] max-h-[700px] overflow-y-auto h-full bg-whiteColor rounded-lg py-1">
//           <h2 className="h-[50px] py-2 px-2 text-[1.3rem] "> Videos</h2>
//           <div className="px-2 h-[calc(100%-95px)] overflow-y-auto ">
//             {course?.videos.map((video) => (
//               <Link
//                 key={video._id}
//                 title={!isPurchased ? "You Have To purchase The Course" : null}
//                 to={isPurchased ? `/video/${course?._id}/${video._id}` : "#"}
//                 className={`py-1 flex justify-start items-stretch gap-4 ${
//                   isPurchased ? "cursor-pointer" : "cursor-not-allowed"
//                 } `}
//               >
//                 <div className="w-1/3 max-w-[250px] relative h-[130px] min-w-[200px] rounded-md overflow-hidden">
//                   {!isPurchased && (
//                     <div className="absolute flex justify-center items-center left-0 top-0 w-full h-full bg-[#00000032]">
//                       <MdOutlineDoNotDisturbAlt className="text-[2.3rem] font-medium relative text-whiteColor" />
//                     </div>
//                   )}
//                   {isPurchased && (
//                     <div
//                       style={{ width: `${video?.progress || 0}%` }}
//                       className="absolute left-0 bottom-0 h-1 bg-[red]"
//                     ></div>
//                   )}
//                   <img src={video?.thumbnail} className="w-full h-full" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="w-full flex justify-between items-center pr-2">
//                     <h2 className="text-[1.4rem] lowercase font-medium">
//                       {video?.title}
//                     </h2>
//                     <span className="ml-4 text-[0.8rem] font-bold text-gray-800">
//                       {timeAgo(video?.createdAt)}
//                     </span>
//                   </div>
//                   <p className="text-[1.1rem] font-light overflow-hidden">
//                     {video?.description}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { timeAgo } from "../courses/Course";
import {
  MdOutlineDoNotDisturbAlt,
  MdPictureAsPdf,
  MdLink,
  MdPlayCircleOutline,
} from "react-icons/md";

const VideoPlayer = () => {
  const { courseId, videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [lastSentProgress, setLastSentProgress] = useState(0);
  const [isPurchased, setIsPurchased] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  const getVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://bsesa-ksem.vercel.app/video/${courseId}/${videoId}`,
        { withCredentials: true }
      );
      setVideo(data.video);
      setSelectedVideo(data.video);
    } catch (error) {
      console.error("Failed to fetch video:", error);
    }
  };

  const getCourse = async () => {
    try {
      const { data } = await axios.get(
        `https://bsesa-ksem.vercel.app/course/${courseId}`,
        { withCredentials: true }
      );
      setCourse(data.course);
      setIsPurchased(data.isPurchased);
    } catch (error) {
      console.error("Failed to fetch course:", error);
    }
  };

  useEffect(() => {
    getVideo();
    getCourse();
  }, [videoId]);

  const handleProgress = (event) => {
    const percent = Math.round(
      (event.target.currentTime / event.target.duration) * 100
    );
    setProgress(percent);

    if (percent % 10 === 0 && percent !== lastSentProgress) {
      setLastSentProgress(percent);
      axios
        .put(
          "https://bsesa-ksem.vercel.app/progress",
          { courseId, videoId, progress: percent },
          { withCredentials: true }
        )
        .catch((error) => {
          console.error("Failed to update progress:", error);
        });
    }
  };

  const handleVideoEnd = () => {
    if (!course?.videos) return;

    const currentIndex = course.videos.findIndex((vid) => vid._id === videoId);

    if (currentIndex >= 0 && currentIndex < course.videos.length - 1) {
      const nextVideo = course.videos[currentIndex + 1];
      navigate(`/video/${courseId}/${nextVideo._id}`);
    }
  };

  const handleVideoSelect = (selectedVid) => {
    if (!isPurchased) return;

    navigate(`/video/${courseId}/${selectedVid._id}`);
    setSelectedVideo(selectedVid);
  };

  const renderResourceLinks = () => {
    if (!selectedVideo?.links || selectedVideo.links.length === 0) return null;

    return (
      <div className="mt-4 border-t pt-3">
        <h3 className="text-lg font-semibold mb-2"> Resources</h3>
        <div className="space-y-2">
          {selectedVideo.links.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <MdLink className="mr-2" />
              {resource.description}
            </a>
          ))}
        </div>
      </div>
    );
  };

  const renderPdfResource = () => {
    if (!selectedVideo?.pdf) return null;

    return (
      <div className="mt-4">
        <a
          href={selectedVideo.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-red-600 hover:text-red-800 transition-colors"
        >
          <MdPictureAsPdf className="mr-2 text-xl" />
          Download PDF Resource
        </a>
      </div>
    );
  };

  return (
    <div className="min-h-dvh pt-[110px] flex justify-center items-start xl:items-center bg-secondary p-4">
      <div className="flex justify-center items-start gap-5 flex-wrap w-full h-full">
        {/* Video Player Section */}
        <div className="w-full xl:w-[60%] bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative w-full h-auto bg-black">
            <video
              ref={videoRef}
              src={selectedVideo?.url}
              onTimeUpdate={handleProgress}
              onEnded={handleVideoEnd}
              controls
              className="w-full h-auto"
            />
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-semibold mb-2">
              {selectedVideo?.title}
            </h1>
            <p className="text-gray-600">{selectedVideo?.description}</p>

            {renderPdfResource()}
            {renderResourceLinks()}
          </div>
        </div>

        {/* Video List Section */}
        <div className="w-full xl:w-[calc(40%-5rem)] max-h-[680px] overflow-y-auto h-full bg-white rounded-lg shadow-md">
          <h2 className="sticky top-0 bg-white z-10 p-4 text-xl font-semibold border-b">
            Course Videos
          </h2>
          <div className="divide-y">
            {course?.videos.map((vid) => (
              <div
                key={vid._id}
                onClick={() => handleVideoSelect(vid)}
                className={`p-4 flex cursor-pointer hover:bg-gray-50 transition-colors ${
                  vid._id === videoId ? "bg-blue-50" : ""
                } ${
                  isPurchased
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                <div className="w-1/3 relative h-[130px] min-w-[200px] rounded-md overflow-hidden">
                  {!isPurchased && (
                    <div className="absolute flex justify-center items-center left-0 top-0 w-full h-full bg-[#00000032]">
                      <MdOutlineDoNotDisturbAlt className="text-[2.3rem] text-white" />
                    </div>
                  )}
                  {isPurchased && (
                    <div
                      style={{ width: `${vid?.progress || 0}%` }}
                      className="absolute left-0 bottom-0 h-1 bg-[red]"
                    ></div>
                  )}
                  <img
                    src={vid?.thumbnail}
                    alt={vid?.title}
                    className="w-full h-full object-cover"
                  />
                  {vid._id !== videoId && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                      <MdPlayCircleOutline className="text-white text-4xl" />
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <h3
                      className={`text-lg ${
                        vid._id === videoId ? "font-bold text-blue-600" : ""
                      }`}
                    >
                      {vid?.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {timeAgo(vid?.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">
                    {vid?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
