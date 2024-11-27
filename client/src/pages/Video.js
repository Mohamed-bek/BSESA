import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { timeAgo } from "./Course";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
const VideoPlayer = () => {
  const { courseId, videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [lastSentProgress, setLastSentProgress] = useState(0);
  const [isPurchased, setIsPurchased] = useState(false);

  const getVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://bsesa-ksem.vercel.app/video/${courseId}/${videoId}`,
        {
          withCredentials: true,
        }
      );
      setVideo(data.video);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourse = async () => {
    try {
      const { data } = await axios.get(
        "https://bsesa-ksem.vercel.app/course/" + courseId,
        {
          withCredentials: true,
        }
      );
      setCourse(data.course);
      setIsPurchased(data.isPurchased);
    } catch (error) {
      console.log(error);
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
          {
            courseId,
            videoId,
            progress: percent,
          },
          { withCredentials: true }
        )
        .catch((error) => {
          console.error("Failed to update progress:", error);
        });
    }
  };

  const handleVideoEnd = () => {
    if (!course?.videos) return;

    // Find the current video index
    const currentIndex = course.videos.findIndex((vid) => vid._id === videoId);

    // Navigate to the next video if it exists
    if (currentIndex >= 0 && currentIndex < course.videos.length - 1) {
      const nextVideo = course.videos[currentIndex + 1];
      navigate(`/video/${courseId}/${nextVideo._id}`);
    } else {
      // END OF COURSE
    }
  };

  return (
    <div className="min-h-dvh pt-[120px] flex justify-center items-start xl:items-center bg-gray-100 p-4 bg-secondary ">
      <div className="flex justify-center items-start gap-5 flex-wrap w-full h-full">
        <div className="w-full xl:w-[55%] bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative w-full h-auto bg-black">
            <video
              src={video?.url}
              onTimeUpdate={handleProgress}
              onEnded={handleVideoEnd}
              controls
              className="w-full h-auto"
            />
          </div>
          <h1 className="px-4 capitalize py-3 text-[1.7rem] font-light">
            {video?.title}
          </h1>
        </div>
        <div className="w-full xl:w-[calc(45%-5rem)] max-h-[700px] overflow-y-auto h-full bg-whiteColor rounded-lg py-1">
          <h2 className="h-[50px] py-2 px-2 text-[1.3rem] "> Videos</h2>
          <div className="px-2 h-[calc(100%-95px)] overflow-y-auto ">
            {course?.videos.map((video) => (
              <Link
                key={video._id}
                title={!isPurchased ? "You Have To purchase The Course" : null}
                to={isPurchased ? `/video/${course?._id}/${video._id}` : "#"}
                className={`py-1 flex justify-start items-stretch gap-4 ${
                  isPurchased ? "cursor-pointer" : "cursor-not-allowed"
                } `}
              >
                <div className="w-1/3 max-w-[250px] relative h-[130px] min-w-[200px] rounded-md overflow-hidden">
                  {!isPurchased && (
                    <div className="absolute flex justify-center items-center left-0 top-0 w-full h-full bg-[#00000032]">
                      <MdOutlineDoNotDisturbAlt className="text-[2.3rem] font-medium relative text-whiteColor" />
                    </div>
                  )}
                  {isPurchased && (
                    <div
                      style={{ width: `${video?.progress || 0}%` }}
                      className="absolute left-0 bottom-0 h-1 bg-[red]"
                    ></div>
                  )}
                  <img src={video?.thumbnail} className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="w-full flex justify-between items-center pr-2">
                    <h2 className="text-[1.4rem] lowercase font-medium">
                      {video?.title}
                    </h2>
                    <span className="ml-4 text-[0.8rem] font-bold text-gray-800">
                      {timeAgo(video?.createdAt)}
                    </span>
                  </div>
                  <p className="text-[1.1rem] font-light overflow-hidden">
                    {video?.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
